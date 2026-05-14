const { GoogleGenAI } = require('@google/genai');
require('dotenv').config();

async function test() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return;

  const client = new GoogleGenAI({ apiKey });
  const modelsToTry = ['gemini-1.5-flash', 'gemini-1.5-flash-8b', 'gemini-1.5-pro'];
  
  for (const modelName of modelsToTry) {
    try {
      console.log(`Testing model: ${modelName}`);
      const response = await client.models.generateContent({
        model: modelName,
        contents: [{ role: 'user', parts: [{ text: "Success?" }] }],
      });
      console.log(`  ${modelName} Success:`, response.text);
      break; // Stop if one works
    } catch (err) {
      console.error(`  ${modelName} Failed:`, err.message);
    }
  }
}

test();
