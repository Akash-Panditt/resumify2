const officeParser = require('officeparser');
const fs = require('fs');

// We'll try to use a dummy buffer or a real one if I can create it.
// Here, we'll just check if it's a function and if it takes a buffer.
console.log('officeParser keys:', Object.keys(officeParser));

async function test() {
    try {
        // officeparser usually expects a file path.
        // Let's see if we can use it with a temporary file if buffer fails.
        console.log('Testing parseOfficeAsync existence...');
        if (typeof officeParser.parseOfficeAsync === 'function') {
            console.log('parseOfficeAsync exists.');
        } else {
            console.log('parseOfficeAsync DOES NOT exist.');
        }
    } catch (e) {
        console.error('Test error:', e.message);
    }
}

test();
