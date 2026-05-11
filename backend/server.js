require('dotenv').config();
// Resumify Server — Schema updated: expires_at added 2026-04-21
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { MongoStore } = require('connect-mongo');
const helmet = require('helmet');
const authRoutes = require('./routes/auth');
const resumeRoutes = require('./routes/resumes');
const adminRoutes = require('./routes/admin');
const proRoutes = require('./routes/pro');
const { router: aiRoutes } = require('./routes/ai');
const atsRoutes = require('./routes/ats');
const paymentsRoutes = require('./routes/payments');

const app = express();

// Trust proxy for secure cookies (Render/Vercel)
app.set('trust proxy', 1);

// Security Headers
// Security Headers — Configured for Google Sign-In compatibility
app.use(helmet({
  crossOriginOpenerPolicy: { policy: "same-origin-allow-popups" },
  contentSecurityPolicy: false, // Disable CSP in dev to prevent blocking external Google GSI scripts
}));

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

    const isAllowed = allowedOrigins.some(allowed =>
      origin === allowed.trim() ||
      origin === allowed.trim().replace(/\/$/, '')
    );
    const isVercel = origin.endsWith('.vercel.app');
    const isLocal = origin.includes('localhost') || origin.includes('127.0.0.1');

    if (isAllowed || isVercel || isLocal) {
      callback(null, true);
    } else {
      console.warn(`[CORS REJECTED] Origin: ${origin}. If this is your production URL, add it to FRONTEND_URL in Render env vars.`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Session Configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'resumify_secret_key_2024',
  resave: false,
  saveUninitialized: false,
  // Using default MemoryStore for development to avoid crash if MongoDB is not running
  // store: MongoStore.create({
  //   mongoUrl: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/resumify',
  //   collectionName: 'sessions',
  //   ttl: 24 * 60 * 60 // 1 day
  // }),
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  },
  name: 'resumify.sid' // Custom session ID name
}));

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

// --- Automated Resume Cleanup Job (1 Week Expiry) ---
const supabase = require('./supabase');
const runResumeCleanup = async () => {
  try {
    console.log('[Cleanup Job] Checking for resumes older than 1 week...');
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const { data, error } = await supabase
      .from('resumes')
      .delete()
      .neq('title', '___MASTER_PROFILE___') // CRITICAL: Protect the user's master profile
      .lt('updated_at', oneWeekAgo.toISOString())
      .select('id');

    if (error) {
      console.error('[Cleanup Job] DB Error:', error.message);
    } else if (data && data.length > 0) {
      console.log(`[Cleanup Job] Auto-deleted ${data.length} expired resume(s).`);
    } else {
      console.log('[Cleanup Job] No expired resumes found.');
    }
  } catch (err) {
    console.error('[Cleanup Job] Execution Error:', err.message);
  }
};

// Run cleanup job every 12 hours
setInterval(runResumeCleanup, 12 * 60 * 60 * 1000);
// Run once on server startup (after 5 seconds)
setTimeout(runResumeCleanup, 5000);
// ---------------------------------------------------

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
