const jwt = require('jsonwebtoken');
const supabase = require('../supabase');

// Protect routes — verifies JWT and attaches user to request
const protect = (req, res, next) => {
  let token = req.cookies.token;

  if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
      req.user = decoded; // { id: '...' }
      next();
    } catch (error) {
      console.error('[Auth Middleware] Token invalid:', error.message);
      res.status(401).json({ message: 'Not authorized, token invalid' });
    }
  } else {
    console.warn('[Auth Middleware] No token found in cookies or headers');
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Require admin role (Sub or Super)
const requireSubAdmin = async (req, res, next) => {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('role, is_blocked')
      .eq('id', req.user.id)
      .maybeSingle();

    if (error || !user || user.is_blocked || !['admin', 'super_admin', 'sub_admin'].includes(user.role)) {
      return res.status(403).json({ message: 'Forbidden: Admin access required or account blocked' });
    }
    req.userRole = user.role;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Forbidden' });
  }
};

// Require Super Admin strictly
const requireSuperAdmin = async (req, res, next) => {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('role, is_blocked')
      .eq('id', req.user.id)
      .maybeSingle();

    if (error || !user || user.is_blocked || !['admin', 'super_admin'].includes(user.role)) {
      return res.status(403).json({ message: 'Forbidden: Super Admin access required' });
    }
    req.userRole = user.role;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Forbidden' });
  }
};

// Middleware factory for logging admin actions
const logAdminActivity = (action, resource) => {
  return async (req, res, next) => {
    try {
      if (req.user && req.user.id) {
        supabase.from('admin_activity_logs').insert([{
          admin_id: req.user.id,
          action: action,
          resource: resource || req.originalUrl,
          details: { method: req.method, query: req.query, body_keys: Object.keys(req.body || {}) },
          ip_address: req.ip || req.connection?.remoteAddress || 'unknown'
        }]).then(({ error }) => {
          if (error) console.error('[Activity Log Error]', error.message);
        });
      }
    } catch (e) {
      console.error('[Activity Log Exception]', e.message);
    }
    next();
  };
};

module.exports = { protect, requireAdmin: requireSubAdmin, requireSubAdmin, requireSuperAdmin, logAdminActivity };
