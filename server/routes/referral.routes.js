const express = require('express');
const router = express.Router();
const User = require('../models/User.model');
const Wallet = require('../models/Wallet.model');

// Get referral stats
router.get('/stats/:userId', async (req, res) => {
  try {
    const referrals = await User.find({ referredBy: req.params.userId });
    const wallet = await Wallet.findOne({ user: req.params.userId });

    const stats = {
      totalReferrals: referrals.length,
      activeReferrals: referrals.filter(r => r.lastLogin > Date.now() - 30*24*60*60*1000).length,
      totalEarned: wallet?.totalEarned || 0,
      currentBalance: wallet?.balance || 0,
      pendingBalance: wallet?.pendingBalance || 0,
      referralList: referrals.map(r => ({
        name: \`\${r.firstName} \${r.lastName[0]}.\`,
        joinedAt: r.createdAt,
        status: r.lastLogin > Date.now() - 7*24*60*60*1000 ? 'active' : 'inactive'
      }))
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Apply referral code (podczas rejestracji)
router.post('/apply', async (req, res) => {
  try {
    const { userId, referralCode } = req.body;

    // Find referrer by code
    const referrer = await User.findOne({ 
      $or: [
        { referralCode },
        { _id: referralCode.replace('CAT', '') }
      ]
    });

    if (!referrer) {
      return res.status(404).json({ error: 'Invalid referral code' });
    }

    // Update new user
    const newUser = await User.findById(userId);
    newUser.referredBy = referrer._id;
    await newUser.save();

    // Give bonuses to both
    const BONUS_AMOUNT = 100; // 100 PLN

    // Referrer bonus
    let referrerWallet = await Wallet.findOne({ user: referrer._id });
    if (!referrerWallet) {
      referrerWallet = new Wallet({ user: referrer._id });
    }
    await referrerWallet.addBonus(
      BONUS_AMOUNT,
      'referral_bonus',
      \`Bonus za zaproszenie: \${newUser.firstName} \${newUser.lastName}\`,
      newUser._id
    );

    // New user bonus
    let newUserWallet = await Wallet.findOne({ user: userId });
    if (!newUserWallet) {
      newUserWallet = new Wallet({ user: userId });
    }
    await newUserWallet.addBonus(
      BONUS_AMOUNT,
      'referral_bonus',
      \`Bonus powitalny od: \${referrer.firstName} \${referrer.lastName}\`,
      referrer._id
    );

    res.json({
      message: 'Referral applied successfully',
      bonus: BONUS_AMOUNT,
      referrerBonus: BONUS_AMOUNT
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Request withdrawal
router.post('/withdraw', async (req, res) => {
  try {
    const { userId, amount, method, accountDetails } = req.body;

    const wallet = await Wallet.findOne({ user: userId });
    if (!wallet) {
      return res.status(404).json({ error: 'Wallet not found' });
    }

    await wallet.requestWithdrawal(amount, method, accountDetails);

    res.json({
      message: 'Withdrawal request submitted',
      pendingAmount: amount,
      estimatedProcessing: '3-5 business days'
    });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get wallet balance
router.get('/wallet/:userId', async (req, res) => {
  try {
    let wallet = await Wallet.findOne({ user: req.params.userId });
    
    if (!wallet) {
      wallet = new Wallet({ user: req.params.userId });
      await wallet.save();
    }

    res.json(wallet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
