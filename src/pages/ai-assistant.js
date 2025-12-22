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
