const { GoogleGenAI } = require('@google/genai');
require('dotenv').config();

async function test() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return;

  const client = new GoogleGenAI({ apiKey });
  try {
    console.log(`Testing gemini-1.5-flash with v1...`);
    // The @google/genai SDK constructor takes options.
    // Let's try to set the version there if possible.
    const clientV1 = new GoogleGenAI({ apiKey, apiVersion: 'v1' });
    const response = await clientV1.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: [{ role: 'user', parts: [{ text: "Success?" }] }],
    });
    console.log(`Success:`, response.text);
  } catch (err) {
    console.error(`Failed:`, err.message);
  }
}

test();
