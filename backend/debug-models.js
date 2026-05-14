const { GoogleGenAI } = require('@google/genai');
require('dotenv').config();

async function test() {
  const apiKey = process.env.GEMINI_API_KEY;
  const client = new GoogleGenAI({ apiKey });
  try {
    const response = await client.models.list();
    console.log('Total models:', response.models?.length || 'unknown');
    // For @google/genai, models.list() might return a paged object
    const models = response.models || response;
    for (let i = 0; i < 10 && i < models.length; i++) {
        console.log(models[i].name);
    }
  } catch (err) {
    console.error('List Failed:', err);
  }
}

test();
