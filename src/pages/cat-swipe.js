import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '../components/ui/Navbar';
import { useAuth } from '../context/AuthContext';

export default function CatSwipePage() {
  const { user } = useAuth();
  const [cats, setCats] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matches, setMatches] = useState([]);
  const [swipeDirection, setSwipeDirection] = useState(null);

  useEffect(() => {
    loadCats();
  }, []);

  const loadCats = () => {
    // Mock cats
    setCats([
      { id: 1, name: 'Luna', breed: 'British Shorthair', age: '3 mies', image: '🐱', personality: ['Spokojna', 'Łagodna'] },
      { id: 2, name: 'Max', breed: 'Maine Coon', age: '4 mies', image: '🦁', personality: ['Energiczny', 'Playful'] },
      { id: 3, name: 'Bella', breed: 'Persian', age: '2 mies', image: '😺', personality: ['Elegancka', 'Cicha'] },
    ]);
  };

  const handleSwipe = (direction) => {
    setSwipeDirection(direction);
    
    setTimeout(() => {
      if (direction === 'right') {
        setMatches([...matches, cats[currentIndex]]);
      }
      
      setCurrentIndex(currentIndex + 1);
      setSwipeDirection(null);
    }, 300);
  };

  const currentCat = cats[currentIndex];

  if (!currentCat) {
    return (
      <>
        <Navbar />
        <div className="swipe-page">
          <div className="container">
            <div className="no-more-cats">
              <h2>🎉 To wszystkie koty na dziś!</h2>
              <p>Masz {matches.length} dopasowań</p>
              <button className="btn btn-primary" onClick={() => window.location.href = '/cats'}>
                Zobacz dopasowania
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Cat Swipe - CAT PURRE</title>
      </Head>

      <Navbar />

      <div className="swipe-page">
        <div className="container">
          <div className="header">
            <h1>❤️ Cat Swipe</h1>
            <p>Przesuń w prawo jeśli Ci się podoba!</p>
            <div className="matches-count">
              {matches.length} dopasowań
            </div>
          </div>

          <div className="swipe-container">
            <div className={\`cat-card \${swipeDirection ? \`swipe-\${swipeDirection}\` : ''}\`}>
              <div className="cat-image">
                <span className="cat-emoji">{currentCat.image}</span>
                
                {swipeDirection === 'left' && (
                  <div className="swipe-indicator nope">❌ NOPE</div>
                )}
                {swipeDirection === 'right' && (
                  <div className="swipe-indicator like">💚 LIKE</div>
                )}
              </div>

              <div className="cat-info">
                <h2>{currentCat.name}, {currentCat.age}</h2>
                <p className="breed">{currentCat.breed}</p>
                
                <div className="personality-tags">
                  {currentCat.personality.map((trait, idx) => (
                    <span key={idx} className="tag">{trait}</span>
                  ))}
                </div>

                <div className="cat-details">
                  <div className="detail">📍 Warszawa</div>
                  <div className="detail">💰 4500 PLN</div>
                </div>
              </div>
            </div>

            <div className="swipe-buttons">
              <button 
                className="swipe-btn nope"
                onClick={() => handleSwipe('left')}
              >
                ❌
              </button>
              <button 
                className="swipe-btn superlike"
                onClick={() => handleSwipe('up')}
              >
                ⭐
              </button>
              <button 
                className="swipe-btn like"
                onClick={() => handleSwipe('right')}
              >
                💚
              </button>
            </div>

            <div className="progress">
              {currentIndex + 1} / {cats.length}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .swipe-page {
          min-height: 100vh;
          padding: 40px 0;
          background: linear-gradient(135deg, #FF6B9D 0%, #FFA07A 100%);
        }
        .container {
          max-width: 500px;
          margin: 0 auto;
          padding: 0 20px;
        }
        .header {
          text-align: center;
          color: white;
          margin-bottom: 40px;
        }
        .header h1 {
          font-size: 48px;
          margin-bottom: 16px;
        }
        .matches-count {
          display: inline-block;
          background: rgba(255,255,255,0.2);
          padding: 8px 20px;
          border-radius: 20px;
          margin-top: 16px;
          font-weight: 600;
        }
        .swipe-container {
          position: relative;
        }
        .cat-card {
          background: white;
          border-radius: 30px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          transition: transform 0.3s, opacity 0.3s;
        }
        .cat-card.swipe-left {
          transform: translateX(-200%) rotate(-30deg);
          opacity: 0;
        }
        .cat-card.swipe-right {
          transform: translateX(200%) rotate(30deg);
          opacity: 0;
        }
        .cat-card.swipe-up {
          transform: translateY(-200%) scale(1.2);
          opacity: 0;
        }
        .cat-image {
          height: 400px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .cat-emoji {
          font-size: 200px;
        }
        .swipe-indicator {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 48px;
          font-weight: bold;
          padding: 20px 40px;
          border-radius: 20px;
          border: 5px solid;
        }
        .swipe-indicator.nope {
          color: #FF3B30;
          border-color: #FF3B30;
          background: rgba(255,255,255,0.9);
        }
        .swipe-indicator.like {
          color: #34C759;
          border-color: #34C759;
          background: rgba(255,255,255,0.9);
        }
        .cat-info {
          padding: 30px;
        }
        .cat-info h2 {
          font-size: 32px;
          margin-bottom: 8px;
        }
        .breed {
          color: var(--gray-600);
          font-size: 18px;
          margin-bottom: 20px;
        }
        .personality-tags {
          display: flex;
          gap: 8px;
          margin-bottom: 20px;
        }
        .tag {
          padding: 6px 16px;
          background: var(--gray-100);
          border-radius: 20px;
          font-size: 14px;
        }
        .cat-details {
          display: flex;
          gap: 20px;
          color: var(--gray-600);
        }
        .swipe-buttons {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-top: 30px;
        }
        .swipe-btn {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          border: none;
          font-size: 32px;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 8px 16px rgba(0,0,0,0.2);
        }
        .swipe-btn:hover {
          transform: scale(1.1);
        }
        .swipe-btn:active {
          transform: scale(0.95);
        }
        .swipe-btn.nope {
          background: #FF3B30;
        }
        .swipe-btn.superlike {
          background: #007AFF;
        }
        .swipe-btn.like {
          background: #34C759;
        }
        .progress {
          text-align: center;
          margin-top: 20px;
          color: white;
          font-weight: 600;
        }
        .no-more-cats {
          background: white;
          padding: 60px 40px;
          border-radius: 30px;
          text-align: center;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
      `}</style>
    </>
  );
}
