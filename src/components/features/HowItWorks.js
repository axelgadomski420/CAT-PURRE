import React from 'react';

export default function HowItWorks() {
  const steps = [
    {
      icon: '🔍',
      title: 'Przeglądaj',
      description: 'Znajdź swojego wymarzonego kota wśród setek ofert'
    },
    {
      icon: '🤖',
      title: 'AI Pomaga',
      description: 'Skorzystaj z AI asystenta do dopasowania idealnego kota'
    },
    {
      icon: '💬',
      title: 'Kontakt',
      description: 'Napisz do hodowcy i umów się na wizytę'
    },
    {
      icon: '✅',
      title: 'Rezerwacja',
      description: 'Zarezerwuj kota i podpisz umowę online'
    },
    {
      icon: '🏠',
      title: 'Odbierz',
      description: 'Odbierz swojego nowego przyjaciela!'
    }
  ];

  return (
    <section className="how-it-works">
      <div className="container">
        <h2 className="text-center">Jak to działa?</h2>
        <p className="text-center subtitle">5 prostych kroków do Twojego wymarzonego kota</p>
        
        <div className="steps">
          {steps.map((step, index) => (
            <div key={index} className="step">
              <div className="step-icon">{step.icon}</div>
              <div className="step-number">{index + 1}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .how-it-works {
          padding: 80px 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }
        .subtitle {
          color: rgba(255,255,255,0.9);
          font-size: 18px;
          margin-bottom: 60px;
        }
        .steps {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 30px;
        }
        .step {
          text-align: center;
          position: relative;
        }
        .step-icon {
          font-size: 64px;
          margin-bottom: 20px;
        }
        .step-number {
          position: absolute;
          top: -10px;
          right: 40%;
          width: 30px;
          height: 30px;
          background: rgba(255,255,255,0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
        }
        .step h3 {
          font-size: 20px;
          margin: 16px 0 8px 0;
        }
        .step p {
          color: rgba(255,255,255,0.8);
          font-size: 14px;
        }
        @media (max-width: 768px) {
          .steps {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
