const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

async function test() {
  const apiKey = "AIzaSyCOKoLavgmQ_MM9wiSHy7K9kpYgAzhBiDg";
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("Success?");
    console.log('Old Key Success:', result.response.text());
  } catch (err) {
    console.error('Old Key Failed:', err.message);
  }
}

test();
