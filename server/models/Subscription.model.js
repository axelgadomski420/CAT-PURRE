const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  plan: {
    type: String,
    enum: ['free', 'ad_free', 'premium', 'vip'],
    default: 'free'
  },
  features: {
    adFree: { type: Boolean, default: false },
    prioritySupport: { type: Boolean, default: false },
    unlimitedFavorites: { type: Boolean, default: false },
    advancedFilters: { type: Boolean, default: false },
    virtualVisits: { type: Number, default: 0 }, // per month
    featuredListings: { type: Number, default: 0 }, // per month
    earlyAccess: { type: Boolean, default: false },
    badge: String // 'VIP', 'Premium', etc.
  },
  validUntil: Date,
  autoRenew: { type: Boolean, default: false },
  paymentMethod: String
}, {
  timestamps: true
});

// Check if subscription is active
subscriptionSchema.methods.isActive = function() {
  return this.validUntil && this.validUntil > new Date();
};

// Plans pricing
subscriptionSchema.statics.PLANS = {
  FREE: {
    id: 'free',
    name: 'Darmowy',
    price: 0,
    features: {
      adFree: false,
      prioritySupport: false,
      unlimitedFavorites: false,
      advancedFilters: false,
      virtualVisits: 0,
      featuredListings: 0,
      earlyAccess: false
    }
  },
  AD_FREE: {
    id: 'ad_free',
    name: 'Bez Reklam',
    price: 20, // 20 PLN/month
    features: {
      adFree: true,
      prioritySupport: false,
      unlimitedFavorites: false,
      advancedFilters: false,
      virtualVisits: 0,
      featuredListings: 0,
      earlyAccess: false
    }
  },
  PREMIUM: {
    id: 'premium',
    name: 'Premium',
    price: 49, // 49 PLN/month
    features: {
      adFree: true,
      prioritySupport: true,
      unlimitedFavorites: true,
      advancedFilters: true,
      virtualVisits: 3,
      featuredListings: 0,
      earlyAccess: true,
      badge: '⭐ Premium'
    }
  },
  VIP: {
    id: 'vip',
    name: 'VIP',
    price: 99, // 99 PLN/month
    features: {
      adFree: true,
      prioritySupport: true,
      unlimitedFavorites: true,
      advancedFilters: true,
      virtualVisits: 10,
      featuredListings: 2,
      earlyAccess: true,
      badge: '👑 VIP'
    }
  }
};

module.exports = mongoose.model('Subscription', subscriptionSchema);
