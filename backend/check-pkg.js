const genai = require('@google/genai');
console.log('Keys:', Object.keys(genai));
if (genai.GoogleGenAI) {
  console.log('GoogleGenAI prototype:', Object.keys(genai.GoogleGenAI.prototype));
}
