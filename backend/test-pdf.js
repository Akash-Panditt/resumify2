const pdfParse = require('pdf-parse');
const fs = require('fs');

// Create a dummy PDF buffer or try to read a small one
// For testing purposes, we'll just try to require it and see if it crashes
try {
    console.log('pdf-parse version:', require('pdf-parse/package.json').version);
} catch (e) {
    console.error('pdf-parse not found or error loading:', e.message);
}
