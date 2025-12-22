import React, { useState } from 'react';
import BreedingPlannerService from '../../services/BreedingPlannerService';

export default function BreedingPlanner() {
  const [selectedMale, setSelectedMale] = useState(null);
  const [selectedFemale, setSelectedFemale] = useState(null);
  const [prediction, setPrediction] = useState(null);

  const checkCompatibility = async () => {
    if (!selectedMale || !selectedFemale) return;

    const result = await BreedingPlannerService.checkCompatibility(
      selectedMale.id,
      selectedFemale.id
    );
    
    setPrediction(result);
  };

  return (
    <div className="breeding-planner">
      <h1>🧬 Planer Hodowli</h1>
      
      <div className="planner-grid">
        <div className="cat-selector">
          <h3>♂️ Samiec</h3>
          <div className="cat-card">
            {selectedMale ? (
              <>
                <img src={selectedMale.image} alt={selectedMale.name} />
                <h4>{selectedMale.name}</h4>
                <p>{selectedMale.breed}</p>
              </>
            ) : (
              <button className="select-btn">Wybierz samca</button>
            )}
          </div>
        </div>

        <div className="compatibility-icon">
          <div className="heart">❤️</div>
          <button onClick={checkCompatibility} className="btn btn-primary">
            Sprawdź kompatybilność
          </button>
        </div>

        <div className="cat-selector">
          <h3>♀️ Samica</h3>
          <div className="cat-card">
            {selectedFemale ? (
              <>
                <img src={selectedFemale.image} alt={selectedFemale.name} />
                <h4>{selectedFemale.name}</h4>
                <p>{selectedFemale.breed}</p>
              </>
            ) : (
              <button className="select-btn">Wybierz samicę</button>
            )}
          </div>
        </div>
      </div>

      {prediction && (
        <div className="prediction-results">
          <h2>📊 Wyniki analizy</h2>
          
          <div className="compatibility-score">
            <div className="score-circle">
              <span className="score">{prediction.compatibilityScore}%</span>
              <span className="label">Kompatybilność</span>
            </div>
          </div>

          <div className="predictions-grid">
            <div className="prediction-card">
              <h4>🎨 Przewidywane kolory</h4>
              <div className="color-chips">
                {prediction.expectedColors?.map((color, idx) => (
                  <span key={idx} className="color-chip">{color}</span>
                ))}
              </div>
            </div>

            <div className="prediction-card">
              <h4>🏥 Ryzyko zdrowotne</h4>
              <div className="risk-level">
                <span className={`risk ${prediction.healthRisk}`}>
                  {prediction.healthRisk}
                </span>
              </div>
            </div>

            <div className="prediction-card">
              <h4>📈 Wartość hodowlana</h4>
              <div className="breeding-value">
                <span className="value">{prediction.breedingValue}/100</span>
              </div>
            </div>
          </div>

          <div className="recommendations">
            <h4>💡 Rekomendacje</h4>
            <ul>
              {prediction.recommendations?.map((rec, idx) => (
                <li key={idx}>{rec}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <style jsx>{`
        .breeding-planner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px;
        }
        .planner-grid {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 40px;
          align-items: center;
          margin: 40px 0;
        }
        .cat-selector {
          text-align: center;
        }
        .cat-card {
          background: white;
          padding: 30px;
          border-radius: 20px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .cat-card img {
          width: 100%;
          height: 300px;
          object-fit: cover;
          border-radius: 12px;
          margin-bottom: 16px;
        }
        .select-btn {
          width: 100%;
          padding: 60px 20px;
          background: #f0f0f0;
          border: 2px dashed #ccc;
          border-radius: 12px;
          cursor: pointer;
          font-size: 16px;
          transition: all 0.2s;
        }
        .select-btn:hover {
          background: #e0e0e0;
          border-color: #FF6B9D;
        }
        .compatibility-icon {
          text-align: center;
        }
        .heart {
          font-size: 64px;
          margin-bottom: 20px;
          animation: heartbeat 1.5s infinite;
        }
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        .prediction-results {
          background: white;
          padding: 40px;
          border-radius: 20px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          margin-top: 40px;
        }
        .compatibility-score {
          text-align: center;
          margin: 30px 0;
        }
        .score-circle {
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 200px;
          height: 200px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }
        .score {
          font-size: 48px;
          font-weight: bold;
        }
        .label {
          font-size: 14px;
          opacity: 0.9;
        }
        .predictions-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin: 30px 0;
        }
        .prediction-card {
          background: #f9f9f9;
          padding: 24px;
          border-radius: 16px;
        }
        .prediction-card h4 {
          margin: 0 0 16px 0;
        }
        .color-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .color-chip {
          padding: 6px 12px;
          background: #FF6B9D;
          color: white;
          border-radius: 16px;
          font-size: 14px;
        }
        .risk {
          padding: 8px 16px;
          border-radius: 8px;
          font-weight: 600;
          text-transform: uppercase;
        }
        .risk.low {
          background: #34C759;
          color: white;
        }
        .risk.medium {
          background: #FF9500;
          color: white;
        }
        .risk.high {
          background: #FF3B30;
          color: white;
        }
        .recommendations ul {
          list-style: none;
          padding: 0;
        }
        .recommendations li {
          padding: 12px;
          background: #f0f0f0;
          border-radius: 8px;
          margin-bottom: 8px;
        }
        .recommendations li:before {
          content: '💡 ';
        }
      `}</style>
    </div>
  );
}
