const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const supabase = require('../supabase');
const { OAuth2Client } = require('google-auth-library');
const nodemailer = require('nodemailer');
const { Client: PgClient } = require('pg');

// Direct Postgres connection — bypasses Supabase PostgREST schema cache
const getPgClient = () => new PgClient({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});


// In-memory OTP store (Use a DB table/Redis for production)
const otpStore = new Map();

// Helper to send email
const sendEmail = async (to, subject, text, html) => {
  const isPlaceholder = 
    process.env.SMTP_USER === 'your-email@gmail.com' || 
    process.env.SMTP_PASS === 'your-app-password' || 
    !process.env.SMTP_USER;

  if (isPlaceholder) {
    console.log('\n=========================================');
    console.log('📧 [DEV MODE] OTP SIMULATION');
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    const otpMatch = text.match(/\d{6}/);
    console.log(`OTP Code: ${otpMatch ? otpMatch[0] : 'N/A'}`);
    console.log('=========================================\n');
    return;
  }

  const transporter = nodemailer.createTransport({
    service: process.env.SMTP_HOST?.includes('gmail') ? 'gmail' : undefined,
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_PORT == 465, 
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    const info = await transporter.sendMail({ 
      from: `"Resumify" <${process.env.SMTP_USER}>`, 
      to, 
      subject, 
      text, 
      html 
    });
    console.log('✅ Email sent:', info.messageId);
  } catch (err) {
    console.error('❌ Mail Error:', err);
    throw new Error(`Email service failed: ${err.message}`);
  }
};

const router = express.Router();
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '15d' });
};

const sendAuthCookie = (res, user) => {
  const token = generateToken(user.id || user._id);
  console.log(`[Auth] Setting cookie for user: ${user.email}`);
  
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // false in dev
    sameSite: 'lax',
    path: '/',
    maxAge: 15 * 24 * 60 * 60 * 1000 // 15 days
  });
  return token;
};


const formatUserResponse = (user, token) => ({
  id: user.id || user._id,
  _id: user.id || user._id,
  name: user.name,
  email: user.email,
  plan: user.plan || 'free',
  role: user.role || 'user',
  download_count: user.download_count || 0,
  requested_plan: user.requested_plan || null,
  expires_at: user.expires_at || null,
  token: token || generateToken(user.id || user._id) // fallback for legacy
});




