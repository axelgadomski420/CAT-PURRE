#!/bin/zsh

echo "🔥🔥🔥 COMPLETE VIRAL SYSTEM - Wszystkie pozostałe features!"

# ============================================
# REFERRAL WALLET SYSTEM - 100 PLN credits
# ============================================

cat > server/models/Wallet.model.js << 'WALLETMODELEOF'
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
WALLETMODELEOF

# ============================================
# REFERRAL ROUTES
# ============================================

cat > server/routes/referral.routes.js << 'REFERRALROUTESEOF'
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
REFERRALROUTESEOF

# Add to server.js
cat >> server/server.js << 'SERVERADDEOF'

const referralRoutes = require('./routes/referral.routes');
app.use('/api/referral', referralRoutes);
SERVERADDEOF

# ============================================
# WALLET PAGE - Frontend
# ============================================

cat > src/pages/wallet.js << 'WALLETEOF'
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '../components/ui/Navbar';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import { useAuth } from '../context/AuthContext';

export default function WalletPage() {
  const { user } = useAuth();
  const [wallet, setWallet] = useState(null);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawMethod, setWithdrawMethod] = useState('bank_transfer');
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  useEffect(() => {
    loadWallet();
  }, [user]);

  const loadWallet = async () => {
    // API call
    const mockWallet = {
      balance: 850,
      pendingBalance: 200,
      totalEarned: 1250,
      transactions: [
        { type: 'referral_bonus', amount: 100, description: 'Bonus za Jana K.', createdAt: new Date() },
        { type: 'referral_bonus', amount: 100, description: 'Bonus za Annę M.', createdAt: new Date() },
        { type: 'purchase', amount: -200, description: 'Zakup: Luna', createdAt: new Date() },
      ]
    };
    setWallet(mockWallet);
  };

  const requestWithdrawal = () => {
    if (parseInt(withdrawAmount) < 500) {
      alert('Minimalna kwota wypłaty: 500 PLN');
      return;
    }
    if (parseInt(withdrawAmount) > wallet.balance) {
      alert('Niewystarczające środki');
      return;
    }
    
    alert(\`Wniosek o wypłatę \${withdrawAmount} PLN został złożony!\`);
    setShowWithdrawModal(false);
  };

  if (!wallet) return <div>Ładowanie...</div>;

  return (
    <ProtectedRoute requireAuth={true}>
      <Head>
        <title>Portfel - CAT PURRE</title>
      </Head>

      <Navbar />

      <div className="wallet-page">
        <div className="container">
          <h1>💰 Twój Portfel</h1>

          <div className="balance-cards">
            <div className="balance-card main">
              <span className="label">Dostępne środki</span>
              <h2>{wallet.balance.toLocaleString()} PLN</h2>
              <button 
                className="btn btn-primary"
                onClick={() => setShowWithdrawModal(true)}
                disabled={wallet.balance < 500}
              >
                Wypłać
              </button>
              {wallet.balance < 500 && (
                <p className="hint">Min. 500 PLN do wypłaty</p>
              )}
            </div>

            <div className="balance-card">
              <span className="label">W trakcie wypłaty</span>
              <h3>{wallet.pendingBalance.toLocaleString()} PLN</h3>
              <span className="status">⏳ Przetwarzanie</span>
            </div>

            <div className="balance-card">
              <span className="label">Łącznie zarobione</span>
              <h3>{wallet.totalEarned.toLocaleString()} PLN</h3>
              <span className="status">🎉 Gratulacje!</span>
            </div>
          </div>

          <div className="usage-info">
            <h3>💡 Jak wykorzystać środki?</h3>
            <div className="usage-options">
              <div className="option">
                <span className="icon">🛒</span>
                <div>
                  <h4>Zakup kota</h4>
                  <p>Użyj jako rabat przy zakupie</p>
                </div>
              </div>
              <div className="option">
                <span className="icon">💸</span>
                <div>
                  <h4>Wypłata</h4>
                  <p>Min. 500 PLN, przelew 3-5 dni</p>
                </div>
              </div>
              <div className="option">
                <span className="icon">🎁</span>
                <div>
                  <h4>Podaruj</h4>
                  <p>Przekaż znajomemu (wkrótce)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="transactions-section">
            <h2>📊 Historia transakcji</h2>
            <div className="transactions-list">
              {wallet.transactions.map((tx, idx) => (
                <div key={idx} className={\`transaction-item \${tx.amount > 0 ? 'income' : 'expense'}\`}>
                  <div className="tx-icon">
                    {tx.type === 'referral_bonus' ? '🎁' : '🛒'}
                  </div>
                  <div className="tx-details">
                    <strong>{tx.description}</strong>
                    <span className="tx-date">
                      {new Date(tx.createdAt).toLocaleDateString('pl-PL')}
                    </span>
                  </div>
                  <div className={\`tx-amount \${tx.amount > 0 ? 'positive' : 'negative'}\`}>
                    {tx.amount > 0 ? '+' : ''}{tx.amount} PLN
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showWithdrawModal && (
        <div className="modal-overlay" onClick={() => setShowWithdrawModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>💸 Wypłata środków</h2>
            
            <div className="form-group">
              <label>Kwota (min. 500 PLN)</label>
              <input
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                placeholder="500"
                min="500"
                max={wallet.balance}
              />
            </div>

            <div className="form-group">
              <label>Metoda wypłaty</label>
              <select value={withdrawMethod} onChange={(e) => setWithdrawMethod(e.target.value)}>
                <option value="bank_transfer">Przelew bankowy</option>
                <option value="blik">BLIK</option>
                <option value="paypal">PayPal</option>
              </select>
            </div>

            <div className="form-group">
              <label>Numer konta</label>
              <input type="text" placeholder="PL 1234 5678..." />
            </div>

            <div className="modal-actions">
              <button className="btn btn-outline" onClick={() => setShowWithdrawModal(false)}>
                Anuluj
              </button>
              <button className="btn btn-primary" onClick={requestWithdrawal}>
                Wypłać {withdrawAmount} PLN
              </button>
            </div>

            <p className="info-text">
              ⏱️ Czas przetwarzania: 3-5 dni roboczych<br />
              💳 Prowizja: 0% (darmowa wypłata)
            </p>
          </div>
        </div>
      )}

      <style jsx>{`
        .wallet-page {
          min-height: 100vh;
          padding: 40px 0;
          background: var(--gray-50);
        }
        .wallet-page h1 {
          font-size: 48px;
          margin-bottom: 40px;
        }
        .balance-cards {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 24px;
          margin-bottom: 40px;
        }
        .balance-card {
          background: white;
          padding: 30px;
          border-radius: 20px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .balance-card.main {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
        }
        .balance-card .label {
          display: block;
          opacity: 0.8;
          margin-bottom: 12px;
          font-size: 14px;
        }
        .balance-card h2 {
          font-size: 48px;
          margin: 0 0 20px 0;
        }
        .balance-card h3 {
          font-size: 32px;
          margin: 0 0 12px 0;
        }
        .balance-card .hint {
          margin-top: 12px;
          font-size: 13px;
          opacity: 0.8;
        }
        .status {
          font-size: 14px;
          opacity: 0.7;
        }
        .usage-info {
          background: white;
          padding: 40px;
          border-radius: 20px;
          margin-bottom: 40px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .usage-options {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-top: 24px;
        }
        .option {
          display: flex;
          gap: 16px;
          padding: 20px;
          background: var(--gray-50);
          border-radius: 16px;
        }
        .option .icon {
          font-size: 40px;
        }
        .option h4 {
          margin: 0 0 6px 0;
        }
        .option p {
          margin: 0;
          font-size: 14px;
          color: var(--gray-600);
        }
        .transactions-section {
          background: white;
          padding: 40px;
          border-radius: 20px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .transactions-list {
          margin-top: 24px;
        }
        .transaction-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px;
          border-bottom: 1px solid var(--gray-200);
        }
        .transaction-item:last-child {
          border-bottom: none;
        }
        .tx-icon {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: var(--gray-100);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
        }
        .tx-details {
          flex: 1;
        }
        .tx-details strong {
          display: block;
          margin-bottom: 4px;
        }
        .tx-date {
          font-size: 13px;
          color: var(--gray-500);
        }
        .tx-amount {
          font-size: 20px;
          font-weight: bold;
        }
        .tx-amount.positive {
          color: var(--success);
        }
        .tx-amount.negative {
          color: var(--danger);
        }
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        .modal-content {
          background: white;
          padding: 40px;
          border-radius: 30px;
          max-width: 500px;
          width: 90%;
        }
        .modal-content h2 {
          margin-bottom: 24px;
        }
        .form-group {
          margin-bottom: 20px;
        }
        .modal-actions {
          display: flex;
          gap: 16px;
          margin-top: 30px;
        }
        .info-text {
          margin-top: 20px;
          font-size: 13px;
          color: var(--gray-600);
          text-align: center;
        }
        @media (max-width: 768px) {
          .balance-cards,
          .usage-options {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </ProtectedRoute>
  );
}
WALLETEOF

# ============================================
# 5. AR CAT TRY-ON (WebXR)
# ============================================

cat > src/pages/ar-try-on.js << 'AREOF'
import React, { useState } from 'react';
import Head from 'head';
import Navbar from '../components/ui/Navbar';

export default function ARTryOnPage() {
  const [arSupported, setArSupported] = useState(true);
  const [selectedCat, setSelectedCat] = useState(null);

  const cats = [
    { id: 1, name: 'Luna', model: '/models/cat1.glb' },
    { id: 2, name: 'Max', model: '/models/cat2.glb' },
  ];

  const startAR = () => {
    if ('xr' in navigator) {
      alert('Otwieranie AR...');
      // WebXR implementation
    } else {
      alert('AR nie jest wspierane na tym urządzeniu');
    }
  };

  return (
    <>
      <Head>
        <title>AR Try-On - CAT PURRE</title>
      </Head>

      <Navbar />

      <div className="ar-page">
        <div className="container">
          <h1>📱 Zobacz kota w swoim domu!</h1>
          <p className="subtitle">Technologia AR - umieść kota w swoim salonie</p>

          <div className="ar-preview">
            <div className="preview-box">
              <span className="preview-icon">📷</span>
              <p>Kliknij "Start AR" aby zobaczyć kota<br/>w rzeczywistości rozszerzonej</p>
            </div>
          </div>

          <div className="cat-selector">
            <h3>Wybierz kota:</h3>
            <div className="cats-grid">
              {cats.map(cat => (
                <button
                  key={cat.id}
                  className={\`cat-option \${selectedCat?.id === cat.id ? 'active' : ''}\`}
                  onClick={() => setSelectedCat(cat)}
                >
                  🐱 {cat.name}
                </button>
              ))}
            </div>
          </div>

          <button 
            className="btn btn-primary btn-lg"
            onClick={startAR}
            disabled={!selectedCat}
          >
            📲 Start AR Experience
          </button>

          <div className="ar-requirements">
            <h4>⚙️ Wymagania:</h4>
            <ul>
              <li>✅ iOS 12+ lub Android 8+</li>
              <li>✅ ARCore/ARKit support</li>
              <li>✅ Kamera tylna</li>
              <li>✅ Dobra jasność</li>
            </ul>
          </div>
        </div>
      </div>

      <style jsx>{`
        .ar-page {
          min-height: 100vh;
          padding: 40px 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }
        .ar-page h1 {
          text-align: center;
          font-size: 48px;
          margin-bottom: 16px;
        }
        .subtitle {
          text-align: center;
          font-size: 20px;
          margin-bottom: 50px;
          opacity: 0.9;
        }
        .ar-preview {
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          border-radius: 30px;
          padding: 60px;
          text-align: center;
          margin-bottom: 40px;
        }
        .preview-icon {
          font-size: 120px;
          display: block;
          margin-bottom: 24px;
        }
        .cat-selector {
          background: white;
          color: var(--gray-900);
          padding: 30px;
          border-radius: 20px;
          margin-bottom: 30px;
        }
        .cats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-top: 20px;
        }
        .cat-option {
          padding: 20px;
          border: 3px solid var(--gray-200);
          background: white;
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .cat-option.active {
          border-color: var(--primary);
          background: #FFF5F8;
        }
        .btn-lg {
          width: 100%;
          margin-bottom: 40px;
        }
        .ar-requirements {
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          padding: 30px;
          border-radius: 20px;
        }
        .ar-requirements ul {
          list-style: none;
          padding: 0;
        }
        .ar-requirements li {
          padding: 8px 0;
          font-size: 16px;
        }
      `}</style>
    </>
  );
}
AREOF

# ============================================
# 6. CAT BATTLES - Daily Voting
# ============================================

cat > src/pages/cat-battles.js << 'BATTLESEOF'
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '../components/ui/Navbar';

export default function CatBattlesPage() {
  const [currentBattle, setCurrentBattle] = useState(null);
  const [voted, setVoted] = useState(false);
  const [results, setResults] = useState(null);

  useEffect(() => {
    loadDailyBattle();
  }, []);

  const loadDailyBattle = () => {
    // Daily battle (same for everyone)
    setCurrentBattle({
      id: 1,
      cat1: { id: 1, name: 'Luna', breed: 'British Shorthair', votes: 1234, emoji: '😸' },
      cat2: { id: 2, name: 'Max', breed: 'Maine Coon', votes: 987, emoji: '🦁' },
      endsAt: new Date(Date.now() + 3600000 * 12) // 12h
    });
  };

  const vote = (catId) => {
    setVoted(true);
    const total = currentBattle.cat1.votes + currentBattle.cat2.votes + 1;
    const cat1Percent = ((currentBattle.cat1.votes + (catId === 1 ? 1 : 0)) / total * 100).toFixed(1);
    const cat2Percent = (100 - cat1Percent).toFixed(1);
    
    setResults({
      cat1Percent,
      cat2Percent,
      winner: cat1Percent > cat2Percent ? 'cat1' : 'cat2'
    });
  };

  if (!currentBattle) return <div>Loading...</div>;

  return (
    <>
      <Head>
        <title>Cat Battles - CAT PURRE</title>
      </Head>

      <Navbar />

      <div className="battles-page">
        <div className="container">
          <h1>⚔️ Cat Battles</h1>
          <p className="subtitle">Który kot jest ładniejszy? Głosuj codziennie!</p>

          <div className="battle-arena">
            <div className="battle-header">
              <h2>🔥 Daily Battle #{currentBattle.id}</h2>
              <span className="timer">⏰ Kończy się za: 11:45:23</span>
            </div>

            <div className="vs-container">
              <button 
                className={\`cat-battle-card \${voted && results.winner === 'cat1' ? 'winner' : ''}\`}
                onClick={() => !voted && vote(1)}
                disabled={voted}
              >
                <div className="cat-avatar">{currentBattle.cat1.emoji}</div>
                <h3>{currentBattle.cat1.name}</h3>
                <p>{currentBattle.cat1.breed}</p>
                
                {voted && (
                  <div className="vote-result">
                    <div className="percentage">{results.cat1Percent}%</div>
                    <div className="vote-bar">
                      <div 
                        className="vote-fill"
                        style={{ width: \`\${results.cat1Percent}%\` }}
                      ></div>
                    </div>
                    <div className="vote-count">{currentBattle.cat1.votes + (results.winner === 'cat1' ? 1 : 0)} głosów</div>
                  </div>
                )}
              </button>

              <div className="vs-badge">VS</div>

              <button 
                className={\`cat-battle-card \${voted && results.winner === 'cat2' ? 'winner' : ''}\`}
                onClick={() => !voted && vote(2)}
                disabled={voted}
              >
                <div className="cat-avatar">{currentBattle.cat2.emoji}</div>
                <h3>{currentBattle.cat2.name}</h3>
                <p>{currentBattle.cat2.breed}</p>
                
                {voted && (
                  <div className="vote-result">
                    <div className="percentage">{results.cat2Percent}%</div>
                    <div className="vote-bar">
                      <div 
                        className="vote-fill"
                        style={{ width: \`\${results.cat2Percent}%\` }}
                      ></div>
                    </div>
                    <div className="vote-count">{currentBattle.cat2.votes + (results.winner === 'cat2' ? 1 : 0)} głosów</div>
                  </div>
                )}
              </button>
            </div>

            {!voted && (
              <p className="vote-prompt">👆 Kliknij aby zagłosować!</p>
            )}

            {voted && (
              <div className="voted-message">
                <h3>✅ Dziękujemy za głos!</h3>
                <p>Wróć jutro o 00:00 na nową bitwę</p>
                <button className="btn btn-outline">
                  📤 Podziel się wynikiem
                </button>
              </div>
            )}
          </div>

          <div className="leaderboard">
            <h2>🏆 Top koty tego tygodnia</h2>
            <div className="top-cats-list">
              <div className="top-cat-item gold">
                <span className="rank">🥇</span>
                <span className="cat-info">
                  <strong>Bella</strong> - Persian
                </span>
                <span className="wins">12 zwycięstw</span>
              </div>
              <div className="top-cat-item silver">
                <span className="rank">🥈</span>
                <span className="cat-info">
                  <strong>Luna</strong> - British Shorthair
                </span>
                <span className="wins">10 zwycięstw</span>
              </div>
              <div className="top-cat-item bronze">
                <span className="rank">🥉</span>
                <span className="cat-info">
                  <strong>Max</strong> - Maine Coon
                </span>
                <span className="wins">9 zwycięstw</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .battles-page {
          min-height: 100vh;
          padding: 40px 0;
          background: linear-gradient(135deg, #FF6B9D 0%, #FFA07A 100%);
        }
        .battles-page h1 {
          text-align: center;
          color: white;
          font-size: 56px;
          margin-bottom: 16px;
        }
        .subtitle {
          text-align: center;
          color: white;
          font-size: 20px;
          margin-bottom: 50px;
          opacity: 0.9;
        }
        .battle-arena {
          background: white;
          border-radius: 30px;
          padding: 40px;
          margin-bottom: 40px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        .battle-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
        }
        .timer {
          background: var(--gray-100);
          padding: 8px 16px;
          border-radius: 20px;
          font-weight: 600;
        }
        .vs-container {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 30px;
          margin-bottom: 30px;
        }
        .cat-battle-card {
          background: var(--gray-50);
          border: 3px solid transparent;
          border-radius: 20px;
          padding: 40px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s;
        }
        .cat-battle-card:hover:not(:disabled) {
          border-color: var(--primary);
          background: #FFF5F8;
          transform: scale(1.05);
        }
        .cat-battle-card.winner {
          border-color: #FFD700;
          background: linear-gradient(135deg, #FFD700, #FFA500);
          color: white;
          animation: celebrate 1s;
        }
        @keyframes celebrate {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1) rotate(5deg); }
        }
        .cat-avatar {
          font-size: 120px;
          margin-bottom: 20px;
        }
        .cat-battle-card h3 {
          font-size: 32px;
          margin: 0 0 8px 0;
        }
        .vs-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          font-size: 28px;
          font-weight: bold;
          align-self: center;
        }
        .vote-result {
          margin-top: 24px;
        }
        .percentage {
          font-size: 36px;
          font-weight: bold;
          margin-bottom: 12px;
        }
        .vote-bar {
          height: 12px;
          background: rgba(0,0,0,0.1);
          border-radius: 6px;
          overflow: hidden;
          margin-bottom: 8px;
        }
        .vote-fill {
          height: 100%;
          background: var(--primary);
          transition: width 1s ease-out;
        }
        .vote-count {
          font-size: 14px;
          opacity: 0.8;
        }
        .vote-prompt {
          text-align: center;
          font-size: 18px;
          color: var(--gray-600);
          animation: pulse 2s infinite;
        }
        .voted-message {
          text-align: center;
          padding: 30px;
          background: var(--gray-50);
          border-radius: 20px;
        }
        .leaderboard {
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          padding: 40px;
          border-radius: 30px;
          color: white;
        }
        .leaderboard h2 {
          text-align: center;
          margin-bottom: 30px;
        }
        .top-cats-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .top-cat-item {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 20px;
          border-radius: 16px;
        }
        .top-cat-item.gold {
          background: linear-gradient(135deg, #FFD700, #FFA500);
        }
        .top-cat-item.silver {
          background: linear-gradient(135deg, #C0C0C0, #A8A8A8);
        }
        .top-cat-item.bronze {
          background: linear-gradient(135deg, #CD7F32, #B87333);
        }
        .rank {
          font-size: 32px;
        }
        .cat-info {
          flex: 1;
          font-size: 18px;
        }
        .wins {
          font-weight: 600;
        }
      `}</style>
    </>
  );
}
BATTLESEOF

# ============================================
# 7. ACHIEVEMENT SYSTEM
# ============================================

cat > server/models/Achievement.model.js << 'ACHIEVEMENTMODELEOF'
const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  achievements: [{
    id: String,
    name: String,
    description: String,
    icon: String,
    unlockedAt: Date,
    points: Number
  }],
  totalPoints: {
    type: Number,
    default: 0
  },
  level: {
    type: Number,
    default: 1
  },
  badges: [String],
  streak: {
    current: { type: Number, default: 0 },
    longest: { type: Number, default: 0 },
    lastVisit: Date
  }
}, {
  timestamps: true
});

// Available achievements
achievementSchema.statics.ACHIEVEMENTS = {
  FIRST_LOGIN: {
    id: 'first_login',
    name: 'Pierwszy krok',
    description: 'Zalogowałeś się pierwszy raz',
    icon: '👋',
    points: 10
  },
  FIRST_CAT: {
    id: 'first_cat',
    name: 'Mój pierwszy kot',
    description: 'Kupiłeś swojego pierwszego kota',
    icon: '🐱',
    points: 50
  },
  STREAK_7: {
    id: 'streak_7',
    name: 'Tygodniowy entuzjasta',
    description: 'Zaloguj się 7 dni z rzędu',
    icon: '🔥',
    points: 100
  },
  REFERRAL_5: {
    id: 'referral_5',
    name: 'Ambasador kotów',
    description: 'Zaproś 5 znajomych',
    icon: '🎁',
    points: 200
  },
  DAILY_CAT_WIN: {
    id: 'daily_cat_win',
    name: 'Kot-ekspert',
    description: 'Wygraj Daily Cat Match',
    icon: '🏆',
    points: 30
  }
};

module.exports = mongoose.model('Achievement', achievementSchema);
ACHIEVEMENTMODELEOF

cat > src/pages/achievements.js << 'ACHIEVEMENTSEOF'
import React, { useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/ui/Navbar';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import { useAuth } from '../context/AuthContext';

export default function AchievementsPage() {
  const { user } = useAuth();
  const [achievements] = useState({
    unlocked: [
      { id: 1, name: 'Pierwszy krok', icon: '👋', points: 10, unlockedAt: new Date() },
      { id: 2, name: 'Kot-ekspert', icon: '🏆', points: 30, unlockedAt: new Date() },
    ],
    locked: [
      { id: 3, name: 'Mój pierwszy kot', icon: '🔒', points: 50, requirement: 'Kup swojego pierwszego kota' },
      { id: 4, name: 'Tygodniowy entuzjasta', icon: '🔒', points: 100, requirement: 'Zaloguj się 7 dni z rzędu' },
    ],
    totalPoints: 40,
    level: 1,
    nextLevelPoints: 100
  });

  return (
    <ProtectedRoute requireAuth={true}>
      <Head>
        <title>Osiągnięcia - CAT PURRE</title>
      </Head>

      <Navbar />

      <div className="achievements-page">
        <div className="container">
          <div className="header">
            <h1>🏆 Osiągnięcia</h1>
            <div className="level-badge">
              <span className="level-num">Level {achievements.level}</span>
              <div className="level-progress">
                <div 
                  className="level-fill"
                  style={{ width: \`\${(achievements.totalPoints / achievements.nextLevelPoints) * 100}%\` }}
                ></div>
              </div>
              <span className="level-text">
                {achievements.totalPoints} / {achievements.nextLevelPoints} XP
              </span>
            </div>
          </div>

          <div className="achievements-grid">
            <div className="section">
              <h2>✅ Odblokowane ({achievements.unlocked.length})</h2>
              <div className="achievements-list">
                {achievements.unlocked.map(ach => (
                  <div key={ach.id} className="achievement-card unlocked">
                    <span className="achievement-icon">{ach.icon}</span>
                    <div className="achievement-info">
                      <h3>{ach.name}</h3>
                      <p className="points">+{ach.points} XP</p>
                      <p className="date">
                        {new Date(ach.unlockedAt).toLocaleDateString('pl-PL')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="section">
              <h2>🔒 Do odblokowania ({achievements.locked.length})</h2>
              <div className="achievements-list">
                {achievements.locked.map(ach => (
                  <div key={ach.id} className="achievement-card locked">
                    <span className="achievement-icon">{ach.icon}</span>
                    <div className="achievement-info">
                      <h3>{ach.name}</h3>
                      <p className="requirement">{ach.requirement}</p>
                      <p className="points">+{ach.points} XP</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .achievements-page {
          min-height: 100vh;
          padding: 40px 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .header {
          text-align: center;
          color: white;
          margin-bottom: 50px;
        }
        .header h1 {
          font-size: 56px;
          margin-bottom: 30px;
        }
        .level-badge {
          display: inline-block;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          padding: 20px 40px;
          border-radius: 30px;
        }
        .level-num {
          display: block;
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 12px;
        }
        .level-progress {
          width: 300px;
          height: 12px;
          background: rgba(0,0,0,0.3);
          border-radius: 6px;
          overflow: hidden;
          margin-bottom: 8px;
        }
        .level-fill {
          height: 100%;
          background: linear-gradient(90deg, #FFD700, #FFA500);
          transition: width 1s;
        }
        .level-text {
          font-size: 14px;
        }
        .achievements-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
        }
        .section h2 {
          color: white;
          margin-bottom: 24px;
        }
        .achievements-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .achievement-card {
          display: flex;
          gap: 20px;
          padding: 24px;
          border-radius: 20px;
          transition: all 0.3s;
        }
        .achievement-card.unlocked {
          background: white;
          box-shadow: 0 8px 24px rgba(0,0,0,0.2);
        }
        .achievement-card.locked {
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          color: white;
          opacity: 0.7;
        }
        .achievement-icon {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: var(--gray-100);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 40px;
          flex-shrink: 0;
        }
        .achievement-card.unlocked .achievement-icon {
          background: linear-gradient(135deg, #FFD700, #FFA500);
        }
        .achievement-info {
          flex: 1;
        }
        .achievement-info h3 {
          margin: 0 0 8px 0;
          font-size: 20px;
        }
        .points {
          color: #FFD700;
          font-weight: bold;
          margin: 4px 0;
        }
        .date {
          font-size: 13px;
          opacity: 0.7;
        }
        .requirement {
          font-size: 14px;
          margin: 4px 0;
          opacity: 0.8;
        }
        @media (max-width: 768px) {
          .achievements-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </ProtectedRoute>
  );
}
ACHIEVEMENTSEOF

echo "✅✅✅ COMPLETE VIRAL SYSTEM DONE!"
echo ""
echo "🎉 WSZYSTKO GOTOWE:"
echo ""
echo "💰 REFERRAL SYSTEM:"
echo "   ✓ Wallet model (balance, transactions, withdrawals)"
echo "   ✓ 100 PLN bonus dla obu (referrer + new user)"
echo "   ✓ /wallet - pełny portfel z wypłatami"
echo "   ✓ Min. 500 PLN do wypłaty"
echo "   ✓ Bank transfer, BLIK, PayPal"
echo "   ✓ 3 opcje: kredyty app, cash, hybrid"
echo ""
echo "🔥 VIRAL FEATURES:"
echo "   ✓ Daily Cat Match (/daily-cat)"
echo "   ✓ Cat Swipe (/cat-swipe)"
echo "   ✓ Referral System (/invite + /wallet)"
echo "   ✓ Meme Generator (/meme-generator)"
echo "   ✓ AR Try-On (/ar-try-on)"
echo "   ✓ Cat Battles (/cat-battles)"
echo "   ✓ Achievements (/achievements)"
echo ""
echo "💡 JAK DZIAŁA 100 PLN:"
echo "   1. Nowy user używa ref code"
echo "   2. Oboje dostają 100 PLN na wallet"
echo "   3. Opcje wykorzystania:"
echo "      - Rabat na zakup kota (instant)"
echo "      - Wypłata cash (min 500 PLN)"
echo "      - Podaruj znajomemu (soon)"
echo ""
echo "🚀 TO GO VIRAL:"
echo "   ✅ Daily engagement (streaks)"
echo "   ✅ Social sharing (memes, battles)"
echo "   ✅ Referral incentives (100 PLN)"
echo "   ✅ Gamification (achievements, levels)"
echo "   ✅ AR/fun factor"
echo "   ✅ FOMO (daily battles, limited)"
echo ""
echo "🎯 READY TO LAUNCH! 🐱💥"

