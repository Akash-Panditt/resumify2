const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const { protect } = require('../middleware/auth');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const router = express.Router();

// Multer setup - PDF and DOCX
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }
});

let genAI;
if (process.env.GEMINI_API_KEY) {
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
}

const calculateTextScore = (text = "") => {
  // Normalize text for better matching
  const cleanText = text.replace(/\s+/g, ' ').toLowerCase();

  const sections = {
    experience: /experience|work history|employment|career|background|professional history|job history/i,
    education: /education|academic|university|college|school|qualification|certification|degree/i,
    skills: /skills|technical skills|competencies|expertise|technologies|proficiencies|strengths/i,
    projects: /projects|portfolio|personal projects|selected projects|case studies/i,
    summary: /summary|profile|objective|highlights|professional summary|about me/i,
    contact: /contact|email|phone|address|linkedin|github|@|\.com|\d{10}|\+\d{1,3}|mobile|cell/i
  };

  let score = 20;
  let breakdown = [];
  let suggestions = [];

  Object.keys(sections).forEach(key => {
    const found = sections[key].test(cleanText);
    if (found) score += 10;
    breakdown.push({ item: key.toUpperCase(), found });
    if (!found) suggestions.push(`Missing "${key.toUpperCase()}" section.`);
  });

  const wordCount = (text || "").split(/\s+/).length;
  if (wordCount < 40) {
    suggestions.push("Very low word count. Ensure this is a standard text document, not a scan.");
  }

  return { score: Math.min(100, Math.max(0, score)), breakdown, suggestions };
};

const calculateLocalScore = (resumeData) => {
  let score = 0;
  let breakdown = [];
  let suggestions = [];

  // 1. Personal Details (Max 15)
  const p = resumeData.personalDetails || {};
  let contactScore = 0;
  if (p.fullName?.length > 3) contactScore += 5;
  if (p.email?.includes('@')) contactScore += 5;
  if (p.phone?.length > 7) contactScore += 3;
  if (p.linkedin || p.github || p.address) contactScore += 2;
  
  score += contactScore;
  breakdown.push({ item: "CONTACT INFO", found: contactScore > 10, score: contactScore });
  if (contactScore < 10) suggestions.push("Complete your contact details (Email, Phone, and LinkedIn).");

  // 2. Professional Summary (Max 10)
  const summaryLength = p.summary?.trim().split(/\s+/).length || 0;
  let summaryScore = 0;
  if (summaryLength > 30) summaryScore = 10;
  else if (summaryLength > 10) summaryScore = 5;
  
  score += summaryScore;
  breakdown.push({ item: "SUMMARY", found: summaryScore > 0, score: summaryScore });
  if (summaryScore < 10) suggestions.push("Professional summary is too short or missing. Aim for 30-50 words.");

  // 3. Experience Depth (Max 30)
  const experience = resumeData.experience || [];
  let expScore = 0;
  if (experience.length > 0) {
    expScore += 10; // Basic presence
    const totalExpWords = experience.reduce((acc, exp) => acc + (exp.description?.split(/\s+/).length || 0), 0);
    if (totalExpWords > 100) expScore += 20;
    else if (totalExpWords > 50) expScore += 10;
  }
  
  score += expScore;
  breakdown.push({ item: "EXPERIENCE", found: experience.length > 0, score: expScore });
  if (expScore < 20) suggestions.push("Add more detailed bullet points to your work experience.");

  // 4. Skills Analysis (Max 20)
  const skills = resumeData.skills || [];
  let skillScore = 0;
  if (skills.length >= 8) skillScore = 20;
  else if (skills.length >= 4) skillScore = 10;
  else if (skills.length > 0) skillScore = 5;
  
  score += skillScore;
  breakdown.push({ item: "SKILLS", found: skills.length > 0, score: skillScore });
  if (skillScore < 15) suggestions.push("Add at least 8 relevant technical or soft skills.");

  // 5. Education (Max 15)
  const education = resumeData.education || [];
  let eduScore = 0;
  if (education.length > 0) eduScore = 15;
  
  score += eduScore;
  breakdown.push({ item: "EDUCATION", found: education.length > 0, score: eduScore });
  if (eduScore === 0) suggestions.push("Education history is missing.");

  // 6. Projects & Others (Max 10)
  const projects = resumeData.projects || [];
  const languages = resumeData.languages || [];
  let extraScore = 0;
  if (projects.length > 0) extraScore += 7;
  if (languages.length > 0) extraScore += 3;
  
  score += extraScore;
  breakdown.push({ item: "PROJECTS/EXTRAS", found: extraScore > 0, score: extraScore });

  return { 
    score: Math.min(100, score), 
    breakdown, 
    suggestions: suggestions.slice(0, 4) 
  };
};