router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const { data: userExists } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .maybeSingle();
      
    if (userExists) return res.status(400).json({ message: 'User already exists' });
    
    // Password complexity validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ 
        message: 'Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.' 
      });
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const { data: user, error } = await supabase
      .from('users')
      .insert([{ name, email, password: hashedPassword, is_verified: true }])
      .select()
      .single();
      
    if (error) throw error;

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        plan: user.plan,
        role: user.role || 'user',
        download_count: user.download_count || 0,
        requested_plan: user.requested_plan || null,
        expires_at: user.expires_at || null,
        token: generateToken(user.id)
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const cleanEmail = email.toLowerCase().trim();
    
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', cleanEmail)
      .maybeSingle();
      
    if (error) throw error;
    
    if (user && user.password && (await bcrypt.compare(password, user.password))) {
      // 1. Check if user is already verified (Single-Point OTP)
      if (user.is_verified || user.role === 'admin') {
        console.log(`[Auth] Login Success (Bypass OTP): ${cleanEmail}`);
        const token = sendAuthCookie(res, user);
        return res.json(formatUserResponse(user, token));
      }

      // 2. Not verified -> Proceed to Onboarding OTP (Gmail)
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const expiry = Date.now() + 59 * 1000;
      otpStore.set(cleanEmail, { otp, expiry });

      console.log(`[Auth] Onboarding OTP ${otp} generated for ${cleanEmail}`);

      await sendEmail(
        cleanEmail,
        'Complete Your Registration (OTP)',
        `Welcome to Resumify! Use ${otp} to verify your account and start building.`,
        `<div style="font-family: sans-serif; padding: 20px;">
          <h2>Account Onboarding</h2>
          <p>Please enter the following code to verify your account:</p>
          <h1 style="color: #6366f1;">${otp}</h1>
          <p>Expires in 59 seconds.</p>
        </div>`
      );

      return res.json({ requireOtp: true, email: cleanEmail });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// REQUEST OTP for Login or Forgot Password
router.post('/send-otp', async (req, res) => {
  try {
    const { email, type } = req.body; // type: 'login' or 'forgot'
    const cleanEmail = email.toLowerCase().trim();

    // Check if user exists
    const { data: user } = await supabase.from('users').select('*').eq('email', cleanEmail).maybeSingle();
    if (!user) return res.status(404).json({ message: 'User not found with this email' });

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = Date.now() + 59 * 1000; // 59 seconds

    otpStore.set(cleanEmail, { otp, expiry });

    // Send Email
    const subject = type === 'forgot' ? 'Reset Your Resumify Password' : 'Your Resumify Login OTP';
    const msgType = type === 'forgot' ? 'reset your password' : 'login to your account';
    
    await sendEmail(
      cleanEmail,
      subject,
      `Your OTP is ${otp}. It expires in 59 seconds.`,
      `<div style="font-family: sans-serif; padding: 20px; color: #333;">
        <h2>Resumify Security</h2>
        <p>Use the following OTP to ${msgType}:</p>
        <h1 style="color: #6366f1; letter-spacing: 5px;">${otp}</h1>
        <p style="color: #666;">This code will expire in <strong>59 seconds</strong>.</p>
        <hr/>
        <p style="font-size: 0.8rem; color: #999;">If you didn't request this, please ignore this email.</p>
      </div>`
    );

    res.json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('OTP Send Error:', error);
    res.status(500).json({ message: 'Failed to send OTP. Check SMTP settings.' });
  }
});

// VERIFY OTP for Login (existing)
router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    const cleanEmail = email.toLowerCase().trim();

    const stored = otpStore.get(cleanEmail);

    if (!stored || stored.otp !== otp) {
      return res.status(401).json({ message: 'Invalid OTP' });
    }

    if (Date.now() > stored.expiry) {
      otpStore.delete(cleanEmail);
      return res.status(401).json({ message: 'OTP has expired' });
    }

    // OTP Correct -> Mark User as Verified
    otpStore.delete(cleanEmail);

    const { data: user, error: updateError } = await supabase
      .from('users')
      .update({ is_verified: true, updated_at: new Date().toISOString() })
      .eq('email', cleanEmail)
      .select()
      .single();
    
    if (updateError) throw updateError;
    
    console.log(`[Auth Success] User ${cleanEmail} verified. Issuing 15-day session.`);
    const token = sendAuthCookie(res, user);
    res.json(formatUserResponse(user, token));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// NEW: VERIFY OTP for Forgot Password -> Returns Reset Token
router.post('/forgot-password/verify', async (req, res) => {
  try {
    const { email, otp } = req.body;
    const cleanEmail = email.toLowerCase().trim();

    const stored = otpStore.get(cleanEmail);

    if (!stored || stored.otp !== otp) {
      return res.status(401).json({ message: 'Invalid OTP' });
    }

    if (Date.now() > stored.expiry) {
      otpStore.delete(cleanEmail);
      return res.status(401).json({ message: 'OTP has expired' });
    }

    // Success! Generate a long-lived reset token (10 mins)
    otpStore.delete(cleanEmail);
    const resetToken = jwt.sign(
      { email: cleanEmail, type: 'password_reset' }, 
      process.env.JWT_SECRET || 'fallback_secret', 
      { expiresIn: '10m' }
    );

    res.json({ message: 'OTP verified successfully', resetToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATED: RESET PASSWORD with Reset Token
router.post('/forgot-password/reset', async (req, res) => {
  try {
    const { email, resetToken, newPassword } = req.body;
    const cleanEmail = email.toLowerCase().trim();

    // Verify the Reset Token
    let decoded;
    try {
      decoded = jwt.verify(resetToken, process.env.JWT_SECRET || 'fallback_secret');
    } catch (err) {
      return res.status(401).json({ message: 'Reset session expired or invalid. Please try again.' });
    }

    if (decoded.email !== cleanEmail || decoded.type !== 'password_reset') {
      return res.status(401).json({ message: 'Invalid reset token' });
    }

    // Token Correct - Update Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const { error } = await supabase
      .from('users')
      .update({ password: hashedPassword, updated_at: new Date().toISOString() })
      .eq('email', cleanEmail);

    if (error) throw error;
    
    res.json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



router.post('/google', async (req, res) => {
  try {
    const { credential } = req.body;
    const ticket = await googleClient.verifyIdToken({
      idToken: credential
    });
    const payload = ticket.getPayload();
    const email = payload.email.toLowerCase().trim();
    const { name } = payload;

    let { data: user } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (!user) {
      const randomPassword = Math.random().toString(36).slice(-10) + Math.random().toString(36).slice(-10);
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(randomPassword, salt);
      
      const { data: newUser, error: createError } = await supabase
        .from('users')
        .insert([{ name, email, password: hashedPassword, is_verified: true }])
        .select()
        .single();
        
      if (createError) throw createError;
      user = newUser;
    }

    console.log(`[Google Success] Logged in user: ${user.email}`);
    const token = sendAuthCookie(res, user);
    res.json(formatUserResponse(user, token));
  } catch (error) {
    console.error('[Google Auth Error]:', error.message, error.stack);
    res.status(500).json({ 
      message: 'Google Authentication failed', 
      error: error.message,
      suggestion: 'Ensure GOOGLE_CLIENT_ID matches in both frontend and backend .env files.'
    });
  }
});

// POST /api/auth/request-upgrade — Request a higher tier
router.post('/request-upgrade', async (req, res) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
      const { plan } = req.body;

      console.log(`[Upgrade] User ${decoded.id} requested plan: ${plan}`);

      if (!['basic', 'pro', 'premium'].includes(plan)) {
        return res.status(400).json({ message: 'Invalid plan requested. Choose basic or pro.' });
      }

      const { data, error } = await supabase
        .from('users')
        .update({ requested_plan: plan, updated_at: new Date().toISOString() })
        .eq('id', decoded.id)
        .select('id, name, requested_plan')
        .maybeSingle();
        
      if (error) {
        console.error('[Upgrade Error]:', error);
        throw error;
      }

      if (!data) {
        return res.status(404).json({ message: 'User not found' });
      }

      console.log(`[Upgrade Success] Row updated for ${data.name}`);
      res.json({ message: 'Upgrade requested. Waiting for admin approval.', requested_plan: data.requested_plan });
    } else {
      res.status(401).json({ message: 'Not authorized' });
    }
  } catch (error) {
    console.error('[Upgrade Catch Loop]:', error.message);
    res.status(500).json({ message: error.message });
  }
});

// Middleware to check/update subscription expiry (Placeholder for future)
const checkSubscriptionExpiry = async (user) => {
  if (user.plan !== 'free' && user.expires_at) {
    const now = new Date();
    const expiry = new Date(user.expires_at);
    
    if (now > expiry) {
      console.log(`[Subscription] Plan ${user.plan} expired for user ${user.id}. Downgrading to free.`);
      const { data: downgradedUser } = await supabase
        .from('users')
        .update({ 
          plan: 'free', 
          expires_at: null,
          updated_at: new Date().toISOString() 
        })
        .eq('id', user.id)
        .select()
        .single();
      return downgradedUser || user;
    }
  }
  return user;
};

// Middleware to reset download count monthly (Lazy)
const checkDownloadReset = async (user) => {
  const lastReset = new Date(user.updated_at || user.created_at);
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  if (lastReset < thirtyDaysAgo && user.download_count > 0) {
    const { data: updatedUser } = await supabase
      .from('users')
      .update({ 
        download_count: 0, 
        updated_at: new Date().toISOString() 
      })
      .eq('id', user.id)
      .select()
      .single();
    return updatedUser || user;
  }
  return user;
};

router.get('/profile', async (req, res) => {
  let pg;
  try {
    // 1. Get token from Cookies or Authorization Header
    let token = req.cookies.token;
    if (!token && req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }

    // 2. Verify Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');

    // 3. Fetch user via direct pg (bypasses PostgREST schema cache)
    pg = getPgClient();
    await pg.connect();
    const result = await pg.query(
      'SELECT id, name, email, plan, role, download_count, requested_plan, expires_at, is_verified, created_at, updated_at FROM public.users WHERE id = $1',
      [decoded.id]
    );
    await pg.end();
    pg = null;

    let user = result.rows[0];
    if (!user) return res.status(401).json({ message: 'User not found' });

    // 4. Lazy Checks (using Supabase client for writes — these columns now exist)
    user = await checkSubscriptionExpiry(user);
    user = await checkDownloadReset(user);

    // 5. Sliding Window Refresh
    const freshToken = sendAuthCookie(res, user);

    res.json(formatUserResponse(user, freshToken));
  } catch (error) {
    if (pg) { try { await pg.end(); } catch (_) {} }
    console.error('[Profile Error]:', error.message);
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out' });
});


module.exports = router;
