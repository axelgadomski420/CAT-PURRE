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
