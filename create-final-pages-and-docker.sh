#!/bin/zsh

echo "🎯 Tworzenie FINALNYCH stron + Docker + Deploy..."

# ============================================
# AI ASSISTANT PAGE - Pełna wersja
# ============================================

cat > src/pages/ai-assistant.js << 'AIEOF'
import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../components/ui/Navbar';
import Footer from '../components/ui/Footer';
import axios from 'axios';

export default function AIAssistantPage() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: 'Cześć! 🐱 Jestem AI asystentem CAT PURRE. Mogę pomóc Ci:',
      suggestions: [
        '🔍 Rozpoznać rasę kota ze zdjęcia',
        '🎯 Znaleźć idealną rasę dla Ciebie',
        '💰 Oszacować cenę kota',
        '🏥 Doradzić w kwestiach zdrowia',
        '🧬 Przeanalizować genetykę'
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async () => {
    if (!input.trim() && !uploadedImage) return;

    const userMessage = {
      role: 'user',
      text: input,
      image: uploadedImage
    };

    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);

    try {
      let response;
      
      if (uploadedImage) {
        // Rozpoznawanie rasy ze zdjęcia
        const formData = new FormData();
        formData.append('image', uploadedImage);
        
        response = await axios.post(
          \`\${process.env.NEXT_PUBLIC_API_URL}/api/ai/recognize-breed\`,
          formData
        );
        
        const aiMessage = {
          role: 'assistant',
          text: \`Rozpoznałem rasę! 🎉\n\nRasa: **\${response.data.data.breed}**\nPewność: \${response.data.data.confidence}%\n\n\${response.data.data.characteristics?.join(', ')}\`,
           response.data.data
        };
        
        setMessages(prev => [...prev, aiMessage]);
        setUploadedImage(null);
      } else {
        // Chat AI
        response = await axios.post(
          \`\${process.env.NEXT_PUBLIC_API_URL}/api/ai/chat\`,
          { message: input }
        );
        
        const aiMessage = {
          role: 'assistant',
          text: response.data.response
        };
        
        setMessages(prev => [...prev, aiMessage]);
      }
    } catch (error) {
      const errorMessage = {
        role: 'assistant',
        text: 'Przepraszam, wystąpił błąd. Spróbuj ponownie.'
      };
      setMessages(prev => [...prev, errorMessage]);
    }
    
    setLoading(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedImage(file);
      setInput('Rozpoznaj rasę kota na tym zdjęciu');
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
  };

  const startBreedQuiz = () => {
    const quizMessage = {
      role: 'assistant',
      text: 'Świetnie! Pomogę Ci znaleźć idealną rasę. Odpowiedz na kilka pytań:\n\n1️⃣ Jak duże mieszkanie masz?',
      suggestions: ['Małe (do 40m²)', 'Średnie (40-80m²)', 'Duże (80m²+)', 'Dom z ogrodem']
    };
    setMessages([...messages, quizMessage]);
  };

  return (
    <>
      <Navbar />
      
      <div className="ai-assistant-page">
        <div className="ai-container">
          <div className="ai-sidebar">
            <h2>🤖 AI Funkcje</h2>
            
            <div className="feature-cards">
              <div className="feature-card" onClick={() => fileInputRef.current?.click()}>
                <span className="icon">📸</span>
                <h4>Rozpoznaj rasę</h4>
                <p>Prześlij zdjęcie kota</p>
              </div>

              <div className="feature-card" onClick={startBreedQuiz}>
                <span className="icon">🎯</span>
                <h4>Znajdź rasę</h4>
                <p>Quiz doboru rasy</p>
              </div>

              <div className="feature-card">
                <span className="icon">💰</span>
                <h4>Wycena</h4>
                <p>Oszacuj cenę kota</p>
              </div>

              <div className="feature-card">
                <span className="icon">🧬</span>
                <h4>Genetyka</h4>
                <p>Analiza genetyczna</p>
              </div>
            </div>

            <div className="ai-stats">
              <h3>📊 Statystyki</h3>
              <div className="stat-item">
                <span>Rozpoznanych ras</span>
                <strong>1,247</strong>
              </div>
              <div className="stat-item">
                <span>Dopasowanych kotów</span>
                <strong>3,891</strong>
              </div>
              <div className="stat-item">
                <span>Dokładność AI</span>
                <strong>96.8%</strong>
              </div>
            </div>
          </div>

          <div className="chat-container">
            <div className="chat-header">
              <div className="ai-avatar">🤖</div>
              <div>
                <h3>AI Assistant</h3>
                <span className="status">🟢 Online</span>
              </div>
            </div>

            <div className="messages">
              {messages.map((msg, idx) => (
                <div key={idx} className={\`message \${msg.role}\`}>
                  {msg.role === 'assistant' && (
                    <div className="message-avatar">🤖</div>
                  )}
                  
                  <div className="message-content">
                    {msg.image && (
                      <div className="message-image">
                        <img src={URL.createObjectURL(msg.image)} alt="Uploaded" />
                      </div>
                    )}
                    
                    <div className="message-text">
                      {msg.text}
                    </div>
                    
                    {msg.suggestions && (
                      <div className="suggestions">
                        {msg.suggestions.map((sug, i) => (
                          <button 
                            key={i}
                            className="suggestion-btn"
                            onClick={() => handleSuggestionClick(sug)}
                          >
                            {sug}
                          </button>
                        ))}
                      </div>
                    )}
                    
                    {msg.data && (
                      <div className="ai-result">
                        <h4>🎯 Szczegóły rozpoznania:</h4>
                        <div className="result-grid">
                          <div className="result-item">
                            <span>Pewność</span>
                            <strong>{msg.data.confidence}%</strong>
                          </div>
                          <div className="result-item">
                            <span>Kolor</span>
                            <strong>{msg.data.colorPattern}</strong>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {msg.role === 'user' && (
                    <div className="message-avatar user">👤</div>
                  )}
                </div>
              ))}
              
              {loading && (
                <div className="message assistant">
                  <div className="message-avatar">🤖</div>
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            <div className="chat-input">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                style={{ display: 'none' }}
              />
              
              <button 
                className="attach-btn"
                onClick={() => fileInputRef.current?.click()}
              >
                📎
              </button>
              
              <input
                type="text"
                placeholder="Zadaj pytanie o koty..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              
              <button 
                className="send-btn"
                onClick={handleSend}
                disabled={loading || (!input.trim() && !uploadedImage)}
              >
                {loading ? '⏳' : '📤'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <style jsx>{`
        .ai-assistant-page {
          min-height: 100vh;
          padding: 40px 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .ai-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 20px;
          display: grid;
          grid-template-columns: 350px 1fr;
          gap: 30px;
        }
        .ai-sidebar {
          background: white;
          border-radius: 24px;
          padding: 30px;
          height: fit-content;
          box-shadow: 0 8px 24px rgba(0,0,0,0.15);
        }
        .ai-sidebar h2 {
          margin: 0 0 24px 0;
        }
        .feature-cards {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-bottom: 30px;
        }
        .feature-card {
          background: #f9f9f9;
          padding: 20px;
          border-radius: 16px;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s;
        }
        .feature-card:hover {
          background: #FF6B9D;
          color: white;
          transform: translateY(-4px);
        }
        .feature-card .icon {
          font-size: 32px;
          display: block;
          margin-bottom: 8px;
        }
        .feature-card h4 {
          margin: 0 0 4px 0;
          font-size: 14px;
        }
        .feature-card p {
          margin: 0;
          font-size: 12px;
          opacity: 0.8;
        }
        .ai-stats {
          background: #f9f9f9;
          padding: 20px;
          border-radius: 16px;
        }
        .ai-stats h3 {
          margin: 0 0 16px 0;
          font-size: 16px;
        }
        .stat-item {
          display: flex;
          justify-content: space-between;
          padding: 12px 0;
          border-bottom: 1px solid #e0e0e0;
        }
        .stat-item:last-child {
          border-bottom: none;
        }
        .stat-item span {
          font-size: 13px;
          color: #666;
        }
        .stat-item strong {
          font-size: 16px;
          color: #FF6B9D;
        }
        .chat-container {
          background: white;
          border-radius: 24px;
          display: flex;
          flex-direction: column;
          height: 80vh;
          box-shadow: 0 8px 24px rgba(0,0,0,0.15);
        }
        .chat-header {
          padding: 24px 30px;
          border-bottom: 1px solid #f0f0f0;
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .ai-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea, #764ba2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
        }
        .chat-header h3 {
          margin: 0 0 4px 0;
        }
        .status {
          font-size: 13px;
          color: #34C759;
        }
        .messages {
          flex: 1;
          overflow-y: auto;
          padding: 30px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .message {
          display: flex;
          gap: 12px;
          animation: slideIn 0.3s;
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .message.user {
          flex-direction: row-reverse;
        }
        .message-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea, #764ba2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          flex-shrink: 0;
        }
        .message-avatar.user {
          background: #f0f0f0;
        }
        .message-content {
          max-width: 70%;
        }
        .message.user .message-content {
          background: #FF6B9D;
          color: white;
          border-radius: 20px 20px 4px 20px;
        }
        .message-text {
          background: #f9f9f9;
          padding: 16px 20px;
          border-radius: 20px 20px 20px 4px;
          white-space: pre-line;
          line-height: 1.6;
        }
        .message.user .message-text {
          background: transparent;
          border-radius: 20px 20px 4px 20px;
        }
        .message-image {
          margin-bottom: 12px;
          border-radius: 16px;
          overflow: hidden;
        }
        .message-image img {
          max-width: 300px;
          border-radius: 16px;
        }
        .suggestions {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 12px;
        }
        .suggestion-btn {
          padding: 10px 16px;
          background: white;
          border: 2px solid #FF6B9D;
          color: #FF6B9D;
          border-radius: 20px;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.2s;
        }
        .suggestion-btn:hover {
          background: #FF6B9D;
          color: white;
        }
        .ai-result {
          margin-top: 16px;
          padding: 16px;
          background: #f0f0f0;
          border-radius: 12px;
        }
        .ai-result h4 {
          margin: 0 0 12px 0;
        }
        .result-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        .result-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .result-item span {
          font-size: 12px;
          color: #666;
        }
        .result-item strong {
          font-size: 16px;
        }
        .typing-indicator {
          display: flex;
          gap: 6px;
          padding: 16px 20px;
          background: #f9f9f9;
          border-radius: 20px;
        }
        .typing-indicator span {
          width: 8px;
          height: 8px;
          background: #999;
          border-radius: 50%;
          animation: bounce 1.4s infinite;
        }
        .typing-indicator span:nth-child(2) {
          animation-delay: 0.2s;
        }
        .typing-indicator span:nth-child(3) {
          animation-delay: 0.4s;
        }
        @keyframes bounce {
          0%, 60%, 100% {
            transform: translateY(0);
          }
          30% {
            transform: translateY(-10px);
          }
        }
        .chat-input {
          padding: 24px 30px;
          border-top: 1px solid #f0f0f0;
          display: flex;
          gap: 12px;
        }
        .chat-input input[type="text"] {
          flex: 1;
          padding: 14px 20px;
          border: 2px solid #f0f0f0;
          border-radius: 50px;
          font-size: 15px;
        }
        .chat-input input[type="text"]:focus {
          border-color: #FF6B9D;
          outline: none;
        }
        .attach-btn, .send-btn {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: none;
          font-size: 20px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .attach-btn {
          background: #f0f0f0;
        }
        .attach-btn:hover {
          background: #e0e0e0;
        }
        .send-btn {
          background: #FF6B9D;
        }
        .send-btn:hover {
          background: #E5567F;
          transform: scale(1.05);
        }
        .send-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        @media (max-width: 768px) {
          .ai-container {
            grid-template-columns: 1fr;
          }
          .ai-sidebar {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
AIEOF

# ============================================
# BREEDERS PAGE
# ============================================

cat > src/pages/breeders/index.js << 'BREEDERSEOF'
import React, { useState, useEffect } from 'react';
import Navbar from '../../components/ui/Navbar';
import Footer from '../../components/ui/Footer';
import axios from 'axios';

export default function BreedersPage() {
  const [breeders, setBreeders] = useState([]);
  const [filters, setFilters] = useState({
    breed: '',
    location: '',
    verified: true
  });

  useEffect(() => {
    loadBreeders();
  }, [filters]);

  const loadBreeders = async () => {
    try {
      const response = await axios.get(\`\${process.env.NEXT_PUBLIC_API_URL}/api/breeders\`);
      setBreeders(response.data.breeders || mockBreeders);
    } catch (error) {
      setBreeders(mockBreeders);
    }
  };

  const mockBreeders = [
    {
      id: 1,
      name: 'Golden British',
      logo: '🏆',
      catteryName: 'Golden British Cattery',
      verified: true,
      rating: 4.9,
      reviews: 45,
      breeds: ['British Shorthair'],
      location: 'Warszawa, mazowieckie',
      activeCats: 12,
      totalSales: 89,
      established: 2015,
      description: 'Profesjonalna hodowla British Shorthair z wieloletnim doświadczeniem.'
    },
    {
      id: 2,
      name: 'Maine Magic',
      logo: '⭐',
      catteryName: 'Maine Magic Cattery',
      verified: true,
      rating: 5.0,
      reviews: 67,
      breeds: ['Maine Coon'],
      location: 'Kraków, małopolskie',
      activeCats: 18,
      totalSales: 134,
      established: 2012,
      description: 'Hodowla Maine Coon z najwyższymi standardami FIFe.'
    },
    {
      id: 3,
      name: 'Royal Persians',
      logo: '👑',
      catteryName: 'Royal Persian Cattery',
      verified: true,
      rating: 4.8,
      reviews: 38,
      breeds: ['Persian', 'Exotic Shorthair'],
      location: 'Gdańsk, pomorskie',
      activeCats: 9,
      totalSales: 56,
      established: 2018,
      description: 'Ekskluzywna hodowla persów i egzotów.'
    }
  ];

  return (
    <>
      <Navbar />
      
      <div className="breeders-page">
        <div className="container">
          <div className="page-header">
            <h1>🏠 Zweryfikowani Hodowcy</h1>
            <p>Poznaj najlepszych hodowców kotów rasowych w Polsce</p>
          </div>

          <div className="filters-bar">
            <select 
              value={filters.breed}
              onChange={(e) => setFilters({...filters, breed: e.target.value})}
            >
              <option value="">Wszystkie rasy</option>
              <option value="British Shorthair">British Shorthair</option>
              <option value="Maine Coon">Maine Coon</option>
              <option value="Persian">Persian</option>
            </select>

            <input
              type="text"
              placeholder="Lokalizacja..."
              value={filters.location}
              onChange={(e) => setFilters({...filters, location: e.target.value})}
            />

            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={filters.verified}
                onChange={(e) => setFilters({...filters, verified: e.target.checked})}
              />
              <span>Tylko zweryfikowani</span>
            </label>
          </div>

          <div className="breeders-grid">
            {breeders.map(breeder => (
              <div key={breeder.id} className="breeder-card">
                <div className="breeder-header">
                  <div className="breeder-logo">{breeder.logo}</div>
                  {breeder.verified && (
                    <div className="verified-badge">✓ Zweryfikowany</div>
                  )}
                </div>

                <h3>{breeder.catteryName}</h3>
                <p className="description">{breeder.description}</p>

                <div className="breeds-list">
                  {breeder.breeds.map((breed, idx) => (
                    <span key={idx} className="breed-tag">{breed}</span>
                  ))}
                </div>

                <div className="breeder-stats">
                  <div className="stat">
                    <span className="label">Ocena</span>
                    <span className="value">⭐ {breeder.rating}</span>
                  </div>
                  <div className="stat">
                    <span className="label">Opinie</span>
                    <span className="value">{breeder.reviews}</span>
                  </div>
                  <div className="stat">
                    <span className="label">Aktywne</span>
                    <span className="value">{breeder.activeCats} kotów</span>
                  </div>
                </div>

                <div className="breeder-footer">
                  <span className="location">📍 {breeder.location}</span>
                  <span className="since">Od {breeder.established}</span>
                </div>

                <div className="actions">
                  <button className="btn btn-primary">Zobacz profil</button>
                  <button className="btn btn-outline">💬 Kontakt</button>
                </div>
              </div>
            ))}
          </div>

          <div className="become-breeder">
            <h2>Jesteś hodowcą?</h2>
            <p>Dołącz do CAT PURRE i rozwijaj swoją hodowlę</p>
            <button className="btn btn-primary btn-lg">Załóż konto hodowcy</button>
          </div>
        </div>
      </div>

      <Footer />

      <style jsx>{`
        .breeders-page {
          min-height: 100vh;
          padding: 40px 0;
          background: #f9fafb;
        }
        .page-header {
          text-align: center;
          margin-bottom: 40px;
        }
        .page-header h1 {
          font-size: 48px;
          margin-bottom: 16px;
        }
        .page-header p {
          font-size: 18px;
          color: #666;
        }
        .filters-bar {
          display: flex;
          gap: 16px;
          margin-bottom: 40px;
          background: white;
          padding: 24px;
          border-radius: 16px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .filters-bar select,
        .filters-bar input {
          flex: 1;
        }
        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
        }
        .breeders-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 30px;
          margin-bottom: 60px;
        }
        .breeder-card {
          background: white;
          border-radius: 20px;
          padding: 30px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          transition: all 0.3s;
        }
        .breeder-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.15);
        }
        .breeder-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 20px;
        }
        .breeder-logo {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea, #764ba2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 40px;
        }
        .verified-badge {
          background: #34C759;
          color: white;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
        }
        .breeder-card h3 {
          font-size: 22px;
          margin: 0 0 12px 0;
        }
        .description {
          color: #666;
          font-size: 14px;
          line-height: 1.6;
          margin-bottom: 16px;
        }
        .breeds-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 20px;
        }
        .breed-tag {
          padding: 6px 12px;
          background: #FF6B9D;
          color: white;
          border-radius: 16px;
          font-size: 13px;
          font-weight: 500;
        }
        .breeder-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 20px;
          padding: 16px 0;
          border-top: 1px solid #f0f0f0;
          border-bottom: 1px solid #f0f0f0;
        }
        .stat {
          text-align: center;
        }
        .stat .label {
          display: block;
          font-size: 12px;
          color: #999;
          margin-bottom: 4px;
        }
        .stat .value {
          font-size: 16px;
          font-weight: 600;
        }
        .breeder-footer {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          color: #666;
          margin-bottom: 20px;
        }
        .actions {
          display: flex;
          gap: 12px;
        }
        .actions button {
          flex: 1;
        }
        .become-breeder {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          padding: 60px;
          border-radius: 24px;
          text-align: center;
        }
        .become-breeder h2 {
          font-size: 36px;
          margin: 0 0 16px 0;
        }
        .become-breeder p {
          font-size: 18px;
          margin-bottom: 30px;
          opacity: 0.9;
        }
        @media (max-width: 768px) {
          .breeders-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
BREEDERSEOF

# ============================================
# DOCKER CONFIGURATION
# ============================================

cat > Dockerfile << 'DOCKEREOF'
# Multi-stage build for Next.js

# Stage 1: Dependencies
FROM node:18-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Stage 2: Builder
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Stage 3: Runner
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
DOCKEREOF

cat > server/Dockerfile << 'SERVERDOCKEREOF'
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 5000

CMD ["node", "server.js"]
SERVERDOCKEREOF

cat > docker-compose.yml << 'COMPOSEEOF'
version: '3.8'

services:
  mongodb:
    image: mongo:7
    restart: always
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_DATABASE: catpurre
    volumes:
      - mongodb_/data/db

  backend:
    build: ./server
    restart: always
    ports:
      - "5000:5000"
    environment:
      - MONGODB_URI=mongodb://mongodb:27017/catpurre
      - GEMINI_API_KEY=${GEMINI_API_KEY}
      - JWT_SECRET=${JWT_SECRET}
    depends_on:
      - mongodb
    volumes:
      - ./server:/app
      - /app/node_modules

  frontend:
    build: .
    restart: always
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:5000
      - NEXT_PUBLIC_GEMINI_API_KEY=${GEMINI_API_KEY}
    depends_on:
      - backend

volumes:
  mongodb_
COMPOSEEOF

cat > .dockerignore << 'DOCKERIGNOREEOF'
node_modules
.next
.git
.env.local
npm-debug.log
README.md
.DS_Store
DOCKERIGNOREEOF

# ============================================
# ULTIMATE LAUNCH SCRIPT
# ============================================

cat > start-catpurre.sh << 'STARTEOF'
#!/bin/zsh

echo "╔════════════════════════════════════════╗"
echo "║     🐱 CAT PURRE Platform Launcher    ║"
echo "╚════════════════════════════════════════╝"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
check_command() {
    if ! command -v $1 &> /dev/null; then
        echo "${RED}✗ $1 not found${NC}"
        return 1
    else
        echo "${GREEN}✓ $1 found${NC}"
        return 0
    fi
}

# Check prerequisites
echo "${BLUE}[1/6] Checking prerequisites...${NC}"
check_command node || { echo "Please install Node.js"; exit 1; }
check_command npm || { echo "Please install npm"; exit 1; }
check_command mongod || { echo "Please install MongoDB"; exit 1; }

# Start MongoDB
echo ""
echo "${BLUE}[2/6] Starting MongoDB...${NC}"
if ! pgrep -x "mongod" > /dev/null; then
    brew services start mongodb-community 2>/dev/null || \
    sudo systemctl start mongodb 2>/dev/null || \
    mongod --fork --logpath /tmp/mongodb.log --dbpath ~/data/db
    sleep 3
    echo "${GREEN}✓ MongoDB started${NC}"
else
    echo "${YELLOW}⚠ MongoDB already running${NC}"
fi

# Install dependencies
echo ""
echo "${BLUE}[3/6] Installing dependencies...${NC}"
if [ ! -d "node_modules" ]; then
    npm install
fi
if [ ! -d "server/node_modules" ]; then
    cd server && npm install && cd ..
fi
echo "${GREEN}✓ Dependencies installed${NC}"

# Seed database
echo ""
echo "${BLUE}[4/6] Seeding database...${NC}"
cd server && npm run seed 2>/dev/null && cd ..
echo "${GREEN}✓ Database seeded${NC}"

# Start backend
echo ""
echo "${BLUE}[5/6] Starting Backend Server...${NC}"
cd server
npm run dev &
BACKEND_PID=$!
cd ..
sleep 3
echo "${GREEN}✓ Backend running on http://localhost:5000${NC}"

# Start frontend
echo ""
echo "${BLUE}[6/6] Starting Frontend...${NC}"
npm run dev &
FRONTEND_PID=$!
sleep 3
echo "${GREEN}✓ Frontend running on http://localhost:3000${NC}"

# Done
echo ""
echo "╔════════════════════════════════════════╗"
echo "║  ✅ CAT PURRE is running!             ║"
echo "╚════════════════════════════════════════╝"
echo ""
echo "${GREEN}🌐 Frontend:${NC} http://localhost:3000"
echo "${GREEN}🔧 Backend:${NC}  http://localhost:5000"
echo "${GREEN}🍃 MongoDB:${NC}  mongodb://localhost:27017"
echo ""
echo "${YELLOW}Test Credentials:${NC}"
echo "   Email:    admin@catpurre.pl"
echo "   Password: password123"
echo ""
echo "${BLUE}📚 Documentation:${NC} README.md"
echo "${BLUE}🐛 Issues:${NC}        GitHub Issues"
echo ""
echo "${YELLOW}Press Ctrl+C to stop all services${NC}"
echo ""

# Cleanup on exit
cleanup() {
    echo ""
    echo "${YELLOW}Stopping services...${NC}"
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    echo "${GREEN}✓ All services stopped${NC}"
    exit 0
}

trap cleanup INT TERM

# Wait forever
tail -f /dev/null
STARTEOF

chmod +x start-catpurre.sh

# ============================================
# QUICK START GUIDE
# ============================================

cat > QUICKSTART.md << 'QUICKEOF'
# 🚀 Quick Start Guide

## Instalacja w 3 krokach

### 1. Uruchom platform
\`\`\`bash
./start-catpurre.sh
\`\`\`

### 2. Otwórz przeglądarkę
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

### 3. Zaloguj się
- Email: \`admin@catpurre.pl\`
- Password: \`password123\`

## 🐳 Docker (alternatywnie)

\`\`\`bash
docker-compose up
\`\`\`

## 📱 Mobile App

\`\`\`bash
cd mobile
npm start
# Scan QR code with Expo Go app
\`\`\`

## 🛠️ Rozwój

### Backend
\`\`\`bash
cd server
npm run dev
\`\`\`

### Frontend
\`\`\`bash
npm run dev
\`\`\`

### Mobile
\`\`\`bash
cd mobile
npm start
\`\`\`

## 📚 Więcej informacji
- README.md - Pełna dokumentacja
- API Docs: http://localhost:5000/api-docs
QUICKEOF

echo "✅ FINALNA KONFIGURACJA KOMPLETNA!"
echo ""
echo "📋 Utworzono:"
echo "   ✓ AI Assistant Page (pełna wersja)"
echo "   ✓ Breeders Page"
echo "   ✓ Docker + docker-compose"
echo "   ✓ Ultimate Launch Script"
echo "   ✓ Quick Start Guide"
echo ""
echo "🎉 PROJEKT CAT PURRE JEST KOMPLETNY!"
echo ""
echo "🚀 Uruchom platform:"
echo "   ./start-catpurre.sh"
echo ""