router.post('/check', protect, upload.single('resume'), async (req, res) => {
  console.log('[ATS API] Final compatibility attempt for:', req.file ? req.file.originalname : 'none');

  if (!req.file) {
    return res.status(400).json({ message: 'No file provided.' });
  }

  try {
    let text = "";
    const mimetype = req.file.mimetype;

    // 1. Extraction with stable parsers
    if (mimetype === 'application/pdf') {
      try {
        console.log('[ATS API] Parsing PDF with stable pdf-parse...');
        const data = await pdfParse(req.file.buffer);
        text = data.text || "";
      } catch (pdfErr) {
        console.error('[ATS API] pdf-parse failed:', pdfErr.message);
        return res.status(400).json({ message: `PDF scan failed: ${pdfErr.message}. Ensure it is a standard digital PDF.` });
      }
    } else if (mimetype.includes('word') || mimetype.includes('officedocument')) {
      try {
        console.log('[ATS API] Parsing Word with stable mammoth...');
        const result = await mammoth.extractRawText({ buffer: req.file.buffer });
        text = result.value || "";
      } catch (wordErr) {
        console.error('[ATS API] mammoth failed:', wordErr.message);
        return res.status(400).json({ message: `Word scan failed: ${wordErr.message}. Ensure the file is not corrupted.` });
      }
    } else {
      return res.status(400).json({ message: 'Unsupported file type. Please upload a PDF or DOCX file.' });
    }

    // If it's a PDF and text extraction failed, we don't block. 
    // We'll let the AI analysis part handle it visually via inlineData.
    if (!text || text.trim().length < 10) {
      if (mimetype !== 'application/pdf') {
        return res.status(400).json({
          message: 'Unable to detect text in this file.',
          suggestion: 'Please ensure your file is a valid PDF or Word document with readable text.'
        });
      }
      console.log('[ATS API] No digital text found, but it is a PDF. Proceeding to direct AI visual analysis...');
    }

    // 2. Score locally
    const result = calculateTextScore(text);

    // 3. AI Analysis
    result.aiAnalysis = null;
    result.aiActionPoints = [];

    // Trigger AI analysis if we have text OR if it's a PDF (for visual analysis)
    if (genAI && (text.trim().length > 10 || mimetype === 'application/pdf')) {
      try {
        console.log('[ATS API] Requesting AI Roadmap from Gemini...');

        const prompt = `
        Analyze this resume and provide:
        1. A brief professional assessment (aiAnalysis).
        2. Exactly 3 actionable points to improve ATS compatibility (aiActionPoints).
        3. A breakdown of sections found: CONTACT, SUMMARY, EXPERIENCE, EDUCATION, SKILLS, PROJECTS.
        
        If digital text is missing, perform visual analysis on the attached PDF.
        
        Return JSON ONLY:
        {
          "aiAnalysis": "Brief assessment",
          "aiActionPoints": ["point1", "point2", "point3"],
          "breakdown": [
            {"item": "CONTACT", "found": true},
            {"item": "SUMMARY", "found": true},
            {"item": "EXPERIENCE", "found": true},
            {"item": "EDUCATION", "found": true},
            {"item": "SKILLS", "found": true},
            {"item": "PROJECTS", "found": true}
          ]
        }

        Resume Text: ${text || "[Visual analysis required]"}
        `;

        const parts = [{ text: prompt }];
        if (mimetype === 'application/pdf') {
          parts.push({
            inlineData: {
              mimeType: 'application/pdf',
              data: req.file.buffer.toString('base64')
            }
          });
        }

        const model = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL || "gemini-1.5-flash" });
        const resultAI = await model.generateContent({
          contents: [{ role: 'user', parts: parts }],
        });
        const response = await resultAI.response;
        const rawText = response.text();

        if (rawText) {
          console.log('[ATS API] Raw AI Response received. Length:', rawText.length);
          const cleanJson = rawText.replace(/```json\s*|```\s*/g, '').trim();
          try {
            const aiData = JSON.parse(cleanJson);
            result.aiAnalysis = aiData.aiAnalysis || aiData.assessment || "Analysis complete.";
            result.aiActionPoints = aiData.aiActionPoints || aiData.actions || [];
            
            // AGGRESSIVE FALLBACK: If local scan found nothing (score 20) or AI returned a breakdown, merge them
            if (aiData.breakdown && Array.isArray(aiData.breakdown)) {
               console.log('[ATS API] Merging AI breakdown with local results...');
               
               // Use AI breakdown as the primary source if it's more complete
               const aiFoundCount = aiData.breakdown.filter(b => b.found).length;
               const localFoundCount = result.breakdown.filter(b => b.found).length;
               
               if (aiFoundCount >= localFoundCount || result.score <= 30) {
                  result.breakdown = aiData.breakdown;
                  // Recalculate score: 20 base + 10 per section found + 10 bonus for good AI analysis
                  let newScore = 20;
                  aiData.breakdown.forEach(b => { if(b.found) newScore += 12; });
                  result.score = Math.min(100, newScore);
               }
            }
          } catch (jsonErr) {
            console.error('[ATS API] JSON Parse Error in AI response. Using text fallback.');
            result.aiAnalysis = rawText.split('\n')[0].substring(0, 300);
          }
        }
      } catch (aiErr) {
        console.error('[ATS API] AI Service Error:', aiErr.message);
        // We continue because we still have the local score
      }
    }

    res.json(result);
  } catch (error) {
    console.error('[ATS API] Fatal Route Error:', error);
    res.status(500).json({
      message: 'Analysis failed due to a server error.',
      error: error.message
    });
  }
});

