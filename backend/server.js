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
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.FRONTEND_URL ? process.env.FRONTEND_URL.split(',') : ['http://localhost:5173', 'http://127.0.0.1:5173'],
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
