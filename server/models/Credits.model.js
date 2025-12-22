const mongoose = require('mongoose');

const creditsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  balance: {
    type: Number,
    default: 0
  },
  
  // Breakdown
  earned: {
    referrals: { type: Number, default: 0 },
    promotions: { type: Number, default: 0 },
    rewards: { type: Number, default: 0 }
  },
  
  spent: {
    catPurchase: { type: Number, default: 0 },
    premium: { type: Number, default: 0 },
    adFree: { type: Number, default: 0 },
    featured: { type: Number, default: 0 },
    virtualVisits: { type: Number, default: 0 },
    other: { type: Number, default: 0 }
  },

  transactions: [{
    type: {
      type: String,
      enum: [
        'earn_referral',
        'earn_promotion', 
        'earn_reward',
        'spend_cat_purchase',
        'spend_premium',
        'spend_ad_free',
        'spend_featured',
        'spend_virtual_visit',
        'refund'
      ]
    },
    amount: Number,
    description: String,
    reference: String, // Order ID, User ID, etc.
    createdAt: { type: Date, default: Date.now }
  }]
}, {
  timestamps: true
});

// Add credits
creditsSchema.methods.addCredits = async function(amount, type, description, reference) {
  this.balance += amount;
  
  if (type === 'earn_referral') this.earned.referrals += amount;
  else if (type === 'earn_promotion') this.earned.promotions += amount;
  else if (type === 'earn_reward') this.earned.rewards += amount;
  
  this.transactions.push({ type, amount, description, reference });
  await this.save();
  return this;
};

// Spend credits
creditsSchema.methods.spendCredits = async function(amount, type, description, reference) {
  if (this.balance < amount) {
    throw new Error('Insufficient credits');
  }
  
  this.balance -= amount;
  
  if (type === 'spend_cat_purchase') this.spent.catPurchase += amount;
  else if (type === 'spend_premium') this.spent.premium += amount;
  else if (type === 'spend_ad_free') this.spent.adFree += amount;
  else if (type === 'spend_featured') this.spent.featured += amount;
  else if (type === 'spend_virtual_visit') this.spent.virtualVisits += amount;
  
  this.transactions.push({ type, amount: -amount, description, reference });
  await this.save();
  return this;
};

module.exports = mongoose.model('Credits', creditsSchema);
