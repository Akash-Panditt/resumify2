require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');

async function listModels() {
  const aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  try {
    const models = await aiClient.models.list();
    console.log("Available models:", JSON.stringify(models, null, 2));
  } catch (err) {
    console.error("Error listing models:", err);
  }
}

listModels();
