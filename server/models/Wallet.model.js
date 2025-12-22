const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  balance: {
    type: Number,
    default: 0,
    min: 0
  },
  pendingBalance: {
    type: Number,
    default: 0,
    min: 0
  },
  totalEarned: {
    type: Number,
    default: 0
  },
  transactions: [{
    type: {
      type: String,
      enum: ['referral_bonus', 'purchase', 'withdrawal', 'admin_adjustment'],
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    description: String,
    relatedUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'cancelled'],
      default: 'completed'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  withdrawals: [{
    amount: Number,
    method: String, // 'bank_transfer', 'blik', 'paypal'
    status: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'rejected'],
      default: 'pending'
    },
    accountDetails: Object,
    processedAt: Date,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

// Methods
walletSchema.methods.addBonus = async function(amount, type, description, relatedUser) {
  this.balance += amount;
  this.totalEarned += amount;
  this.transactions.push({
    type,
    amount,
    description,
    relatedUser,
    status: 'completed'
  });
  await this.save();
  return this;
};

walletSchema.methods.deductBalance = async function(amount, description) {
  if (this.balance < amount) {
    throw new Error('Insufficient balance');
  }
  this.balance -= amount;
  this.transactions.push({
    type: 'purchase',
    amount: -amount,
    description,
    status: 'completed'
  });
  await this.save();
  return this;
};

walletSchema.methods.requestWithdrawal = async function(amount, method, accountDetails) {
  const MIN_WITHDRAWAL = 500; // Min 500 PLN to withdraw
  
  if (amount < MIN_WITHDRAWAL) {
    throw new Error(\`Minimum withdrawal amount is \${MIN_WITHDRAWAL} PLN\`);
  }
  
  if (this.balance < amount) {
    throw new Error('Insufficient balance');
  }

  this.balance -= amount;
  this.pendingBalance += amount;
  
  this.withdrawals.push({
    amount,
    method,
    accountDetails,
    status: 'pending'
  });

  await this.save();
  return this;
};

module.exports = mongoose.model('Wallet', walletSchema);
