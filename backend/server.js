require('dotenv').config();
// Resumify Server — Schema updated: expires_at added 2026-04-21
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');
const resumeRoutes = require('./routes/resumes');
const adminRoutes = require('./routes/admin');
const proRoutes = require('./routes/pro');
const { router: aiRoutes } = require('./routes/ai');
const atsRoutes = require('./routes/ats');
const paymentsRoutes = require('./routes/payments');

const app = express();

// Production Environment Check
const REQUIRED_VARS = ['SUPABASE_URL', 'SUPABASE_ANON_KEY', 'FRONTEND_URL'];
console.log('--- Production Health Check ---');
REQUIRED_VARS.forEach(v => {
  if (!process.env[v]) {
    console.warn(`[WARNING] Missing Environment Variable: ${v}`);
  } else {
    console.log(`[OK] ${v} is set`);
  }
});
if (!process.env.GEMINI_API_KEY) {
  console.warn('[WARNING] GEMINI_API_KEY is missing. AI features will be disabled.');
}
console.log('-------------------------------');
const PORT = process.env.PORT || 5000;

const allowedOrigins = process.env.FRONTEND_URL 
  ? process.env.FRONTEND_URL.split(',') 
  : ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000', 'http://127.0.0.1:5173'];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1 || origin.includes('localhost') || origin.includes('127.0.0.1')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/resumes', resumeRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/pro', proRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/ats', atsRoutes);
app.use('/api/payments', paymentsRoutes);

app.get('/api/health', (req, res) => {
  res.json({ message: 'API is running successfully' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
