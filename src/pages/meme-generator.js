import React, { useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/ui/Navbar';

export default function MemeGeneratorPage() {
  const [selectedCat, setSelectedCat] = useState(null);
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [memeUrl, setMemeUrl] = useState(null);

  const catTemplates = [
    { id: 1, name: 'Grumpy Cat', emoji: '😾' },
    { id: 2, name: 'Happy Cat', emoji: '😸' },
    { id: 3, name: 'Shocked Cat', emoji: '🙀' },
    { id: 4, name: 'Cool Cat', emoji: '😎' },
  ];

  const generateMeme = async () => {
    // W prawdziwej implementacji: AI generuje mem
    alert(\`Mem wygenerowany!\\nGóra: \${topText}\\nDół: \${bottomText}\`);
  };

  const shareToSocial = () => {
    const text = 'Sprawdź mojego kociego mema! 🐱';
    if (navigator.share) {
      navigator.share({ title: 'Cat Meme', text });
    }
  };

  return (
    <>
      <Head>
        <title>Meme Generator - CAT PURRE</title>
      </Head>

      <Navbar />

      <div className="meme-page">
        <div className="container">
          <h1>😹 Cat Meme Generator</h1>
          <p className="subtitle">Twórz viralowe kocięce memy!</p>

          <div className="meme-builder">
            <div className="templates">
              <h3>Wybierz szablon:</h3>
              <div className="templates-grid">
                {catTemplates.map(template => (
                  <button
                    key={template.id}
                    className={\`template-btn \${selectedCat?.id === template.id ? 'active' : ''}\`}
                    onClick={() => setSelectedCat(template)}
                  >
                    <span className="template-emoji">{template.emoji}</span>
                    <span>{template.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="meme-preview">
              <div className="meme-canvas">
                {selectedCat ? (
                  <>
                    <div className="meme-text top">{topText}</div>
                    <div className="meme-cat">{selectedCat.emoji}</div>
                    <div className="meme-text bottom">{bottomText}</div>
                  </>
                ) : (
                  <div className="placeholder">Wybierz szablon</div>
                )}
              </div>
            </div>

            <div className="meme-controls">
              <div className="form-group">
                <label>Górny tekst:</label>
                <input
                  type="text"
                  value={topText}
                  onChange={(e) => setTopText(e.target.value)}
                  placeholder="KIEDY WIDZISZ KOTA..."
                  maxLength={50}
                />
              </div>

              <div className="form-group">
                <label>Dolny tekst:</label>
                <input
                  type="text"
                  value={bottomText}
                  onChange={(e) => setBottomText(e.target.value)}
                  placeholder="MUSISZ GO POGŁASKAĆ"
                  maxLength={50}
                />
              </div>

              <div className="action-buttons">
                <button className="btn btn-primary btn-lg" onClick={generateMeme}>
                  🎨 Wygeneruj mem
                </button>
                <button className="btn btn-outline btn-lg" onClick={shareToSocial}>
                  📤 Udostępnij
                </button>
              </div>
            </div>
          </div>

          <div className="viral-memes">
            <h2>🔥 Viralowe memy CAT PURRE</h2>
            <div className="memes-grid">
              <div className="viral-meme-card">
                <div className="meme-preview-small">😹</div>
                <p>234k udostępnień</p>
              </div>
              <div className="viral-meme-card">
                <div className="meme-preview-small">😸</div>
                <p>189k udostępnień</p>
              </div>
              <div className="viral-meme-card">
                <div className="meme-preview-small">🙀</div>
                <p>156k udostępnień</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .meme-page {
          min-height: 100vh;
          padding: 40px 0;
          background: linear-gradient(135deg, #FF6B9D 0%, #FFA07A 100%);
        }
        .meme-page h1 {
          text-align: center;
          color: white;
          font-size: 48px;
          margin-bottom: 16px;
        }
        .subtitle {
          text-align: center;
          color: white;
          font-size: 20px;
          margin-bottom: 50px;
        }
        .meme-builder {
          background: white;
          border-radius: 30px;
          padding: 40px;
          margin-bottom: 50px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        .templates h3 {
          margin-bottom: 20px;
        }
        .templates-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 30px;
        }
        .template-btn {
          padding: 20px;
          border: 3px solid var(--gray-200);
          background: white;
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        .template-btn:hover {
          border-color: var(--primary);
          background: #FFF5F8;
        }
        .template-btn.active {
          border-color: var(--primary);
          background: #FFF5F8;
          box-shadow: 0 4px 12px rgba(255,107,157,0.3);
        }
        .template-emoji {
          font-size: 48px;
        }
        .meme-preview {
          margin-bottom: 30px;
        }
        .meme-canvas {
          background: #000;
          height: 500px;
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          padding: 40px;
          position: relative;
        }
        .meme-text {
          color: white;
          font-size: 36px;
          font-weight: 900;
          text-transform: uppercase;
          text-align: center;
          text-shadow: 3px 3px 0 #000,
                       -1px -1px 0 #000,
                       1px -1px 0 #000,
                       -1px 1px 0 #000,
                       1px 1px 0 #000;
        }
        .meme-cat {
          font-size: 200px;
        }
        .placeholder {
          color: white;
          font-size: 32px;
          opacity: 0.5;
        }
        .meme-controls {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .action-buttons {
          display: flex;
          gap: 16px;
        }
        .viral-memes {
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          padding: 40px;
          border-radius: 30px;
          color: white;
        }
        .viral-memes h2 {
          text-align: center;
          margin-bottom: 30px;
        }
        .memes-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .viral-meme-card {
          background: rgba(255,255,255,0.2);
          padding: 30px;
          border-radius: 20px;
          text-align: center;
        }
        .meme-preview-small {
          font-size: 80px;
          margin-bottom: 16px;
        }
        @media (max-width: 768px) {
          .templates-grid,
          .memes-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </>
  );
}
