const express = require('express');
const supabase = require('../supabase');
const { protect } = require('../middleware/auth');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const { aiClient } = require('./ai');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

const mapResumeFields = (resume) => {
  if (!resume) return null;
  return {
    ...resume,
    _id: resume.id,
    user: resume.user_id,
    personalDetails: resume.personal_details,
    // Add logic to extract nested languages if they exist in personal_details
    languages: resume.languages || resume.personal_details?.languages || [],
    hasUsedAI: resume.has_used_ai || false,
    hasUsedPremiumTemplate: resume.has_used_premium_template || false,
    paidForDownload: resume.paid_for_download || false,
    createdAt: resume.created_at,
    updatedAt: resume.updated_at
  };
};

const mapPayloadToColumns = (body) => {
  const payload = { ...body };
  if (payload.personalDetails) {
    // Pack languages into personal_details to prevent 500 column error
    const personalDetails = { ...payload.personalDetails };
    if (payload.languages) {
      personalDetails.languages = payload.languages;
    }
    payload.personal_details = personalDetails;
    delete payload.personalDetails;
  } else if (payload.languages) {
    // If only languages changed, ensure they are nested
    payload.personal_details = { ...(payload.personal_details || {}), languages: payload.languages };
  }

  if (payload.hasUsedAI !== undefined) payload.has_used_ai = payload.hasUsedAI;
  if (payload.hasUsedPremiumTemplate !== undefined) payload.has_used_premium_template = payload.hasUsedPremiumTemplate;
  if (payload.paidForDownload !== undefined) payload.paid_for_download = payload.paidForDownload;

  delete payload.hasUsedAI;
  delete payload.hasUsedPremiumTemplate;
  delete payload.paidForDownload;
  delete payload.languages; // Remove from root to avoid DB error
  delete payload._id;
  delete payload.id;
  delete payload.user;
  delete payload.user_id;
  delete payload.createdAt;
  delete payload.updatedAt;
  delete payload.created_at;
  delete payload.updated_at;

  return payload;
};

// --- EXPERT PARSING HELPERS ---
const cleanExtractedText = (text) => {
  if (!text) return '';
  return text
    .replace(/[^\x20-\x7E\n\t]/g, ' ') // Remove non-ASCII characters
    .replace(/\s{2,}/g, ' ')           // Collapse excessive whitespace (keep single spaces)
    .replace(/\n\s*\n/g, '\n\n')       // Keep structure
    .trim();
};

const extractJSON = (text) => {
  if (!text) return '';
  try {
    // 1. Remove markdown code blocks if present
    let cleaned = text.replace(/```json\n?|```\n?/g, '').trim();

    // 2. Strict find: first { to last }
    const firstBrace = cleaned.indexOf('{');
    const lastBrace = cleaned.lastIndexOf('}');

    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      return cleaned.substring(firstBrace, lastBrace + 1);
    }
    return cleaned;
  } catch (e) {
    return text;
  }
};

// AI Access logic
const canUserAccessAI = (userPlan) => {
  return true; // Allowed for all users
};


