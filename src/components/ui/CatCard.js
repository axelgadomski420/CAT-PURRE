import React from 'react';
import Link from 'next/link';

export default function CatCard({ cat }) {
  return (
    <Link href={\`/cats/\${cat.id}\`}>
      <div className="cat-card">
        <div className="cat-image">
          <img src={cat.images?.[0] || '/placeholder-cat.jpg'} alt={cat.name} />
          {cat.status === 'reserved' && (
            <div className="status-badge reserved">Zarezerwowany</div>
          )}
          {cat.status === 'sold' && (
            <div className="status-badge sold">Sprzedany</div>
          )}
          <button className="favorite-btn">❤️</button>
        </div>

        <div className="cat-info">
          <div className="cat-header">
            <h3>{cat.name}</h3>
            <span className="price">{cat.price?.toLocaleString()} PLN</span>
          </div>
          
          <p className="breed">{cat.breed}</p>
          
          <div className="cat-details">
            <span>📍 {cat.location}</span>
            <span>{cat.gender === 'male' ? '♂️' : '♀️'} {cat.age}</span>
          </div>

          {cat.breeder && (
            <div className="breeder-info">
              <span className="breeder-name">{cat.breeder.name}</span>
              {cat.breeder.verified && <span className="verified">✓</span>}
            </div>
          )}

          <div className="cat-stats">
            <span>👁️ {cat.views || 0}</span>
            <span>❤️ {cat.likes || 0}</span>
          </div>
        </div>

        <style jsx>{`
          .cat-card {
            background: white;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            transition: all 0.3s;
            cursor: pointer;
          }
          .cat-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 12px 24px rgba(0,0,0,0.15);
          }
          .cat-image {
            position: relative;
            height: 280px;
            overflow: hidden;
          }
          .cat-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s;
          }
          .cat-card:hover .cat-image img {
            transform: scale(1.05);
          }
          .status-badge {
            position: absolute;
            top: 16px;
            left: 16px;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            color: white;
          }
          .status-badge.reserved {
            background: #FF9500;
          }
          .status-badge.sold {
            background: #999;
          }
          .favorite-btn {
            position: absolute;
            top: 16px;
            right: 16px;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: none;
            background: rgba(255,255,255,0.9);
            font-size: 20px;
            cursor: pointer;
            transition: transform 0.2s;
          }
          .favorite-btn:hover {
            transform: scale(1.1);
          }
          .cat-info {
            padding: 20px;
          }
          .cat-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 8px;
          }
          .cat-header h3 {
            margin: 0;
            font-size: 20px;
            font-weight: 700;
          }
          .price {
            color: #FF6B9D;
            font-weight: 700;
            font-size: 18px;
          }
          .breed {
            color: #666;
            margin: 0 0 12px 0;
            font-size: 15px;
          }
          .cat-details {
            display: flex;
            gap: 16px;
            margin-bottom: 12px;
            font-size: 14px;
            color: #666;
          }
          .breeder-info {
            display: flex;
            align-items: center;
            gap: 6px;
            margin-bottom: 12px;
            padding-bottom: 12px;
            border-bottom: 1px solid #f0f0f0;
          }
          .breeder-name {
            font-size: 14px;
            font-weight: 500;
          }
          .verified {
            color: #34C759;
            font-weight: bold;
          }
          .cat-stats {
            display: flex;
            gap: 16px;
            font-size: 13px;
            color: #999;
          }
        `}</style>
      </div>
    </Link>
  );
}
