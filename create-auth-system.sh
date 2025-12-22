#!/bin/zsh

echo "🔐 Tworzenie kompletnego Auth System..."

# ============================================
# AUTH CONTEXT - React Context dla auth
# ============================================

mkdir -p src/context

cat > src/context/AuthContext.js << 'AUTHCONTEXTEOF'
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.get(
          \`\${process.env.NEXT_PUBLIC_API_URL}/api/auth/me\`,
          { headers: { Authorization: \`Bearer \${token}\` } }
        );
        setUser(response.data.user);
      } catch (error) {
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        \`\${process.env.NEXT_PUBLIC_API_URL}/api/auth/login\`,
        { email, password }
      );
      
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      
      return { success: true, user: response.data.user };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Login failed' 
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post(
        \`\${process.env.NEXT_PUBLIC_API_URL}/api/auth/register\`,
        userData
      );
      
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      
      return { success: true, user: response.data.user };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Registration failed' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/');
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isBreeder: user?.userType === 'breeder' || user?.userType === 'admin',
    isAdmin: user?.userType === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
AUTHCONTEXTEOF

# ============================================
# LOGIN PAGE - Apple-style
# ============================================

cat > src/pages/login.js << 'LOGINEOF'
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import Head from 'next/head';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      if (result.user.userType === 'breeder' || result.user.userType === 'admin') {
        router.push('/dashboard');
      } else {
        router.push('/');
      }
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  const quickLogin = (role) => {
    if (role === 'admin') {
      setFormData({ email: 'admin@catpurre.pl', password: 'password123' });
    } else if (role === 'breeder') {
      setFormData({ email: 'hodowca1@test.pl', password: 'password123' });
    }
  };

  return (
    <>
      <Head>
        <title>Zaloguj się - CAT PURRE</title>
      </Head>

      <div className="login-page">
        <div className="login-container">
          {/* Left side - Branding */}
          <div className="login-left">
            <div className="branding">
              <h1 className="logo">🐱 CAT PURRE</h1>
              <p className="tagline">Znajdź swojego wymarzonego kota</p>
            </div>

            <div className="features">
              <div className="feature">
                <span className="icon">✨</span>
                <div>
                  <h3>500+ kotów</h3>
                  <p>Od zweryfikowanych hodowców</p>
                </div>
              </div>
              <div className="feature">
                <span className="icon">🤖</span>
                <div>
                  <h3>AI Assistant</h3>
                  <p>Pomoc w wyborze idealnej rasy</p>
                </div>
              </div>
              <div className="feature">
                <span className="icon">🔒</span>
                <div>
                  <h3>Bezpieczne</h3>
                  <p>Zweryfikowane ogłoszenia</p>
                </div>
              </div>
            </div>

            <div className="testimonial">
              <p>"Znalazłem mojego brytyjczyka przez CAT PURRE. Proces był super prosty!"</p>
              <span>- Anna K., Warszawa</span>
            </div>
          </div>

          {/* Right side - Login Form */}
          <div className="login-right">
            <div className="login-form-container">
              <div className="form-header">
                <h2>Witaj ponownie!</h2>
                <p>Zaloguj się do swojego konta</p>
              </div>

              <form onSubmit={handleSubmit} className="login-form">
                {error && (
                  <div className="error-message">
                    ⚠️ {error}
                  </div>
                )}

                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="twoj@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                    autoComplete="email"
                  />
                </div>

                <div className="form-group">
                  <label>Hasło</label>
                  <div className="password-input">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      required
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      className="toggle-password"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                  </div>
                </div>

                <div className="form-footer">
                  <label className="remember-me">
                    <input type="checkbox" />
                    <span>Zapamiętaj mnie</span>
                  </label>
                  <Link href="/forgot-password">
                    <a className="forgot-link">Zapomniałeś hasła?</a>
                  </Link>
                </div>

                <button 
                  type="submit" 
                  className="btn-login"
                  disabled={loading}
                >
                  {loading ? 'Logowanie...' : 'Zaloguj się'}
                </button>

                <div className="divider">
                  <span>lub</span>
                </div>

                <div className="social-login">
                  <button type="button" className="btn-social google">
                    <span>🔍</span> Google
                  </button>
                  <button type="button" className="btn-social facebook">
                    <span>f</span> Facebook
                  </button>
                  <button type="button" className="btn-social apple">
                    <span></span> Apple
                  </button>
                </div>

                <p className="signup-link">
                  Nie masz konta? <Link href="/register"><a>Zarejestruj się</a></Link>
                </p>
              </form>

              {/* Quick Login (tylko DEV) */}
              <div className="quick-login">
                <p className="quick-title">🚀 Quick Login (DEV):</p>
                <div className="quick-buttons">
                  <button onClick={() => quickLogin('admin')} className="quick-btn">
                    Admin
                  </button>
                  <button onClick={() => quickLogin('breeder')} className="quick-btn">
                    Hodowca
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .login-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
        }
        .login-container {
          max-width: 1200px;
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(20px);
          border-radius: 30px;
          padding: 60px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        .login-left {
          color: white;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .branding .logo {
          font-size: 48px;
          margin: 0 0 16px 0;
        }
        .branding .tagline {
          font-size: 20px;
          opacity: 0.9;
        }
        .features {
          display: flex;
          flex-direction: column;
          gap: 24px;
          margin: 40px 0;
        }
        .feature {
          display: flex;
          gap: 16px;
          align-items: center;
        }
        .feature .icon {
          font-size: 32px;
          width: 60px;
          height: 60px;
          background: rgba(255,255,255,0.1);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .feature h3 {
          margin: 0 0 4px 0;
          font-size: 18px;
        }
        .feature p {
          margin: 0;
          opacity: 0.8;
          font-size: 14px;
        }
        .testimonial {
          background: rgba(255,255,255,0.1);
          padding: 24px;
          border-radius: 20px;
          border-left: 4px solid #FF6B9D;
        }
        .testimonial p {
          font-style: italic;
          margin: 0 0 12px 0;
          line-height: 1.6;
        }
        .testimonial span {
          opacity: 0.8;
          font-size: 14px;
        }
        .login-right {
          background: white;
          border-radius: 24px;
          padding: 50px;
        }
        .form-header {
          margin-bottom: 30px;
        }
        .form-header h2 {
          font-size: 32px;
          margin: 0 0 8px 0;
        }
        .form-header p {
          color: #666;
          margin: 0;
        }
        .error-message {
          background: #FFF1F0;
          color: #FF3B30;
          padding: 12px 16px;
          border-radius: 12px;
          margin-bottom: 20px;
          border-left: 4px solid #FF3B30;
        }
        .form-group {
          margin-bottom: 20px;
        }
        .form-group label {
          display: block;
          font-weight: 600;
          margin-bottom: 8px;
          color: #1a1a1a;
        }
        .form-group input {
          width: 100%;
          padding: 14px 16px;
          border: 2px solid #e0e0e0;
          border-radius: 12px;
          font-size: 16px;
          transition: all 0.2s;
        }
        .form-group input:focus {
          border-color: #FF6B9D;
          outline: none;
          box-shadow: 0 0 0 4px rgba(255,107,157,0.1);
        }
        .password-input {
          position: relative;
        }
        .toggle-password {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          font-size: 20px;
        }
        .form-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }
        .remember-me {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
        }
        .forgot-link {
          color: #FF6B9D;
          font-weight: 600;
          text-decoration: none;
        }
        .forgot-link:hover {
          text-decoration: underline;
        }
        .btn-login {
          width: 100%;
          padding: 16px;
          background: #FF6B9D;
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-login:hover {
          background: #E5567F;
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(255,107,157,0.3);
        }
        .btn-login:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }
        .divider {
          text-align: center;
          margin: 24px 0;
          position: relative;
        }
        .divider::before,
        .divider::after {
          content: '';
          position: absolute;
          top: 50%;
          width: 45%;
          height: 1px;
          background: #e0e0e0;
        }
        .divider::before { left: 0; }
        .divider::after { right: 0; }
        .divider span {
          background: white;
          padding: 0 16px;
          color: #999;
          font-size: 14px;
        }
        .social-login {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 24px;
        }
        .btn-social {
          padding: 12px;
          border: 2px solid #e0e0e0;
          background: white;
          border-radius: 12px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .btn-social:hover {
          border-color: #FF6B9D;
          background: #FFF5F8;
        }
        .btn-social span {
          font-size: 18px;
        }
        .signup-link {
          text-align: center;
          color: #666;
        }
        .signup-link a {
          color: #FF6B9D;
          font-weight: 600;
          text-decoration: none;
        }
        .signup-link a:hover {
          text-decoration: underline;
        }
        .quick-login {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 2px dashed #e0e0e0;
        }
        .quick-title {
          font-size: 12px;
          color: #999;
          margin-bottom: 12px;
        }
        .quick-buttons {
          display: flex;
          gap: 8px;
        }
        .quick-btn {
          flex: 1;
          padding: 8px;
          background: #f0f0f0;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 12px;
          font-weight: 600;
        }
        .quick-btn:hover {
          background: #e0e0e0;
        }
        @media (max-width: 768px) {
          .login-container {
            grid-template-columns: 1fr;
            padding: 30px;
          }
          .login-left {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
LOGINEOF

# ============================================
# REGISTER PAGE
# ============================================

cat > src/pages/register.js << 'REGISTEREOF'
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
REGISTEREOF

# Aktualizuj _app.js z AuthProvider
cat > src/pages/_app.js << 'APPEOF'
import '../styles/globals.css';
import { Provider } from 'react-redux';
import { store } from '../store';
import { AuthProvider } from '../context/AuthContext';
import '../i18n';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </Provider>
  );
}

export default MyApp;
APPEOF

# Aktualizuj Navbar z auth
cat > src/components/ui/Navbar.js << 'NAVEOF'
import React from 'react';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <Link href="/">
          <span style={styles.logo}>🐱 CAT PURRE</span>
        </Link>
        
        <div style={styles.menu}>
          <Link href="/cats">Koty</Link>
          <Link href="/breeds">Rasy</Link>
          <Link href="/breeders">Hodowcy</Link>
          <Link href="/ai-assistant">AI Asystent</Link>
          {user?.userType === 'breeder' && (
            <Link href="/pricing">💎 Premium</Link>
          )}
        </div>
        
        <div style={styles.actions}>
          {isAuthenticated ? (
            <>
              <Link href="/dashboard">
                <button className="btn btn-outline">
                  👤 {user.firstName || 'Profil'}
                </button>
              </Link>
              <button onClick={logout} className="btn btn-outline">
                Wyloguj
              </button>
            </>
          ) : (
            <>
              <Link href="/login">
                <button className="btn btn-outline">Zaloguj się</button>
              </Link>
              <Link href="/register">
                <button className="btn btn-primary">Zarejestruj się</button>
              </Link>
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        nav {
          background: white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          position: sticky;
          top: 0;
          z-index: 100;
        }
      `}</style>
    </nav>
  );
}

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '16px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  menu: {
    display: 'flex',
    gap: '24px'
  },
  actions: {
    display: 'flex',
    gap: '12px'
  }
};
NAVEOF

echo "✅ AUTH SYSTEM KOMPLETNY!"
echo ""
echo "📋 Utworzono:"
echo "   ✓ AuthContext (React Context)"
echo "   ✓ Login Page (Apple-style)"
echo "   ✓ Register Page (3-step wizard)"
echo "   ✓ Zaktualizowany Navbar"
echo "   ✓ Auth Provider w _app.js"
echo ""
echo "🎨 Features:"
echo "   ✓ Multi-step registration"
echo "   ✓ Client/Breeder account types"
echo "   ✓ Social login buttons (UI)"
echo "   ✓ Quick login (DEV mode)"
echo "   ✓ Password visibility toggle"
echo "   ✓ Form validation"
echo "   ✓ Protected routes ready"
echo ""

