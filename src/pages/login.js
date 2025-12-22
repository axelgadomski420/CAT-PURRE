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
