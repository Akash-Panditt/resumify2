const { GoogleGenAI } = require('@google/genai');
require('dotenv').config();

async function test() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return;

  try {
    const aiClient = new GoogleGenAI({ apiKey });
    const response = await aiClient.models.list();
    console.log('Keys of response:', Object.keys(response));
    
    // In @google/genai, models.list() returns a paged result.
    // We should iterate through it or check the first page.
    for (const model of response) {
        console.log(model.name);
    }
  } catch (err) {
    console.error('List Models Failed:', err);
  }
}

test();
