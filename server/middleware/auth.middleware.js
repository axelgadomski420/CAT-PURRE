const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

// Verify JWT token
exports.authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Check if user is admin
exports.isAdmin = (req, res, next) => {
  if (req.user.userType !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

// Check if user is breeder
exports.isBreeder = (req, res, next) => {
  if (req.user.userType !== 'breeder' && req.user.userType !== 'admin') {
    return res.status(403).json({ error: 'Breeder access required' });
  }
  next();
};

// Check subscription limits
exports.checkSubscriptionLimit = (resource) => {
  return async (req, res, next) => {
    try {
      // Get user's subscription
      const subscription = await getSubscription(req.user._id);
      
      if (!subscription) {
        return res.status(403).json({ error: 'No active subscription' });
      }
      
      // Check limit
      const limit = subscription.limits[resource];
      const usage = subscription.usage[resource] || 0;
      
      if (usage >= limit) {
        return res.status(403).json({ 
          error: \`\${resource} limit exceeded\`,
          limit,
          usage
        });
      }
      
      next();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
};

// Helper function
async function getSubscription(userId) {
  // Mock - replace with actual DB query
  return {
    limits: { activeCats: 15, photos: 20 },
    usage: { activeCats: 7, photos: 45 }
  };
}
