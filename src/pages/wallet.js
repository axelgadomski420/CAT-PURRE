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
