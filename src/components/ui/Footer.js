import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-section">
            <h3>🐱 CAT PURRE</h3>
            <p>Najlepsza platforma do znajdowania kotów rasowych w Polsce</p>
            <div className="social-links">
              <a href="#">Facebook</a>
              <a href="#">Instagram</a>
              <a href="#">TikTok</a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Dla kupujących</h4>
            <Link href="/cats">Przeglądaj koty</Link>
            <Link href="/breeds">Rasy kotów</Link>
            <Link href="/breeders">Hodowcy</Link>
            <Link href="/ai-assistant">AI Asystent</Link>
          </div>

          <div className="footer-section">
            <h4>Dla hodowców</h4>
            <Link href="/breeder/register">Załóż konto</Link>
            <Link href="/breeder/pricing">Cennik</Link>
            <Link href="/breeder/faq">FAQ</Link>
          </div>

          <div className="footer-section">
            <h4>Informacje</h4>
            <Link href="/about">O nas</Link>
            <Link href="/contact">Kontakt</Link>
            <Link href="/privacy">Polityka prywatności</Link>
            <Link href="/terms">Regulamin</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2025 CAT PURRE. All rights reserved.</p>
          <p>Made with ❤️ for cats</p>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background: #1a1a1a;
          color: white;
          padding: 60px 0 30px;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 40px;
          margin-bottom: 40px;
        }
        .footer-section h3, .footer-section h4 {
          margin-bottom: 20px;
        }
        .footer-section p {
          color: rgba(255,255,255,0.7);
          line-height: 1.6;
        }
        .footer-section a {
          display: block;
          color: rgba(255,255,255,0.7);
          margin-bottom: 12px;
          transition: color 0.2s;
        }
        .footer-section a:hover {
          color: #FF6B9D;
        }
        .social-links {
          display: flex;
          gap: 16px;
          margin-top: 20px;
        }
        .footer-bottom {
          text-align: center;
          padding-top: 30px;
          border-top: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.5);
        }
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </footer>
  );
}
