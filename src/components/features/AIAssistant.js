import React, { useState, useRef, useEffect } from 'react';
import GeminiService from '../../services/ai/GeminiService';

export default function AIAssistant({ catId, context = {} }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Cześć! 🐱 Mam pytania o tego kota?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const sessionId = `cat-${catId}-${Date.now()}`;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await GeminiService.chat(input, sessionId, context);
      setMessages(prev => [...prev, { role: 'assistant', text: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        text: 'Przepraszam, wystąpił błąd. Spróbuj ponownie.' 
      }]);
    }
    setLoading(false);
  };

  const quickQuestions = [
    'Jakie są koszty utrzymania?',
    'Jak przygotować dom?',
    'Czy nadaje się dla alergików?',
    'Jaki jest charakter tej rasy?'
  ];

  return (
    <>
      {/* Floating button */}
      <button 
        className="ai-assistant-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        🤖 Asystent AI
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="ai-chat-window">
          <div className="chat-header">
            <h3>🤖 Asystent CAT PURRE</h3>
            <button onClick={() => setIsOpen(false)}>✕</button>
          </div>

          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.role}`}>
                <div className="message-avatar">
                  {msg.role === 'assistant' ? '🤖' : '👤'}
                </div>
                <div className="message-text">{msg.text}</div>
              </div>
            ))}
            {loading && (
              <div className="message assistant">
                <div className="typing-indicator">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick questions */}
          {messages.length === 1 && (
            <div className="quick-questions">
              {quickQuestions.map((q, idx) => (
                <button 
                  key={idx}
                  onClick={() => {
                    setInput(q);
                    sendMessage();
                  }}
                  className="quick-question"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          <div className="chat-input">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Zadaj pytanie..."
            />
            <button onClick={sendMessage} disabled={loading}>
              📤
            </button>
          </div>
        </div>
      )}
    </>
  );
}
