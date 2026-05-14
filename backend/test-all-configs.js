const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

async function test() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return;

  const genAI = new GoogleGenerativeAI(apiKey);
  const configs = [
    { model: "gemini-1.5-flash", apiVersion: "v1beta" },
    { model: "gemini-1.5-flash", apiVersion: "v1" },
    { model: "gemini-pro", apiVersion: "v1beta" },
    { model: "gemini-1.0-pro", apiVersion: "v1beta" }
  ];

  for (const config of configs) {
    try {
      console.log(`Testing: ${config.model} (${config.apiVersion})`);
      const model = genAI.getGenerativeModel({ model: config.model }, { apiVersion: config.apiVersion });
      const result = await model.generateContent("Success?");
      console.log(`  Success:`, result.response.text());
      return;
    } catch (err) {
      console.error(`  Failed:`, err.message);
    }
  }
}

test();
