const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const { protect } = require('../middleware/auth');
const { GoogleGenAI } = require('@google/genai');

const router = express.Router();

// Multer setup - PDF and DOCX
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }
});

let aiClient;
if (process.env.GEMINI_API_KEY) {
  aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
}

const calculateLocalScore = (text = "") => {
  const sections = {
    experience: /experience|work history|employment|career|background/i,
    education: /education|academic|university|college|schools/i,
    skills: /skills|technical skills|competencies/i,
    projects: /projects|portfolio|personal projects/i,
    summary: /summary|profile|objective|highlights/i,
    contact: /contact|email|phone|address|linkedin|github|@|\.com|\d{10}|\+\d{1,3}/i
  };

  let score = 20;
  let breakdown = [];
  let suggestions = [];

  Object.keys(sections).forEach(key => {
    const found = sections[key].test(text);
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
    console.log('[ATS API] Scoring locally...');
    const result = calculateLocalScore(text);

    // 3. AI Analysis
    result.aiAnalysis = null;
    result.aiActionPoints = [];

    // Trigger AI analysis if we have text OR if it's a PDF (for visual analysis)
    if (aiClient && (text.trim().length > 10 || mimetype === 'application/pdf')) {
      try {
        console.log('[ATS API] Requesting AI Roadmap from Gemini...');

        const prompt = `
        Analyze this resume and provide:
        1. A brief professional assessment (aiAnalysis).
        2. Exactly 3 actionable points to improve ATS compatibility (aiActionPoints).
        
        If digital text is missing, perform visual analysis on the attached PDF.
        
        Return JSON ONLY:
        {
          "aiAnalysis": "Brief assessment",
          "aiActionPoints": ["point1", "point2", "point3"]
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

        const responseData = await aiClient.models.generateContent({
          model: process.env.GEMINI_MODEL || 'gemini-1.5-flash',
          contents: [{ role: 'user', parts: parts }],
        });

        // Robust response parsing for both Vertex and Google AI SDKs
        let rawText = "";
        if (responseData && responseData.text) {
          rawText = responseData.text;
        } else if (responseData?.response?.text) {
          rawText = typeof responseData.response.text === 'function' ? responseData.response.text() : responseData.response.text;
        } else if (responseData?.candidates?.[0]?.content?.parts?.[0]?.text) {
          rawText = responseData.candidates[0].content.parts[0].text;
        }

        if (rawText) {
          console.log('[ATS API] Raw AI Response Length:', rawText.length);
          const cleanJson = rawText.replace(/```json\s*|```\s*/g, '').trim();
          try {
            const aiData = JSON.parse(cleanJson);
            result.aiAnalysis = aiData.aiAnalysis || aiData.assessment || "Analysis complete.";
            result.aiActionPoints = aiData.aiActionPoints || aiData.actions || [];
          } catch (jsonErr) {
            console.error('[ATS API] JSON Parse Error. Falling back to raw text.');
            result.aiAnalysis = rawText.split('\n')[0].substring(0, 300);
            result.aiActionPoints = ["Review formatting", "Check keywords", "Ensure clear sections"];
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

module.exports = router;
