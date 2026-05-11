const fs = require('fs');
const pdf = require('pdf-parse');

const dataBuffer = fs.readFileSync('d:\\Resumify2\\pdf\\Aasaman Dixit.pdf');

pdf(dataBuffer).then(function(data) {
    console.log('--- TEXT START ---');
    console.log(data.text);
    console.log('--- TEXT END ---');
    console.log('Text Length:', data.text.trim().length);
}).catch(err => {
    console.error('Error:', err);
});
