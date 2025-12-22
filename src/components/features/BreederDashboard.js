import React, { useState } from 'react';

export default function BreederDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', icon: '📊', label: 'Przegląd' },
    { id: 'cats', icon: '🐱', label: 'Moje koty' },
    { id: 'litters', icon: '👶', label: 'Mioty' },
    { id: 'messages', icon: '💬', label: 'Wiadomości' },
    { id: 'analytics', icon: '📈', label: 'Statystyki' },
    { id: 'contracts', icon: '📄', label: 'Umowy' },
    { id: 'payments', icon: '💰', label: 'Płatności' },
    { id: 'settings', icon: '⚙️', label: 'Ustawienia' }
  ];

  return (
    <div className="breeder-dashboard">
      <aside className="dashboard-sidebar">
        <div className="breeder-profile">
          <div className="avatar">🏠</div>
          <h3>Golden British</h3>
          <span className="verified">✓ Zweryfikowany</span>
        </div>

        <nav className="dashboard-nav">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="icon">{tab.icon}</span>
              <span className="label">{tab.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      <main className="dashboard-content">
        {activeTab === 'overview' && <DashboardOverview />}
        {activeTab === 'cats' && <MyCats />}
        {activeTab === 'litters' && <Litters />}
        {activeTab === 'messages' && <Messages />}
        {activeTab === 'analytics' && <Analytics />}
        {activeTab === 'contracts' && <Contracts />}
        {activeTab === 'payments' && <Payments />}
        {activeTab === 'settings' && <Settings />}
      </main>
    </div>
  );
}

function DashboardOverview() {
  return (
    <div className="overview">
      <h2>📊 Przegląd</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🐱</div>
          <div className="stat-value">12</div>
          <div className="stat-label">Aktywne ogłoszenia</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👁️</div>
          <div className="stat-value">1,234</div>
          <div className="stat-label">Wyświetlenia (30 dni)</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💬</div>
          <div className="stat-value">45</div>
          <div className="stat-label">Nowe wiadomości</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-value">24,500 PLN</div>
          <div className="stat-label">Przychód (30 dni)</div>
        </div>
      </div>

      <div className="recent-activity">
        <h3>Ostatnia aktywność</h3>
        {/* Lista aktywności */}
      </div>
    </div>
  );
}

function MyCats() {
  return <div>Moje koty - lista</div>;
}

function Litters() {
  return <div>Mioty - zarządzanie</div>;
}

function Messages() {
  return <div>Wiadomości - inbox</div>;
}

function Analytics() {
  return <div>Analityka - wykresy</div>;
}

function Contracts() {
  return <div>Umowy - lista i generowanie</div>;
}

function Payments() {
  return <div>Płatności - historia</div>;
}

function Settings() {
  return <div>Ustawienia - profil hodowcy</div>;
}