// Create resume — accepts optional template field
router.post('/', protect, async (req, res) => {
  try {
    const template = req.body.template || 'modern';

    // TEMPLATE ACCESS POLICY UPDATE: 
    // All users can now create resumes with any template to allow them to "Try before you buy".
    // Gating is now enforced ONLY at the download/export step.

    const { data: resume, error } = await supabase
      .from('resumes')
      .insert([{ user_id: req.user.id, template }])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(mapResumeFields(resume));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Download tracking — enforces plan limits and premium checks
router.post('/download/:id', protect, async (req, res) => {
  try {
    // Get user's current plan and download count
    const { data: user, error: uErr } = await supabase
      .from('users')
      .select('id, plan, download_count')
      .eq('id', req.user.id)
      .maybeSingle();

    if (uErr || !user) throw new Error('User not found');

    // Limits: Free (5), Basic (50), Pro (Unlimited)
    const limits = { free: 5, basic: 50, pro: 999999 };
    const maxDownloads = limits[user.plan] || 5;

    // Verify the resume belongs to this user and get its template
    const { data: resume, error: rErr } = await supabase
      .from('resumes')
      .select('id, template')
      .eq('id', req.params.id)
      .eq('user_id', req.user.id)
      .maybeSingle();

    if (rErr || !resume) return res.status(404).json({ message: 'Resume not found' });

    // 1. Check if template is premium
    const { data: templateData } = await supabase
      .from('templates')
      .select('id, is_premium, name')
      .eq('name', resume.template)
      .maybeSingle();

    const isPremium = templateData?.is_premium || false;

    // Logic: Pro users have full access.
    // Try Before You Buy: If AI or Premium template was used, allow for all users now
    const needsPayment = false; // Disabled payment requirement for all users

    /*
    if (user.plan !== 'pro' && needsPayment) {
      return res.status(403).json({
        message: `Premium features used (AI or Premium Template). Pay ₹9 to unlock this download.`,
        isPremium: true,
        price: 9,
        type: 'PAYMENT_REQUIRED'
      });
    }
    */

    // 3. Fallback to general download limits if NO premium features were used
    if (user.plan === 'free' && user.download_count >= maxDownloads && !needsPayment) {
      return res.status(403).json({
        message: `Free download limit reached. Upgrade to get more downloads.`,
        limit: maxDownloads,
        used: user.download_count,
        plan: user.plan,
        type: 'LIMIT_REACHED'
      });
    }

    // 4. Increment download count
    const { data: updatedUser, error: updateErr } = await supabase
      .from('users')
      .update({ download_count: user.download_count + 1 })
      .eq('id', req.user.id)
      .select('download_count, plan')
      .single();

    if (updateErr) throw updateErr;

    res.json({
      allowed: true,
      download_count: updatedUser.download_count,
      limit: maxDownloads,
      plan: updatedUser.plan
    });
  } catch (error) {
    console.error('[Download] Error:', error);
    res.status(500).json({ message: error.message });
  }
});

router.get('/', protect, async (req, res) => {
  try {
    const { data: resumes, error } = await supabase
      .from('resumes')
      .select('*')
      .eq('user_id', req.user.id)
      .order('updated_at', { ascending: false });

    if (error) throw error;
    res.json(resumes.map(mapResumeFields));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', protect, async (req, res) => {
  try {
    const { data: resume, error } = await supabase
      .from('resumes')
      .select('*')
      .eq('id', req.params.id)
      .eq('user_id', req.user.id)
      .maybeSingle();

    if (error) throw error;
    if (!resume) return res.status(404).json({ message: 'Resume not found' });

    res.json(mapResumeFields(resume));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', protect, async (req, res) => {
  try {
    const updatePayload = mapPayloadToColumns(req.body);
    updatePayload.updated_at = new Date().toISOString();

    const { data: resume, error } = await supabase
      .from('resumes')
      .update(updatePayload)
      .eq('id', req.params.id)
      .eq('user_id', req.user.id)
      .select()
      .maybeSingle();

    if (error) throw error;
    if (!resume) return res.status(404).json({ message: 'Resume not found' });

    res.json(mapResumeFields(resume));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    const { data: resume, error } = await supabase
      .from('resumes')
      .delete()
      .eq('id', req.params.id)
      .eq('user_id', req.user.id)
      .select()
      .maybeSingle();

    if (error) throw error;
    if (!resume) return res.status(404).json({ message: 'Resume not found' });

    res.json({ message: 'Resume removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Parse resume from file (PDF/DOCX)
// Parse resume from file (PDF/DOCX) using Robust AI Logic
router.post('/parse', protect, upload.single('resume'), async (req, res) => {
  console.log(`[AI Parser] Processing file: ${req.file?.originalname} for user: ${req.user.id}`);

  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    let rawText = '';
    const fileBuffer = req.file.buffer;
    const fileType = req.file.mimetype;

    // 1. Extraction Layer
    try {
      if (fileType === 'application/pdf') {
        const data = await pdfParse(fileBuffer);
        rawText = data.text;
      } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || fileType === 'application/msword') {
        const data = await mammoth.extractRawText({ buffer: fileBuffer });
        rawText = data.value;
      } else {
        return res.status(400).json({ message: 'Unsupported format. Please upload PDF or DOCX.' });
      }
    } catch (extractErr) {
      console.error('[AI Parser] Extraction failed:', extractErr.message);
      throw new Error('Could not read the file contents. Please try a different version of the file.');
    }

    const cleanText = cleanExtractedText(rawText);

    if (!cleanText || cleanText.length < 50) {
      throw new Error('File appears to be empty or an unreadable scan. Please provide a text-based resume.');
    }

    if (!aiClient) {
      throw new Error('AI Engine not initialized. Please verify backend environment configuration.');
    }

    // 2. Expert Prompt Layer
    const prompt = `
      Act as a Senior Technical Recruiter and Resume Specialist.
      I will provide you with the raw text extracted from a resume. Your task is to structure this data into a valid JSON object suitable for a database.

      TEXT TO PARSE:
      ---
      ${cleanText.substring(0, 6000)}
      ---

      INSTRUCTIONS:
      1. Extract all personal details, education history, work experience, projects, languages, and skills.
      2. For 'personalDetails', extract Full Name, Email, Phone, LinkedIn, and Location.
      3. For 'experience', provide a list of positions including jobTitle, company, and a summary description.
      4. For 'education', include degree, school, and dates.
      5. For 'languages', extract native and learned languages with a proficiency level from 1 (Basic) to 5 (Native).
      6. Generate a 'title' for this resume (e.g. "Software Engineer - [Name]").
      7. Return ONLY the JSON object. No pre-amble, no markdown formatting.

      JSON SCHEMA:
      {
        "title": "...",
        "personalDetails": { "fullName": "...", "jobTitle": "...", "email": "...", "phone": "...", "address": "...", "linkedin": "...", "github": "...", "summary": "..." },
        "education": [{ "degree": "...", "school": "...", "startDate": "...", "endDate": "...", "description": "..." }],
        "experience": [{ "jobTitle": "...", "company": "...", "startDate": "...", "endDate": "...", "description": "..." }],
        "skills": [{ "name": "...", "level": "Intermediate" }],
        "projects": [{ "name": "...", "link": "...", "technologies": "...", "description": "..." }],
        "languages": [{ "name": "...", "level": 3 }]
      }
    `;

    // 3. AI Execution Layer
    let result;
    try {
      result = await aiClient.models.generateContent({
        model: process.env.GEMINI_MODEL || 'gemini-1.5-flash',
        contents: prompt,
      });
    } catch (aiSvcErr) {
      console.error('[AI Parser] Google AI Service Error:', aiSvcErr.message);
      if (aiSvcErr.message.includes('leaked')) {
        throw new Error('THE SYSTEM API KEY HAS BEEN BLOCKED (LEAKED). Please update GEMINI_API_KEY in the backend .env file with a fresh key from Google AI Studio.');
      }
      if (aiSvcErr.message.includes('NOT_FOUND') || aiSvcErr.message.includes('404')) {
        throw new Error(`The model "${process.env.GEMINI_MODEL}" was not found. Please try "gemini-1.5-flash" in your .env file.`);
      }
      throw new Error('The AI service is currently unavailable. Please try again in a few minutes.');
    }

    let jsonString = (result?.text || '').trim();

    // 4. Robust Recovery Layer
    if (!jsonString) {
      console.error('[AI Parser] Empty result from AI');
      throw new Error('The AI failed to generate data. Please try again or fill the details manually.');
    }
    jsonString = extractJSON(jsonString);

    let parsedData;
    try {
      parsedData = JSON.parse(jsonString);
    } catch (jsonErr) {
      console.error('[AI Parser] JSON Parse Error. Raw output:', jsonString);
      throw new Error('AI generated incompatible data. Please try again or fill the details manually.');
    }

    // 5. Database Layer
    const payload = mapPayloadToColumns(parsedData);
    payload.user_id = req.user.id;
    payload.template = 'modern'; // Start with standard template

    const { data: resume, error: dbError } = await supabase
      .from('resumes')
      .insert([payload])
      .select()
      .single();

    if (dbError) {
      console.error('[AI Parser] DB Insert Error:', dbError.message);
      throw new Error('Failed to save parsed resume to profile.');
    }

    console.log('[AI Parser] Success. Resume ID:', resume.id);
    res.status(201).json(mapResumeFields(resume));

  } catch (error) {
    console.error('[AI Parser] Fatal Error:', error.message);
    res.status(500).json({
      message: error.message || 'The AI parser encountered an unexpected issue.',
      retry: true
    });
  }
});

module.exports = router;