// New endpoint for analyzing resume JSON data
router.post('/analyze-resume', protect, async (req, res) => {
  const resumeData = req.body;
  
  if (!resumeData) {
    return res.status(400).json({ message: 'No resume data provided.' });
  }

  try {
    // 1. Prepare text representation of resume data
    const getText = (data) => {
      let text = `Title: ${data.title || ''}\n`;
      const p = data.personalDetails || {};
      text += `Name: ${p.fullName || ''}\nEmail: ${p.email || ''}\nSummary: ${p.summary || ''}\n`;
      
      text += `\nExperience:\n`;
      (data.experience || []).forEach(exp => {
        text += `- ${exp.jobTitle} at ${exp.company} (${exp.startDate} - ${exp.endDate}): ${exp.description}\n`;
      });
      
      text += `\nEducation:\n`;
      (data.education || []).forEach(edu => {
        text += `- ${edu.degree} from ${edu.school} (${edu.startDate} - ${edu.endDate}): ${edu.description}\n`;
      });
      
      text += `\nSkills:\n`;
      (data.skills || []).forEach(skill => {
        text += `- ${skill.name} (${skill.level})\n`;
      });

      text += `\nProjects:\n`;
      (data.projects || []).forEach(proj => {
        text += `- ${proj.name}: ${proj.description}\n`;
      });

      return text;
    };

    const resumeText = getText(resumeData);

    // 2. Local Score
    const result = calculateLocalScore(resumeData);

    // 3. AI Analysis
    result.aiAnalysis = null;
    result.aiActionPoints = [];

    if (genAI) {
      try {
        const prompt = `
        Act as an Elite ATS Optimization Expert. Your goal is to guide the user to a perfect 100/100 score.
        Analyze this resume data and provide a "Smart Growth Strategy".
        
        CRITICAL REQUIREMENTS:
        1. ATS SCORE: Provide a realistic current score (0-100).
        2. RATIONALE (aiAnalysis): Explain WHY the score is what it is. Mention structural gaps or keyword density issues.
        3. SMART SUGGESTIONS (aiActionPoints): provide exactly 4 hyper-specific steps. Each step MUST explain HOW it increases the score (e.g., "Add Docker to Skills to increase technical relevance by 15%").
        4. TARGET KEYWORDS (missingKeywords): Identify the most high-impact keywords/technologies the user is missing based on their job title or industry.
        5. SECTION VERIFICATION: Check for CONTACT INFO, SUMMARY, EXPERIENCE, EDUCATION, SKILLS, PROJECTS/EXTRAS.
        
        Return JSON ONLY:
        {
          "score": 85,
          "aiAnalysis": "Your score is 85/100. The structure is solid, but you are missing key industry technologies that recruiters filter for.",
          "aiActionPoints": [
            "Add 'Agile Methodology' to your Skills section to match 80% of project management filters.",
            "Quantify your Experience: Adding metrics (e.g., 'Reduced costs by 20%') increases your impact score by 10 points.",
            "Include a 'Projects' section to showcase hands-on application of your skills.",
            "Complete your LinkedIn profile link to improve your professional verification score."
          ],
          "missingKeywords": ["Docker", "Kubernetes", "Agile", "System Design"],
          "breakdown": [
            {"item": "CONTACT INFO", "found": true},
            {"item": "SUMMARY", "found": true},
            {"item": "EXPERIENCE", "found": true},
            {"item": "SKILLS", "found": true},
            {"item": "EDUCATION", "found": true},
            {"item": "PROJECTS/EXTRAS", "found": false}
          ]
        }

        Resume Data:
        ${JSON.stringify(resumeData)}
        `;

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const resultAI = await model.generateContent(prompt);
        const response = await resultAI.response;
        const rawText = response.text();

        if (rawText) {
          const cleanJson = rawText.replace(/```json\s*|```\s*/g, '').trim();
          const aiData = JSON.parse(cleanJson);
          if (aiData.score !== undefined) result.score = aiData.score;
          if (aiData.aiAnalysis) result.aiAnalysis = aiData.aiAnalysis;
          if (aiData.aiActionPoints) result.aiActionPoints = aiData.aiActionPoints;
          if (aiData.missingKeywords) result.missingKeywords = aiData.missingKeywords;
          if (aiData.breakdown) result.breakdown = aiData.breakdown;
        }
      } catch (aiErr) {
        console.error('[ATS API] AI Analysis Error:', aiErr.message);
      }
    }

    res.json(result);
  } catch (error) {
    console.error('[ATS API] Analyze Resume Error:', error);
    res.status(500).json({ message: 'Failed to analyze resume data.' });
  }
});

module.exports = router;
