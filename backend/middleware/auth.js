const jwt = require('jsonwebtoken');
const supabase = require('../supabase');

// Protect routes — verifies session and attaches user ID to request
const protect = (req, res, next) => {
  if (req.session && req.session.userId) {
    req.user = { id: req.session.userId };
    next();
  } else {
    console.warn(`[Auth Middleware] Unauthorized access attempt to ${req.originalUrl}`);
    res.status(401).json({ message: 'Not authorized, please log in' });
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
