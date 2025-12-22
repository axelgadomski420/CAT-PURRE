import React, { useState } from 'react';
import { useRouter } from 'next/router';

export default function SearchBar() {
  const router = useRouter();
  const [search, setSearch] = useState({
    breed: '',
    location: '',
    priceRange: ''
  });

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (search.breed) params.append('breed', search.breed);
    if (search.location) params.append('location', search.location);
    if (search.priceRange) params.append('priceRange', search.priceRange);
    
    router.push(\`/cats?\${params.toString()}\`);
  };

  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <div className="search-field">
          <label>🐱 Rasa</label>
          <select 
            value={search.breed} 
            onChange={(e) => setSearch({...search, breed: e.target.value})}
          >
            <option value="">Wszystkie rasy</option>
            <option value="British Shorthair">British Shorthair</option>
            <option value="Maine Coon">Maine Coon</option>
            <option value="Persian">Persian</option>
            <option value="Ragdoll">Ragdoll</option>
            <option value="Bengal">Bengal</option>
          </select>
        </div>

        <div className="search-field">
          <label>📍 Lokalizacja</label>
          <input 
            type="text" 
            placeholder="np. Warszawa"
            value={search.location}
            onChange={(e) => setSearch({...search, location: e.target.value})}
          />
        </div>

        <div className="search-field">
          <label>💰 Cena</label>
          <select 
            value={search.priceRange}
            onChange={(e) => setSearch({...search, priceRange: e.target.value})}
          >
            <option value="">Dowolna</option>
            <option value="0-3000">do 3,000 PLN</option>
            <option value="3000-5000">3,000 - 5,000 PLN</option>
            <option value="5000-8000">5,000 - 8,000 PLN</option>
            <option value="8000+">powyżej 8,000 PLN</option>
          </select>
        </div>

        <button onClick={handleSearch} className="btn btn-primary">
          🔍 Szukaj
        </button>
      </div>

      <style jsx>{`
        .search-bar-container {
          padding: 40px 0;
          background: #f9fafb;
        }
        .search-bar {
          max-width: 1000px;
          margin: 0 auto;
          background: white;
          padding: 30px;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          display: grid;
          grid-template-columns: repeat(3, 1fr) auto;
          gap: 20px;
          align-items: end;
        }
        .search-field {
          display: flex;
          flex-direction: column;
        }
        .search-field label {
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 8px;
          color: #666;
        }
        @media (max-width: 768px) {
          .search-bar {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
