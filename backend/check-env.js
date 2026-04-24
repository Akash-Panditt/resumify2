require('dotenv').config();
console.log("GEMINI_API_KEY starts with:", process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.substring(0, 10) + "..." : "undefined");
console.log("GEMINI_MODEL:", process.env.GEMINI_MODEL);
