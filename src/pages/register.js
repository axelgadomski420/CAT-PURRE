import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import Head from 'next/head';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    userType: 'client',
    // Dla hodowców
    catteryName: '',
    breeds: [],
    agreedToTerms: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Hasła nie są identyczne');
      return;
    }

    if (formData.password.length < 6) {
      setError('Hasło musi mieć minimum 6 znaków');
      return;
    }

    if (!formData.agreedToTerms) {
      setError('Musisz zaakceptować regulamin');
      return;
    }

    setLoading(true);

    const result = await register(formData);
    
    if (result.success) {
      router.push('/welcome');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  const nextStep = () => {
    if (step === 1) {
      if (!formData.email || !formData.password || !formData.confirmPassword) {
        setError('Wypełnij wszystkie pola');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Hasła nie są identyczne');
        return;
      }
    }
    setError('');
    setStep(step + 1);
  };

  return (
    <>
      <Head>
        <title>Rejestracja - CAT PURRE</title>
      </Head>

      <div className="register-page">
        <div className="register-container">
          <div className="register-header">
            <Link href="/">
              <a className="logo">🐱 CAT PURRE</a>
            </Link>
            <p>Już masz konto? <Link href="/login"><a>Zaloguj się</a></Link></p>
          </div>

          {/* Progress Bar */}
          <div className="progress-bar">
            <div className={`step ${step >= 1 ? 'active' : ''}`}>
              <div className="step-number">1</div>
              <span>Konto</span>
            </div>
            <div className="line"></div>
            <div className={`step ${step >= 2 ? 'active' : ''}`}>
              <div className="step-number">2</div>
              <span>Dane</span>
            </div>
            <div className="line"></div>
            <div className={`step ${step >= 3 ? 'active' : ''}`}>
              <div className="step-number">3</div>
              <span>Typ</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="register-form">
            {error && (
              <div className="error-message">
                ⚠️ {error}
              </div>
            )}

            {/* Step 1: Account */}
            {step === 1 && (
              <div className="form-step">
                <h2>Utwórz konto</h2>
                <p className="step-description">Zacznij od podstawowych danych logowania</p>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="twoj@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Hasło</label>
                  <input
                    type="password"
                    placeholder="Minimum 6 znaków"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Powtórz hasło</label>
                  <input
                    type="password"
                    placeholder="Powtórz hasło"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    required
                  />
                </div>

                <button type="button" onClick={nextStep} className="btn-next">
                  Dalej →
                </button>
              </div>
            )}

            {/* Step 2: Personal Info */}
            {step === 2 && (
              <div className="form-step">
                <h2>Twoje dane</h2>
                <p className="step-description">Podaj swoje podstawowe informacje</p>

                <div className="form-row">
                  <div className="form-group">
                    <label>Imię</label>
                    <input
                      type="text"
                      placeholder="Jan"
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Nazwisko</label>
                    <input
                      type="text"
                      placeholder="Kowalski"
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Telefon (opcjonalnie)</label>
                  <input
                    type="tel"
                    placeholder="+48 123 456 789"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>

                <div className="button-row">
                  <button type="button" onClick={() => setStep(1)} className="btn-back">
                    ← Wstecz
                  </button>
                  <button type="button" onClick={nextStep} className="btn-next">
                    Dalej →
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: User Type */}
            {step === 3 && (
              <div className="form-step">
                <h2>Wybierz typ konta</h2>
                <p className="step-description">Czy chcesz kupować czy sprzedawać koty?</p>

                <div className="user-type-selection">
                  <div 
                    className={`type-card ${formData.userType === 'client' ? 'selected' : ''}`}
                    onClick={() => setFormData({...formData, userType: 'client'})}
                  >
                    <span className="icon">👤</span>
                    <h3>Klient</h3>
                    <p>Szukam kota do adopcji</p>
                    <ul>
                      <li>✓ Przeglądaj ogłoszenia</li>
                      <li>✓ Kontakt z hodowcami</li>
                      <li>✓ AI asystent</li>
                      <li>✓ Ulubione</li>
                    </ul>
                  </div>

                  <div 
                    className={`type-card ${formData.userType === 'breeder' ? 'selected' : ''}`}
                    onClick={() => setFormData({...formData, userType: 'breeder'})}
                  >
                    <span className="icon">🏠</span>
                    <h3>Hodowca</h3>
                    <p>Prowadzę hodowlę</p>
                    <ul>
                      <li>✓ Dodawaj ogłoszenia</li>
                      <li>✓ Zarządzaj hodowlą</li>
                      <li>✓ Statystyki</li>
                      <li>✓ Premium features</li>
                    </ul>
                  </div>
                </div>

                {formData.userType === 'breeder' && (
                  <div className="breeder-info">
                    <div className="form-group">
                      <label>Nazwa hodowli</label>
                      <input
                        type="text"
                        placeholder="np. Golden British"
                        value={formData.catteryName}
                        onChange={(e) => setFormData({...formData, catteryName: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                )}

                <label className="terms-checkbox">
                  <input
                    type="checkbox"
                    checked={formData.agreedToTerms}
                    onChange={(e) => setFormData({...formData, agreedToTerms: e.target.checked})}
                    required
                  />
                  <span>
                    Akceptuję <Link href="/terms"><a>regulamin</a></Link> i <Link href="/privacy"><a>politykę prywatności</a></Link>
                  </span>
                </label>

                <div className="button-row">
                  <button type="button" onClick={() => setStep(2)} className="btn-back">
                    ← Wstecz
                  </button>
                  <button type="submit" className="btn-submit" disabled={loading}>
                    {loading ? 'Tworzenie konta...' : 'Utwórz konto 🎉'}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>

      <style jsx>{`
        .register-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 40px 20px;
        }
        .register-container {
          max-width: 700px;
          margin: 0 auto;
          background: white;
          border-radius: 30px;
          padding: 50px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        .register-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
        }
        .logo {
          font-size: 32px;
          font-weight: bold;
          text-decoration: none;
          color: #1a1a1a;
        }
        .register-header p {
          color: #666;
        }
        .register-header a {
          color: #FF6B9D;
          font-weight: 600;
          text-decoration: none;
        }
        .progress-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 50px;
        }
        .step {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          flex: 1;
        }
        .step-number {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #e0e0e0;
          color: #999;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          transition: all 0.3s;
        }
        .step.active .step-number {
          background: #FF6B9D;
          color: white;
        }
        .step span {
          font-size: 13px;
          color: #999;
        }
        .step.active span {
          color: #1a1a1a;
          font-weight: 600;
        }
        .line {
          flex: 1;
          height: 2px;
          background: #e0e0e0;
          margin: 0 -10px;
        }
        .error-message {
          background: #FFF1F0;
          color: #FF3B30;
          padding: 12px 16px;
          border-radius: 12px;
          margin-bottom: 20px;
          border-left: 4px solid #FF3B30;
        }
        .form-step h2 {
          font-size: 28px;
          margin: 0 0 8px 0;
        }
        .step-description {
          color: #666;
          margin-bottom: 30px;
        }
        .form-group {
          margin-bottom: 20px;
        }
        .form-group label {
          display: block;
          font-weight: 600;
          margin-bottom: 8px;
        }
        .form-group input {
          width: 100%;
          padding: 14px 16px;
          border: 2px solid #e0e0e0;
          border-radius: 12px;
          font-size: 16px;
        }
        .form-group input:focus {
          border-color: #FF6B9D;
          outline: none;
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .user-type-selection {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 30px;
        }
        .type-card {
          border: 3px solid #e0e0e0;
          border-radius: 20px;
          padding: 30px 20px;
          cursor: pointer;
          transition: all 0.3s;
          text-align: center;
        }
        .type-card:hover {
          border-color: #FF6B9D;
          background: #FFF5F8;
        }
        .type-card.selected {
          border-color: #FF6B9D;
          background: #FFF5F8;
          box-shadow: 0 8px 16px rgba(255,107,157,0.2);
        }
        .type-card .icon {
          font-size: 48px;
          display: block;
          margin-bottom: 16px;
        }
        .type-card h3 {
          margin: 0 0 8px 0;
          font-size: 20px;
        }
        .type-card p {
          color: #666;
          font-size: 14px;
          margin-bottom: 20px;
        }
        .type-card ul {
          list-style: none;
          padding: 0;
          text-align: left;
        }
        .type-card li {
          padding: 6px 0;
          font-size: 14px;
          color: #666;
        }
        .breeder-info {
          margin-bottom: 30px;
        }
        .terms-checkbox {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 30px;
          cursor: pointer;
        }
        .terms-checkbox input {
          margin-top: 4px;
        }
        .terms-checkbox a {
          color: #FF6B9D;
          text-decoration: none;
        }
        .button-row {
          display: flex;
          gap: 12px;
        }
        .btn-back,
        .btn-next,
        .btn-submit {
          flex: 1;
          padding: 16px;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-back {
          background: #f0f0f0;
          color: #666;
        }
        .btn-back:hover {
          background: #e0e0e0;
        }
        .btn-next,
        .btn-submit {
          background: #FF6B9D;
          color: white;
        }
        .btn-next:hover,
        .btn-submit:hover {
          background: #E5567F;
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(255,107,157,0.3);
        }
        .btn-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }
        @media (max-width: 768px) {
          .user-type-selection {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
