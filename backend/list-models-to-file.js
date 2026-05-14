const { GoogleGenAI } = require('@google/genai');
require('dotenv').config();
const fs = require('fs');

async function test() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return;

  try {
    const aiClient = new GoogleGenAI({ apiKey });
    const response = await aiClient.models.list();
    const modelNames = response.models.map(m => m.name);
    fs.writeFileSync('available-models.txt', modelNames.join('\n'));
    console.log('Saved model names to available-models.txt');
  } catch (err) {
    console.error('List Models Failed:', err);
  }
}

test();
