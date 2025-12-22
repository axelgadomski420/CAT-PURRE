import React, { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '../components/ui/Navbar';
import { useAuth } from '../context/AuthContext';

export default function AIBehavioristPage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      text: 'Cześć! Jestem AI Behawiorystą kotów 🐱 Mam 20 lat doświadczenia. Opowiedz mi o problemie z Twoim kotem.',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [catProfile, setCatProfile] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const quickQuestions = [
    'Kot drapie meble - co robić?',
    'Kot jest agresywny wobec innych',
    'Kot sikwa poza kuwetą',
    'Kot miauczy w nocy',
    'Kot boi się głośnych dźwięków',
    'Kot nie chce jeść'
  ];

  const sendMessage = async (text = input) => {
    if (!text.trim()) return;

    const userMessage = {
      role: 'user',
      text,
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch(\`\${process.env.NEXT_PUBLIC_API_URL}/api/ai/behaviorist\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          catProfile,
          conversationHistory: messages
        })
      });

      const data = await response.json();

      const aiMessage = {
        role: 'ai',
        text: data.response,
        suggestions: data.suggestions,
        relatedArticles: data.relatedArticles,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('AI Error:', error);
      setMessages(prev => [...prev, {
        role: 'ai',
        text: 'Przepraszam, wystąpił błąd. Spróbuj ponownie.',
        timestamp: new Date()
      }]);
    }

    setLoading(false);
  };

  const setupCatProfile = () => {
    const profile = {
      name: prompt('Imię kota:'),
      age: prompt('Wiek (w latach):'),
      breed: prompt('Rasa:'),
      gender: prompt('Płeć (M/F):')
    };
    setCatProfile(profile);
    
    setMessages(prev => [...prev, {
      role: 'ai',
      text: \`Świetnie! Teraz wiem więcej o \${profile.name}. To pomoże mi lepiej doradzić. Jaki jest problem?\`,
      timestamp: new Date()
    }]);
  };

  return (
    <>
      <Head>
        <title>AI Behawiorista - CAT PURRE</title>
      </Head>

      <Navbar />

      <div className="behaviorist-page">
        <div className="container">
          <div className="chat-layout">
            {/* Sidebar */}
            <aside className="sidebar">
              <div className="expert-card">
                <div className="expert-avatar">🧑‍⚕️</div>
                <h3>Dr. AI Whiskers</h3>
                <p className="title">Certyfikowany Behawioryta</p>
                <div className="stats">
                  <div className="stat">
                    <strong>10k+</strong>
                    <span>Rozwiązanych problemów</span>
                  </div>
                  <div className="stat">
                    <strong>4.9/5</strong>
                    <span>Ocena</span>
                  </div>
                </div>
              </div>

              {!catProfile ? (
                <button className="btn btn-primary" onClick={setupCatProfile}>
                  📝 Dodaj profil kota
                </button>
              ) : (
                <div className="cat-profile-card">
                  <h4>🐱 Twój kot</h4>
                  <p><strong>{catProfile.name}</strong></p>
                  <p>{catProfile.breed}, {catProfile.age} lat</p>
                  <button className="btn btn-sm btn-outline" onClick={setupCatProfile}>
                    Edytuj
                  </button>
                </div>
              )}

              <div className="quick-questions">
                <h4>💡 Szybkie pytania</h4>
                {quickQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    className="quick-btn"
                    onClick={() => sendMessage(q)}
                  >
                    {q}
                  </button>
                ))}
              </div>

              <div className="help-box">
                <h4>🆘 Pomoc 24/7</h4>
                <p>Potrzebujesz pilnej pomocy?</p>
                <button className="btn btn-outline btn-sm">
                  📞 Umów wizytę z prawdziwym behawiorystą
                </button>
              </div>
            </aside>

            {/* Chat */}
            <main className="chat-main">
              <div className="chat-header">
                <h1>🧠 AI Behawiorista Kotów</h1>
                <p>Porozmawiam z Tobą o problemach behawioralnych Twojego kota</p>
              </div>

              <div className="messages-container">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`message \${msg.role}\`}>
                    <div className="message-avatar">
                      {msg.role === 'ai' ? '🧑‍⚕️' : '👤'}
                    </div>
                    <div className="message-content">
                      <div className="message-text">{msg.text}</div>
                      
                      {msg.suggestions && (
                        <div className="suggestions">
                          <h5>💡 Sugestie:</h5>
                          <ul>
                            {msg.suggestions.map((s, i) => (
                              <li key={i}>{s}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {msg.relatedArticles && (
                        <div className="related-articles">
                          <h5>📚 Artykuły powiązane:</h5>
                          {msg.relatedArticles.map((article, i) => (
                            <a key={i} href={article.url}>
                              {article.title} →
                            </a>
                          ))}
                        </div>
                      )}

                      <span className="message-time">
                        {msg.timestamp.toLocaleTimeString('pl-PL', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="message ai">
                    <div className="message-avatar">🧑‍⚕️</div>
                    <div className="message-content">
                      <div className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              <div className="chat-input-container">
                <input
                  type="text"
                  placeholder="Opisz problem z kotem..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  disabled={loading}
                />
                <button 
                  className="btn btn-primary"
                  onClick={() => sendMessage()}
                  disabled={loading || !input.trim()}
                >
                  Wyślij
                </button>
              </div>
            </main>
          </div>
        </div>
      </div>

      <style jsx>{`
        .behaviorist-page {
          min-height: 100vh;
          padding: 40px 0;
          background: var(--gray-50);
        }
        .chat-layout {
          display: grid;
          grid-template-columns: 350px 1fr;
          gap: 30px;
          max-width: 1400px;
          margin: 0 auto;
        }
        .sidebar {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .expert-card {
          background: white;
          padding: 30px;
          border-radius: 20px;
          text-align: center;
          box-shadow: var(--shadow-md);
        }
        .expert-avatar {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: var(--gradient-secondary);
          font-size: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
        }
        .expert-card h3 {
          margin: 0 0 8px 0;
        }
        .title {
          color: var(--gray-600);
          font-size: 14px;
          margin-bottom: 20px;
        }
        .stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .stat {
          text-align: center;
          padding: 12px;
          background: var(--gray-50);
          border-radius: 12px;
        }
        .stat strong {
          display: block;
          font-size: 20px;
          color: var(--primary);
          margin-bottom: 4px;
        }
        .stat span {
          font-size: 12px;
          color: var(--gray-600);
        }
        .cat-profile-card {
          background: white;
          padding: 20px;
          border-radius: 20px;
          box-shadow: var(--shadow-md);
        }
        .cat-profile-card h4 {
          margin: 0 0 12px 0;
        }
        .cat-profile-card p {
          margin: 4px 0;
          color: var(--gray-600);
        }
        .quick-questions {
          background: white;
          padding: 20px;
          border-radius: 20px;
          box-shadow: var(--shadow-md);
        }
        .quick-questions h4 {
          margin: 0 0 16px 0;
        }
        .quick-btn {
          display: block;
          width: 100%;
          padding: 12px;
          margin-bottom: 8px;
          background: var(--gray-50);
          border: none;
          border-radius: 12px;
          text-align: left;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 14px;
        }
        .quick-btn:hover {
          background: #FFF5F8;
          color: var(--primary);
          transform: translateX(4px);
        }
        .help-box {
          background: linear-gradient(135deg, #FF6B9D, #FFA07A);
          color: white;
          padding: 20px;
          border-radius: 20px;
        }
        .help-box h4 {
          margin: 0 0 8px 0;
        }
        .help-box p {
          margin: 0 0 16px 0;
          font-size: 14px;
        }
        .chat-main {
          background: white;
          border-radius: 20px;
          box-shadow: var(--shadow-md);
          display: flex;
          flex-direction: column;
          height: calc(100vh - 160px);
        }
        .chat-header {
          padding: 30px;
          border-bottom: 2px solid var(--gray-100);
        }
        .chat-header h1 {
          margin: 0 0 8px 0;
          font-size: 32px;
        }
        .chat-header p {
          margin: 0;
          color: var(--gray-600);
        }
        .messages-container {
          flex: 1;
          overflow-y: auto;
          padding: 30px;
        }
        .message {
          display: flex;
          gap: 16px;
          margin-bottom: 24px;
        }
        .message.user {
          flex-direction: row-reverse;
        }
        .message-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: var(--gray-100);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          flex-shrink: 0;
        }
        .message.ai .message-avatar {
          background: var(--gradient-secondary);
        }
        .message-content {
          flex: 1;
          max-width: 70%;
        }
        .message-text {
          background: var(--gray-50);
          padding: 16px 20px;
          border-radius: 20px;
          line-height: 1.6;
        }
        .message.user .message-text {
          background: var(--gradient-primary);
          color: white;
        }
        .message-time {
          display: block;
          margin-top: 8px;
          font-size: 12px;
          color: var(--gray-500);
        }
        .suggestions {
          margin-top: 16px;
          padding: 16px;
          background: #E8F5E9;
          border-radius: 12px;
        }
        .suggestions h5 {
          margin: 0 0 12px 0;
          color: var(--success);
        }
        .suggestions ul {
          margin: 0;
          padding-left: 20px;
        }
        .suggestions li {
          margin-bottom: 8px;
        }
        .related-articles {
          margin-top: 16px;
          padding: 16px;
          background: #E3F2FD;
          border-radius: 12px;
        }
        .related-articles h5 {
          margin: 0 0 12px 0;
        }
        .related-articles a {
          display: block;
          margin-bottom: 8px;
          color: var(--secondary);
          font-weight: 600;
        }
        .typing-indicator {
          display: flex;
          gap: 6px;
          padding: 16px;
        }
        .typing-indicator span {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--gray-400);
          animation: typing 1.4s infinite;
        }
        .typing-indicator span:nth-child(2) {
          animation-delay: 0.2s;
        }
        .typing-indicator span:nth-child(3) {
          animation-delay: 0.4s;
        }
        @keyframes typing {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-10px); }
        }
        .chat-input-container {
          padding: 20px 30px;
          border-top: 2px solid var(--gray-100);
          display: flex;
          gap: 12px;
        }
        .chat-input-container input {
          flex: 1;
        }
        @media (max-width: 768px) {
          .chat-layout {
            grid-template-columns: 1fr;
          }
          .sidebar {
            order: 2;
          }
        }
      `}</style>
    </>
  );
}
