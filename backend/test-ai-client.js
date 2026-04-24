require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');

async function testAI() {
  const aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const prompt = "Generate a simple JSON object for a resume with title 'Software Engineer' and name 'John Doe'. Return ONLY JSON.";
  
  try {
    const result = await aiClient.models.generateContent({
      model: process.env.GEMINI_MODEL || 'gemini-1.5-flash',
      contents: prompt,
    });
    console.log("AI result:", result.text);
  } catch (err) {
    console.error("AI error:", err);
  }
}

testAI();
