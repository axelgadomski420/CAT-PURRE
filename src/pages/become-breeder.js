import React, { useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/ui/Navbar';
import { useAuth } from '../context/AuthContext';

export default function BecomeBreederPage() {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    catteryName: '',
    organizations: [
      {
        name: 'FPL',
        registrationNumber: '',
        registrationDate: '',
        expiryDate: ''
      }
    ],
    location: {
      address: '',
      city: '',
      postalCode: '',
      coordinates: { lat: null, lng: null }
    },
    breeds: []
  });

  const organizations = [
    { id: 'FPL', name: 'FPL - Felinological Association of Poland', example: 'FPL-2024-1234' },
    { id: 'TICA', name: 'TICA - The International Cat Association', example: 'TICA-PL-5678' },
    { id: 'WCF', name: 'WCF - World Cat Federation', example: 'WCF-PL-9012' },
    { id: 'FIFe', name: 'FIFe - Fédération Internationale Féline', example: 'FIFE-PL-3456' }
  ];

  const submitVerification = async () => {
    try {
      const response = await fetch(\`\${process.env.NEXT_PUBLIC_API_URL}/api/verification/submit\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          user: user.id
        })
      });

      const data = await response.json();
      
      if (data.success) {
        alert(\`✅ \${data.message}\`);
        if (data.verification.overallStatus === 'verified') {
          window.location.href = '/dashboard/breeder';
        }
      }
    } catch (error) {
      alert('❌ Błąd podczas weryfikacji');
    }
  };

  const addOrganization = () => {
    setFormData({
      ...formData,
      organizations: [
        ...formData.organizations,
        { name: '', registrationNumber: '', registrationDate: '', expiryDate: '' }
      ]
    });
  };

  return (
    <>
      <Head>
        <title>Zostań Hodowcą - CAT PURRE</title>
      </Head>

      <Navbar />

      <div className="become-breeder-page">
        <div className="container">
          <div className="header">
            <h1>🏠 Zostań Zweryfikowanym Hodowcą</h1>
            <p>Dołącz do społeczności profesjonalnych hodowców kotów rasowych</p>
          </div>

          <div className="verification-process">
            <div className="process-steps">
              <div className={\`process-step \${step >= 1 ? 'active' : ''}\`}>
                <span className="step-num">1</span>
                <span className="step-label">Dane hodowli</span>
              </div>
              <div className={\`process-step \${step >= 2 ? 'active' : ''}\`}>
                <span className="step-num">2</span>
                <span className="step-label">Rejestracja w organizacji</span>
              </div>
              <div className={\`process-step \${step >= 3 ? 'active' : ''}\`}>
                <span className="step-num">3</span>
                <span className="step-label">Dokumenty</span>
              </div>
              <div className={\`process-step \${step >= 4 ? 'active' : ''}\`}>
                <span className="step-num">4</span>
                <span className="step-label">Weryfikacja AI</span>
              </div>
            </div>

            <div className="form-container">
              {step === 1 && (
                <div className="form-step">
                  <h2>📝 Informacje o hodowli</h2>
                  
                  <div className="form-group">
                    <label>Nazwa hodowli *</label>
                    <input
                      type="text"
                      placeholder="Golden British Cattery"
                      value={formData.catteryName}
                      onChange={(e) => setFormData({...formData, catteryName: e.target.value})}
                    />
                  </div>

                  <div className="form-group">
                    <label>Adres</label>
                    <input
                      type="text"
                      placeholder="ul. Marszałkowska 123"
                      value={formData.location.address}
                      onChange={(e) => setFormData({
                        ...formData,
                        location: {...formData.location, address: e.target.value}
                      })}
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Miasto *</label>
                      <input
                        type="text"
                        placeholder="Warszawa"
                        value={formData.location.city}
                        onChange={(e) => setFormData({
                          ...formData,
                          location: {...formData.location, city: e.target.value}
                        })}
                      />
                    </div>

                    <div className="form-group">
                      <label>Kod pocztowy</label>
                      <input
                        type="text"
                        placeholder="00-001"
                        value={formData.location.postalCode}
                        onChange={(e) => setFormData({
                          ...formData,
                          location: {...formData.location, postalCode: e.target.value}
                        })}
                      />
                    </div>
                  </div>

                  <button className="btn btn-primary btn-lg" onClick={() => setStep(2)}>
                    Dalej →
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="form-step">
                  <h2>🏆 Rejestracja w organizacjach felinologicznych</h2>
                  <p className="info-text">
                    ✅ Wymagana przynajmniej jedna rejestracja w: FPL, TICA, WCF lub FIFe
                  </p>

                  {formData.organizations.map((org, idx) => (
                    <div key={idx} className="organization-card">
                      <h4>Organizacja #{idx + 1}</h4>
                      
                      <div className="form-group">
                        <label>Wybierz organizację *</label>
                        <select 
                          value={org.name}
                          onChange={(e) => {
                            const newOrgs = [...formData.organizations];
                            newOrgs[idx].name = e.target.value;
                            setFormData({...formData, organizations: newOrgs});
                          }}
                        >
                          <option value="">-- Wybierz --</option>
                          {organizations.map(o => (
                            <option key={o.id} value={o.id}>{o.name}</option>
                          ))}
                        </select>
                        {org.name && (
                          <p className="hint">
                            Format przykładowy: {organizations.find(o => o.id === org.name)?.example}
                          </p>
                        )}
                      </div>

                      <div className="form-group">
                        <label>Numer rejestracji *</label>
                        <input
                          type="text"
                          placeholder={org.name ? organizations.find(o => o.id === org.name)?.example : ''}
                          value={org.registrationNumber}
                          onChange={(e) => {
                            const newOrgs = [...formData.organizations];
                            newOrgs[idx].registrationNumber = e.target.value;
                            setFormData({...formData, organizations: newOrgs});
                          }}
                        />
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label>Data rejestracji</label>
                          <input
                            type="date"
                            value={org.registrationDate}
                            onChange={(e) => {
                              const newOrgs = [...formData.organizations];
                              newOrgs[idx].registrationDate = e.target.value;
                              setFormData({...formData, organizations: newOrgs});
                            }}
                          />
                        </div>

                        <div className="form-group">
                          <label>Data ważności</label>
                          <input
                            type="date"
                            value={org.expiryDate}
                            onChange={(e) => {
                              const newOrgs = [...formData.organizations];
                              newOrgs[idx].expiryDate = e.target.value;
                              setFormData({...formData, organizations: newOrgs});
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  <button className="btn btn-outline" onClick={addOrganization}>
                    + Dodaj kolejną organizację
                  </button>

                  <div className="form-actions">
                    <button className="btn btn-outline" onClick={() => setStep(1)}>
                      ← Wstecz
                    </button>
                    <button className="btn btn-primary btn-lg" onClick={() => setStep(3)}>
                      Dalej →
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="form-step">
                  <h2>📄 Dokumenty</h2>
                  <p className="info-text">
                    Prześlij dokumenty potwierdzające rejestrację w organizacji felinologicznej
                  </p>

                  <div className="upload-area">
                    <div className="upload-icon">📎</div>
                    <h4>Przeciągnij dokumenty tutaj</h4>
                    <p>lub kliknij aby wybrać pliki</p>
                    <input type="file" multiple accept=".pdf,.jpg,.jpeg,.png" />
                    <p className="hint">PDF, JPG lub PNG (max 5MB każdy)</p>
                  </div>

                  <div className="required-docs">
                    <h4>Wymagane dokumenty:</h4>
                    <ul>
                      <li>✓ Certyfikat rejestracji hodowli</li>
                      <li>✓ Dowód osobisty właściciela</li>
                      <li>✓ Rodowody kotów (opcjonalnie)</li>
                      <li>✓ Zaświadczenie weterynaryjne (opcjonalnie)</li>
                    </ul>
                  </div>

                  <div className="form-actions">
                    <button className="btn btn-outline" onClick={() => setStep(2)}>
                      ← Wstecz
                    </button>
                    <button className="btn btn-primary btn-lg" onClick={() => setStep(4)}>
                      Wyślij do weryfikacji
                    </button>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="form-step verification-step">
                  <h2>🤖 Weryfikacja AI w toku...</h2>
                  
                  <div className="verification-progress">
                    <div className="verification-item done">
                      <span className="icon">✓</span>
                      <span>Sprawdzanie formatu numerów rejestracji</span>
                    </div>
                    <div className="verification-item done">
                      <span className="icon">✓</span>
                      <span>Weryfikacja w bazach FPL/TICA/WCF/FIFe</span>
                    </div>
                    <div className="verification-item loading">
                      <span className="icon">⏳</span>
                      <span>Analiza dokumentów przez AI</span>
                    </div>
                    <div className="verification-item">
                      <span className="icon">○</span>
                      <span>Finalna weryfikacja</span>
                    </div>
                  </div>

                  <button className="btn btn-primary btn-lg" onClick={submitVerification}>
                    Zakończ weryfikację
                  </button>
                </div>
              )}
            </div>

            <aside className="info-sidebar">
              <div className="info-card">
                <h3>✨ Korzyści z weryfikacji</h3>
                <ul>
                  <li>✓ Odznaka zweryfikowanego hodowcy</li>
                  <li>✓ Wyższe pozycje w wynikach</li>
                  <li>✓ Większe zaufanie klientów</li>
                  <li>✓ Dostęp do premium features</li>
                  <li>✓ Mapa hodowli</li>
                </ul>
              </div>

              <div className="info-card">
                <h3>🏆 Wspierane organizacje</h3>
                <ul>
                  <li>🇵🇱 FPL - Polska</li>
                  <li>🌍 TICA - Międzynarodowa</li>
                  <li>🌎 WCF - Światowa</li>
                  <li>🇪🇺 FIFe - Europejska</li>
                </ul>
              </div>

              <div className="info-card">
                <h3>❓ FAQ</h3>
                <details>
                  <summary>Ile trwa weryfikacja?</summary>
                  <p>AI weryfikuje w ciągu 5 minut. Jeśli potrzebna jest manualna weryfikacja - do 24h.</p>
                </details>
                <details>
                  <summary>Co jeśli nie mam certyfikatu?</summary>
                  <p>Musisz najpierw zarejestrować hodowlę w FPL, TICA, WCF lub FIFe.</p>
                </details>
              </div>
            </aside>
          </div>
        </div>
      </div>

      <style jsx>{`
        .become-breeder-page {
          min-height: 100vh;
          padding: 40px 0;
          background: var(--gray-50);
        }
        .header {
          text-align: center;
          margin-bottom: 60px;
        }
        .header h1 {
          font-size: 48px;
          margin-bottom: 16px;
        }
        .verification-process {
          display: grid;
          grid-template-columns: 1fr 350px;
          gap: 30px;
        }
        .process-steps {
          grid-column: 1 / -1;
          display: flex;
          justify-content: space-between;
          margin-bottom: 40px;
          padding: 0 50px;
        }
        .process-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          opacity: 0.4;
        }
        .process-step.active {
          opacity: 1;
        }
        .step-num {
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
        .process-step.active .step-num {
          background: var(--gradient-primary);
        }
        .form-container {
          background: white;
          padding: 40px;
          border-radius: 30px;
          box-shadow: var(--shadow-lg);
        }
        .form-step h2 {
          margin: 0 0 24px 0;
        }
        .info-text {
          background: #E3F2FD;
          padding: 16px;
          border-radius: 12px;
          margin-bottom: 24px;
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .form-actions {
          display: flex;
          gap: 16px;
          margin-top: 30px;
        }
        .organization-card {
          background: var(--gray-50);
          padding: 24px;
          border-radius: 16px;
          margin-bottom: 20px;
        }
        .organization-card h4 {
          margin: 0 0 16px 0;
        }
        .hint {
          margin-top: 8px;
          font-size: 13px;
          color: var(--gray-600);
        }
        .upload-area {
          border: 3px dashed var(--gray-300);
          border-radius: 20px;
          padding: 60px;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s;
          position: relative;
          margin-bottom: 30px;
        }
        .upload-area:hover {
          border-color: var(--primary);
          background: #FFF5F8;
        }
        .upload-area input[type="file"] {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          cursor: pointer;
        }
        .upload-icon {
          font-size: 64px;
          margin-bottom: 16px;
        }
        .required-docs {
          background: var(--gray-50);
          padding: 24px;
          border-radius: 16px;
        }
        .required-docs ul {
          margin: 12px 0 0 0;
          padding-left: 20px;
        }
        .required-docs li {
          margin-bottom: 8px;
        }
        .verification-progress {
          margin: 40px 0;
        }
        .verification-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px;
          background: var(--gray-50);
          border-radius: 12px;
          margin-bottom: 12px;
        }
        .verification-item.done {
          background: #E8F5E9;
        }
        .verification-item.loading {
          background: #FFF4E6;
        }
        .verification-item .icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
        }
        .info-sidebar {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .info-card {
          background: white;
          padding: 24px;
          border-radius: 20px;
          box-shadow: var(--shadow-md);
        }
        .info-card h3 {
          margin: 0 0 16px 0;
        }
        .info-card ul {
          margin: 0;
          padding-left: 20px;
        }
        .info-card li {
          margin-bottom: 8px;
        }
        details {
          margin-bottom: 12px;
        }
        summary {
          cursor: pointer;
          font-weight: 600;
          padding: 8px 0;
        }
        details p {
          padding-left: 16px;
          margin: 8px 0 0 0;
          color: var(--gray-600);
          font-size: 14px;
        }
        @media (max-width: 768px) {
          .verification-process {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
