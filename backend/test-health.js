const axios = require('axios');

async function testStats() {
    try {
        const res = await axios.get('http://localhost:5000/api/health');
        console.log('Health Check:', res.data);
    } catch (err) {
        console.error('Health Check Failed:', err.message);
    }
}

testStats();
