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

    if (!text || text.trim().length < 10) {
        return res.status(400).json({ message: 'File is readable but no digital text was found. Scanned images/photos are not supported.' });
    }

    console.log('[ATS API] Scan successful. Length:', text.length);

    // 2. Score locally
    console.log('[ATS API] Scoring locally...');
    const result = calculateLocalScore(text);

    // 3. AI Analysis
    result.aiAnalysis = null;
    result.aiActionPoints = [];

    if (aiClient && text.trim().length > 30) {
      try {
        console.log('[ATS API] Requesting AI Roadmap from Gemini...');
        const prompt = `Analyze this resume text. Provide a professional assessment and 3 actions to improve ATS score.
        Text: ${text.substring(0, 3000)}
        Return JSON ONLY: {"aiAnalysis": "Assessment text...", "aiActionPoints": ["Point 1", "Point 2", "Point 3"]}`;

        const responseData = await aiClient.models.generateContent({
          model: process.env.GEMINI_MODEL || 'gemini-1.5-flash',
          contents: prompt,
        });

        if (responseData && responseData.text) {
          const rawText = responseData.text.trim();
          console.log('[ATS API] Gemini Response Received (Length:', rawText.length, ')');
          
          // Cleaner JSON extraction
          const cleanJson = rawText.replace(/```json\s*|```\s*/g, '').trim();
          try {
            const aiData = JSON.parse(cleanJson);
            result.aiAnalysis = aiData.aiAnalysis || aiData.assessment || null;
            result.aiActionPoints = aiData.aiActionPoints || aiData.actions || [];
            console.log('[ATS API] AI Insights successfully parsed.');
          } catch (jsonErr) {
            console.error('[ATS API] JSON Parse Error:', jsonErr.message, 'Raw:', rawText.substring(0, 100));
            // Basic fallback if AI doesn't return JSON
            result.aiAnalysis = rawText.substring(0, 500);
          }
        }
      } catch (aiErr) {
        console.error('[ATS API] Gemini service error:', aiErr.message);
      }
    }

    res.json(result);
  } catch (error) {
    console.error('[ATS API] Fatal catch:', error);
    res.status(500).json({ message: 'Internal analysis error. Details logged.' });
  }
});

module.exports = router;
