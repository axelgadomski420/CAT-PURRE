import React, { useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/ui/Navbar';
import { useAuth } from '../context/AuthContext';

export default function UberPetsPage() {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [booking, setBooking] = useState({
    pickupAddress: '',
    dropoffAddress: '',
    catName: '',
    catWeight: '',
    carrier: 'own', // 'own' or 'provide'
    vetVisit: false,
    notes: ''
  });
  const [quote, setQuote] = useState(null);

  const getQuote = async () => {
    // Call Uber API or mock
    const mockQuote = {
      distance: 5.2,
      duration: 15,
      price: 45,
      petFee: 10,
      total: 55,
      estimatedArrival: '5-8 min'
    };
    setQuote(mockQuote);
    setStep(3);
  };

  const confirmBooking = async () => {
    alert('Rezerwacja wysłana! Kierowca będzie za ' + quote.estimatedArrival);
    
    // Call Uber API
    try {
      const response = await fetch(\`\${process.env.NEXT_PUBLIC_API_URL}/api/uber/book\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...booking,
          userId: user?.id
        })
      });

      const data = await response.json();
      // Track ride
    } catch (error) {
      console.error('Booking error:', error);
    }
  };

  return (
    <>
      <Head>
        <title>Uber Pets - Transport kota - CAT PURRE</title>
      </Head>

      <Navbar />

      <div className="uber-pets-page">
        <div className="container">
          <div className="uber-header">
            <h1>🚗 Uber Pets</h1>
            <p>Bezpieczny transport dla Twojego kota</p>
          </div>

          <div className="booking-layout">
            <div className="booking-steps">
              <div className={\`step \${step >= 1 ? 'active' : ''}\`}>
                <span className="step-number">1</span>
                <span className="step-label">Trasa</span>
              </div>
              <div className={\`step \${step >= 2 ? 'active' : ''}\`}>
                <span className="step-number">2</span>
                <span className="step-label">Szczegóły</span>
              </div>
              <div className={\`step \${step >= 3 ? 'active' : ''}\`}>
                <span className="step-number">3</span>
                <span className="step-label">Potwierdzenie</span>
              </div>
            </div>

            <div className="booking-form">
              {step === 1 && (
                <div className="form-step">
                  <h2>📍 Gdzie jedziemy?</h2>
                  
                  <div className="form-group">
                    <label>Adres odbioru</label>
                    <input
                      type="text"
                      placeholder="ul. Marszałkowska 123, Warszawa"
                      value={booking.pickupAddress}
                      onChange={(e) => setBooking({...booking, pickupAddress: e.target.value})}
                    />
                    <button className="location-btn">📍 Użyj mojej lokalizacji</button>
                  </div>

                  <div className="form-group">
                    <label>Adres docelowy</label>
                    <input
                      type="text"
                      placeholder="Weterynaria Cat Care, ul. Nowy Świat 45"
                      value={booking.dropoffAddress}
                      onChange={(e) => setBooking({...booking, dropoffAddress: e.target.value})}
                    />
                  </div>

                  <button className="btn btn-primary btn-lg" onClick={() => setStep(2)}>
                    Dalej →
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="form-step">
                  <h2>🐱 Informacje o kocie</h2>
                  
                  <div className="form-group">
                    <label>Imię kota</label>
                    <input
                      type="text"
                      placeholder="Luna"
                      value={booking.catName}
                      onChange={(e) => setBooking({...booking, catName: e.target.value})}
                    />
                  </div>

                  <div className="form-group">
                    <label>Waga (kg)</label>
                    <input
                      type="number"
                      placeholder="4.5"
                      value={booking.catWeight}
                      onChange={(e) => setBooking({...booking, catWeight: e.target.value})}
                    />
                  </div>

                  <div className="form-group">
                    <label>Transporter</label>
                    <select 
                      value={booking.carrier}
                      onChange={(e) => setBooking({...booking, carrier: e.target.value})}
                    >
                      <option value="own">Mam swój transporter</option>
                      <option value="provide">Potrzebuję transportera (+15 PLN)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>
                      <input
                        type="checkbox"
                        checked={booking.vetVisit}
                        onChange={(e) => setBooking({...booking, vetVisit: e.target.checked})}
                      />
                      To wizyta u weterynarza
                    </label>
                  </div>

                  <div className="form-group">
                    <label>Dodatkowe informacje</label>
                    <textarea
                      placeholder="Kot boi się głośnych dźwięków, proszę o cichą jazdę"
                      value={booking.notes}
                      onChange={(e) => setBooking({...booking, notes: e.target.value})}
                    />
                  </div>

                  <div className="form-actions">
                    <button className="btn btn-outline" onClick={() => setStep(1)}>
                      ← Wstecz
                    </button>
                    <button className="btn btn-primary btn-lg" onClick={getQuote}>
                      Zobacz cenę
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && quote && (
                <div className="form-step">
                  <h2>✅ Potwierdzenie</h2>
                  
                  <div className="quote-card">
                    <div className="route-summary">
                      <div className="route-point">
                        <span className="icon">🔵</span>
                        <span>{booking.pickupAddress}</span>
                      </div>
                      <div className="route-line"></div>
                      <div className="route-point">
                        <span className="icon">🔴</span>
                        <span>{booking.dropoffAddress}</span>
                      </div>
                    </div>

                    <div className="quote-details">
                      <div className="detail-row">
                        <span>Odległość</span>
                        <strong>{quote.distance} km</strong>
                      </div>
                      <div className="detail-row">
                        <span>Czas przejazdu</span>
                        <strong>~{quote.duration} min</strong>
                      </div>
                      <div className="detail-row">
                        <span>Cena podstawowa</span>
                        <strong>{quote.price} PLN</strong>
                      </div>
                      <div className="detail-row">
                        <span>Opłata za zwierzę</span>
                        <strong>{quote.petFee} PLN</strong>
                      </div>
                      <div className="detail-row total">
                        <span>RAZEM</span>
                        <strong>{quote.total} PLN</strong>
                      </div>
                    </div>

                    <div className="arrival-info">
                      ⏱️ Kierowca przyjedzie za: <strong>{quote.estimatedArrival}</strong>
                    </div>
                  </div>

                  <div className="driver-requirements">
                    <h4>✨ Gwarancje Uber Pets:</h4>
                    <ul>
                      <li>✓ Kierowcy z doświadczeniem w transporcie zwierząt</li>
                      <li>✓ Czysty, klimatyzowany pojazd</li>
                      <li>✓ Monitoring GPS w czasie rzeczywistym</li>
                      <li>✓ Ubezpieczenie zwierzęcia</li>
                    </ul>
                  </div>

                  <div className="form-actions">
                    <button className="btn btn-outline" onClick={() => setStep(2)}>
                      ← Edytuj
                    </button>
                    <button className="btn btn-primary btn-lg" onClick={confirmBooking}>
                      Potwierdź rezerwację
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="uber-info">
              <div className="info-card">
                <h3>🌟 Dlaczego Uber Pets?</h3>
                <ul>
                  <li>Bezpieczny transport dla zwierząt</li>
                  <li>Doświadczeni kierowcy</li>
                  <li>Tracking w czasie rzeczywistym</li>
                  <li>Ubezpieczenie</li>
                  <li>Przejazdy 24/7</li>
                </ul>
              </div>

              <div className="promo-card">
                <h4>🎁 Promocja!</h4>
                <p>Pierwszy przejazd -50%</p>
                <code>CATPURRE50</code>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .uber-pets-page {
          min-height: 100vh;
          padding: 40px 0;
          background: var(--gray-50);
        }
        .uber-header {
          text-align: center;
          margin-bottom: 50px;
        }
        .uber-header h1 {
          font-size: 56px;
          margin-bottom: 16px;
        }
        .booking-layout {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 30px;
        }
        .booking-steps {
          display: flex;
          justify-content: space-between;
          margin-bottom: 40px;
          padding: 0 50px;
        }
        .step {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          opacity: 0.4;
          transition: all 0.3s;
        }
        .step.active {
          opacity: 1;
        }
        .step-number {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: var(--gray-300);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          font-weight: bold;
        }
        .step.active .step-number {
          background: var(--gradient-primary);
        }
        .step-label {
          font-weight: 600;
        }
        .booking-form {
          background: white;
          padding: 40px;
          border-radius: 30px;
          box-shadow: var(--shadow-lg);
        }
        .form-step h2 {
          margin: 0 0 30px 0;
        }
        .location-btn {
          margin-top: 8px;
          padding: 8px 16px;
          background: var(--gray-100);
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
        }
        .form-actions {
          display: flex;
          gap: 16px;
          margin-top: 30px;
        }
        .quote-card {
          background: var(--gray-50);
          padding: 30px;
          border-radius: 20px;
          margin-bottom: 24px;
        }
        .route-summary {
          margin-bottom: 24px;
        }
        .route-point {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 0;
        }
        .route-point .icon {
          font-size: 20px;
        }
        .route-line {
          width: 2px;
          height: 30px;
          background: var(--gray-300);
          margin-left: 10px;
        }
        .quote-details {
          border-top: 2px solid var(--gray-200);
          padding-top: 20px;
        }
        .detail-row {
          display: flex;
          justify-content: space-between;
          padding: 12px 0;
        }
        .detail-row.total {
          border-top: 2px solid var(--gray-200);
          margin-top: 12px;
          font-size: 20px;
        }
        .arrival-info {
          background: #E8F5E9;
          padding: 16px;
          border-radius: 12px;
          text-align: center;
          margin-top: 20px;
        }
        .driver-requirements {
          background: var(--gray-50);
          padding: 24px;
          border-radius: 20px;
          margin-bottom: 24px;
        }
        .driver-requirements ul {
          margin: 12px 0 0 0;
          padding-left: 20px;
        }
        .driver-requirements li {
          margin-bottom: 8px;
        }
        .uber-info {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .info-card,
        .promo-card {
          background: white;
          padding: 30px;
          border-radius: 20px;
          box-shadow: var(--shadow-md);
        }
        .promo-card {
          background: var(--gradient-primary);
          color: white;
          text-align: center;
        }
        .promo-card code {
          display: block;
          margin-top: 12px;
          padding: 12px;
          background: rgba(255,255,255,0.2);
          border-radius: 12px;
          font-size: 20px;
          font-weight: bold;
          letter-spacing: 2px;
        }
        @media (max-width: 768px) {
          .booking-layout {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
