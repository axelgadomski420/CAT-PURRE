import React, { useRef } from 'react';
import { BREEDS_DATABASE } from '../../database/breeds.data';

export default function BreedSlider() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollRef.current;
    const scrollAmount = direction === 'left' ? -300 : 300;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <div className="breed-slider">
      <button onClick={() => scroll('left')} className="scroll-btn left">←</button>
      
      <div ref={scrollRef} className="breeds-container">
        {BREEDS_DATABASE.slice(0, 10).map(breed => (
          <div key={breed.id} className="breed-card">
            <div className="breed-image">
              <img src={breed.imageUrl || '/placeholder-cat.jpg'} alt={breed.namePl} />
            </div>
            <h3>{breed.namePl}</h3>
            <p className="origin">{breed.origin}</p>
            <div className="breed-stats">
              <span>⭐ {breed.popularity}/10</span>
              <span>💰 {breed.priceRange.min}-{breed.priceRange.max} PLN</span>
            </div>
          </div>
        ))}
      </div>
      
      <button onClick={() => scroll('right')} className="scroll-btn right">→</button>

      <style jsx>{`
        .breed-slider {
          position: relative;
          padding: 40px 0;
        }
        .breeds-container {
          display: flex;
          gap: 20px;
          overflow-x: auto;
          scroll-behavior: smooth;
          padding: 20px 0;
          scrollbar-width: none;
        }
        .breeds-container::-webkit-scrollbar {
          display: none;
        }
        .breed-card {
          min-width: 280px;
          background: white;
          border-radius: 16px;
          padding: 20px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          transition: transform 0.3s;
          cursor: pointer;
        }
        .breed-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.15);
        }
        .breed-image {
          width: 100%;
          height: 200px;
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 16px;
        }
        .breed-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .breed-card h3 {
          font-size: 20px;
          margin: 0 0 8px 0;
        }
        .origin {
          color: #666;
          font-size: 14px;
          margin: 0 0 12px 0;
        }
        .breed-stats {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          color: #666;
        }
        .scroll-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: none;
          background: white;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          font-size: 24px;
          cursor: pointer;
          z-index: 10;
        }
        .scroll-btn.left { left: -25px; }
        .scroll-btn.right { right: -25px; }
        .scroll-btn:hover {
          background: #f5f5f5;
        }
      `}</style>
    </div>
  );
}
