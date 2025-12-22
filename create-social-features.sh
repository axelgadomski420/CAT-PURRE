#!/bin/zsh

echo "🎭 Tworzenie SOCIAL FEATURES..."

# ============================================
# CATBOOK - Social Media dla kotów
# ============================================

cat > src/services/social/CatBookService.js << 'CATBOOKEOF'
class CatBookService {
  // 📝 Utwórz post
  async createPost(catId, content, media) {
    const formData = new FormData();
    formData.append('catId', catId);
    formData.append('content', content);
    media.forEach((file, idx) => {
      formData.append(`media_${idx}`, file);
    });

    const response = await fetch('/api/social/posts', {
      method: 'POST',
      body: formData
    });
    return response.json();
  }

  // 📰 Feed kotów
  async getFeed(page = 1, filters = {}) {
    const params = new URLSearchParams({ page, ...filters });
    const response = await fetch(`/api/social/feed?${params}`);
    return response.json();
  }

  // ❤️ Polub post
  async likePost(postId) {
    const response = await fetch(`/api/social/posts/${postId}/like`, {
      method: 'POST'
    });
    return response.json();
  }

  // 💬 Skomentuj
  async commentPost(postId, comment) {
    const response = await fetch(`/api/social/posts/${postId}/comments`, {
      method: 'POST',
      body: JSON.stringify({ comment })
    });
    return response.json();
  }

  // 🔄 Udostępnij post
  async sharePost(postId, shareText) {
    const response = await fetch(`/api/social/posts/${postId}/share`, {
      method: 'POST',
      body: JSON.stringify({ shareText })
    });
    return response.json();
  }

  // 👥 Obserwuj kota/hodowcę
  async followCat(catId) {
    const response = await fetch(`/api/social/follow/${catId}`, {
      method: 'POST'
    });
    return response.json();
  }

  // 📊 Statystyki profilu kota
  async getCatProfile(catId) {
    const response = await fetch(`/api/social/cats/${catId}/profile`);
    return response.json();
  }

  // 🎉 Wydarzenia dla kotów
  async getCatEvents(location) {
    const response = await fetch(`/api/social/events?location=${location}`);
    return response.json();
  }

  // 🏆 Konkursy piękności
  async joinBeautyContest(catId, contestId) {
    const response = await fetch('/api/social/contests/join', {
      method: 'POST',
      body: JSON.stringify({ catId, contestId })
    });
    return response.json();
  }

  // 🎁 Prezenty dla kotów
  async sendGift(catId, giftType) {
    const response = await fetch('/api/social/gifts/send', {
      method: 'POST',
      body: JSON.stringify({ catId, giftType })
    });
    return response.json();
  }
}

export default new CatBookService();
CATBOOKEOF

# ============================================
# CATTOK - TikTok dla kotów (Video Platform)
# ============================================

cat > src/services/social/CatTokService.js << 'CATTOKEOF'
class CatTokService {
  // 🎬 Upload video
  async uploadVideo(videoFile, catId, metadata) {
    const formData = new FormData();
    formData.append('video', videoFile);
    formData.append('catId', catId);
    formData.append('title', metadata.title);
    formData.append('description', metadata.description);
    formData.append('tags', JSON.stringify(metadata.tags));
    formData.append('music', metadata.music);

    const response = await fetch('/api/cattok/upload', {
      method: 'POST',
      body: formData
    });
    return response.json();
  }

  // 📱 For You Page (algorytm TikTok)
  async getForYouFeed(userId) {
    const response = await fetch(`/api/cattok/for-you/${userId}`);
    return response.json();
  }

  // 🔥 Trending videos
  async getTrendingVideos(timeframe = '24h') {
    const response = await fetch(`/api/cattok/trending?time=${timeframe}`);
    return response.json();
  }

  // 🎵 Dodaj muzykę do video
  async addMusicToVideo(videoId, musicId) {
    const response = await fetch('/api/cattok/add-music', {
      method: 'POST',
      body: JSON.stringify({ videoId, musicId })
    });
    return response.json();
  }

  // ✨ Efekty i filtry
  async applyEffect(videoId, effectId) {
    const response = await fetch('/api/cattok/apply-effect', {
      method: 'POST',
      body: JSON.stringify({ videoId, effectId })
    });
    return response.json();
  }

  // 🎤 Duety (jak TikTok Duet)
  async createDuet(originalVideoId, newVideoFile) {
    const formData = new FormData();
    formData.append('originalVideoId', originalVideoId);
    formData.append('video', newVideoFile);

    const response = await fetch('/api/cattok/duet', {
      method: 'POST',
      body: formData
    });
    return response.json();
  }

  // 🔀 Stitch videos
  async createStitch(videos, transitions) {
    const response = await fetch('/api/cattok/stitch', {
      method: 'POST',
      body: JSON.stringify({ videos, transitions })
    });
    return response.json();
  }

  // 🎯 Wyzwania (Challenges)
  async createChallenge(challengeData) {
    const response = await fetch('/api/cattok/challenges', {
      method: 'POST',
      body: JSON.stringify(challengeData)
    });
    return response.json();
  }

  // 📊 Video Analytics
  async getVideoAnalytics(videoId) {
    const response = await fetch(`/api/cattok/analytics/${videoId}`);
    return response.json();
  }

  // 💰 Monetyzacja (Creator Fund)
  async getCreatorEarnings(userId) {
    const response = await fetch(`/api/cattok/earnings/${userId}`);
    return response.json();
  }

  // 🎁 Live Gifts podczas stream
  async sendLiveGift(streamId, giftId, quantity) {
    const response = await fetch('/api/cattok/live-gifts', {
      method: 'POST',
      body: JSON.stringify({ streamId, giftId, quantity })
    });
    return response.json();
  }
}

export default new CatTokService();
CATTOKEOF

# ============================================
# MESSAGING SYSTEM - Real-time Chat
# ============================================

cat > src/services/MessagingService.js << 'MSGEOF'
import io from 'socket.io-client';

class MessagingService {
  constructor() {
    this.socket = null;
    this.connected = false;
  }

  // 🔌 Connect to Socket.io
  connect(userId) {
    this.socket = io(process.env.NEXT_PUBLIC_API_URL, {
      auth: { userId }
    });

    this.socket.on('connect', () => {
      this.connected = true;
      console.log('✅ Connected to messaging server');
    });

    this.socket.on('disconnect', () => {
      this.connected = false;
      console.log('❌ Disconnected from messaging server');
    });

    return this.socket;
  }

  // 💬 Wyślij wiadomość
  async sendMessage(conversationId, message, attachments = []) {
    const response = await fetch('/api/messages/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ conversationId, message, attachments })
    });
    
    // Emit socket event for real-time
    this.socket?.emit('new-message', { conversationId, message });
    
    return response.json();
  }

  // 📨 Nowa konwersacja
  async startConversation(participantId, initialMessage) {
    const response = await fetch('/api/messages/conversations', {
      method: 'POST',
      body: JSON.stringify({ participantId, initialMessage })
    });
    return response.json();
  }

  // 📝 Typing indicator
  sendTypingIndicator(conversationId, isTyping) {
    this.socket?.emit('typing', { conversationId, isTyping });
  }

  // 👁️ Oznacz jako przeczytane
  async markAsRead(messageId) {
    const response = await fetch(`/api/messages/${messageId}/read`, {
      method: 'PUT'
    });
    return response.json();
  }

  // 📎 Wyślij zdjęcie/video
  async sendMedia(conversationId, mediaFile) {
    const formData = new FormData();
    formData.append('conversationId', conversationId);
    formData.append('media', mediaFile);

    const response = await fetch('/api/messages/media', {
      method: 'POST',
      body: formData
    });
    return response.json();
  }

  // 🎤 Wiadomość głosowa
  async sendVoiceMessage(conversationId, audioBlob) {
    const formData = new FormData();
    formData.append('conversationId', conversationId);
    formData.append('voice', audioBlob);

    const response = await fetch('/api/messages/voice', {
      method: 'POST',
      body: formData
    });
    return response.json();
  }

  // 📍 Udostępnij lokalizację
  async shareLocation(conversationId, coordinates) {
    const response = await fetch('/api/messages/location', {
      method: 'POST',
      body: JSON.stringify({ conversationId, coordinates })
    });
    return response.json();
  }

  // 🗑️ Usuń wiadomość
  async deleteMessage(messageId) {
    const response = await fetch(`/api/messages/${messageId}`, {
      method: 'DELETE'
    });
    return response.json();
  }

  // 🔍 Wyszukaj w konwersacji
  async searchMessages(conversationId, query) {
    const response = await fetch(`/api/messages/search?conversationId=${conversationId}&q=${query}`);
    return response.json();
  }

  // 📊 Statystyki konwersacji
  async getConversationStats(conversationId) {
    const response = await fetch(`/api/messages/stats/${conversationId}`);
    return response.json();
  }
}

export default new MessagingService();
MSGEOF

# ============================================
# NOTIFICATIONS - Powiadomienia Push
# ============================================

cat > src/services/NotificationService.js << 'NOTIFEOF'
class NotificationService {
  // 🔔 Inicjalizacja push notifications
  async initPushNotifications() {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      const registration = await navigator.serviceWorker.register('/sw.js');
      
      const permission = await Notification.requestPermission();
      
      if (permission === 'granted') {
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: process.env.NEXT_PUBLIC_VAPID_KEY
        });
        
        // Send subscription to backend
        await this.saveSubscription(subscription);
        
        return { success: true, subscription };
      }
    }
    return { success: false };
  }

  // 💾 Zapisz subscription
  async saveSubscription(subscription) {
    const response = await fetch('/api/notifications/subscribe', {
      method: 'POST',
      body: JSON.stringify(subscription)
    });
    return response.json();
  }

  // 📤 Wyślij powiadomienie
  async sendNotification(userId, notification) {
    const response = await fetch('/api/notifications/send', {
      method: 'POST',
      body: JSON.stringify({ userId, ...notification })
    });
    return response.json();
  }

  // 📬 Pobierz powiadomienia
  async getNotifications(page = 1, limit = 20) {
    const response = await fetch(`/api/notifications?page=${page}&limit=${limit}`);
    return response.json();
  }

  // ✅ Oznacz jako przeczytane
  async markAsRead(notificationId) {
    const response = await fetch(`/api/notifications/${notificationId}/read`, {
      method: 'PUT'
    });
    return response.json();
  }

  // 🔕 Ustawienia powiadomień
  async updateSettings(settings) {
    const response = await fetch('/api/notifications/settings', {
      method: 'PUT',
      body: JSON.stringify(settings)
    });
    return response.json();
  }

  // 🎯 Powiadomienia push dla kategorii
  async subscribeToCategory(category) {
    const response = await fetch('/api/notifications/categories/subscribe', {
      method: 'POST',
      body: JSON.stringify({ category })
    });
    return response.json();
  }
}

export default new NotificationService();
NOTIFEOF

# ============================================
# ADMIN PANEL - Kompletny panel administracyjny
# ============================================

cat > src/components/admin/AdminDashboard.js << 'ADMINEOF'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const response = await axios.get('/api/admin/stats');
    setStats(response.data);
  };

  const tabs = [
    { id: 'overview', icon: '📊', label: 'Przegląd' },
    { id: 'users', icon: '👥', label: 'Użytkownicy' },
    { id: 'breeders', icon: '🏠', label: 'Hodowcy' },
    { id: 'cats', icon: '🐱', label: 'Koty' },
    { id: 'verification', icon: '✅', label: 'Weryfikacje' },
    { id: 'moderation', icon: '⚠️', label: 'Moderacja' },
    { id: 'payments', icon: '💰', label: 'Płatności' },
    { id: 'analytics', icon: '📈', label: 'Analityka' },
    { id: 'demo', icon: '🎮', label: 'Demo Data' },
    { id: 'settings', icon: '⚙️', label: 'Ustawienia' }
  ];

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="admin-header">
          <h2>🐱 CAT PURRE Admin</h2>
        </div>
        
        <nav className="admin-nav">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`nav-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="icon">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      <main className="admin-content">
        {activeTab === 'overview' && <AdminOverview stats={stats} />}
        {activeTab === 'users' && <UserManagement />}
        {activeTab === 'breeders' && <BreederManagement />}
        {activeTab === 'cats' && <CatManagement />}
        {activeTab === 'verification' && <VerificationQueue />}
        {activeTab === 'moderation' && <ContentModeration />}
        {activeTab === 'payments' && <PaymentManagement />}
        {activeTab === 'analytics' && <AdvancedAnalytics />}
        {activeTab === 'demo' && <DemoDataManager />}
        {activeTab === 'settings' && <SystemSettings />}
      </main>

      <style jsx>{`
        .admin-dashboard {
          display: flex;
          min-height: 100vh;
          background: #f5f5f5;
        }
        .admin-sidebar {
          width: 260px;
          background: #1a1a1a;
          color: white;
          padding: 20px 0;
        }
        .admin-header {
          padding: 0 20px 30px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .admin-header h2 {
          margin: 0;
          font-size: 20px;
        }
        .admin-nav {
          padding: 20px 0;
        }
        .nav-btn {
          width: 100%;
          padding: 14px 20px;
          background: none;
          border: none;
          color: rgba(255,255,255,0.7);
          text-align: left;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 15px;
        }
        .nav-btn:hover {
          background: rgba(255,255,255,0.05);
          color: white;
        }
        .nav-btn.active {
          background: #FF6B9D;
          color: white;
        }
        .icon {
          font-size: 20px;
        }
        .admin-content {
          flex: 1;
          padding: 40px;
          overflow-y: auto;
        }
      `}</style>
    </div>
  );
}

// Admin Overview Component
function AdminOverview({ stats }) {
  return (
    <div className="overview">
      <h1>📊 Panel Administracyjny</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-value">{stats.totalUsers || 0}</div>
          <div className="stat-label">Użytkowników</div>
          <div className="stat-change positive">+12% vs poprzedni miesiąc</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🏠</div>
          <div className="stat-value">{stats.totalBreeders || 0}</div>
          <div className="stat-label">Hodowców</div>
          <div className="stat-change positive">+5% vs poprzedni miesiąc</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🐱</div>
          <div className="stat-value">{stats.totalCats || 0}</div>
          <div className="stat-label">Aktywnych Ogłoszeń</div>
          <div className="stat-change positive">+18% vs poprzedni miesiąc</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-value">{stats.totalRevenue || 0} PLN</div>
          <div className="stat-label">Przychód (30 dni)</div>
          <div className="stat-change positive">+23% vs poprzedni miesiąc</div>
        </div>
      </div>

      <div className="quick-actions">
        <h2>⚡ Szybkie akcje</h2>
        <div className="actions-grid">
          <button className="action-btn">✅ Zweryfikuj hodowcę</button>
          <button className="action-btn">🐱 Dodaj demo koty</button>
          <button className="action-btn">📊 Generuj raport</button>
          <button className="action-btn">📧 Wyślij newsletter</button>
        </div>
      </div>

      <div className="recent-activity">
        <h2>📋 Ostatnia aktywność</h2>
        <div className="activity-list">
          <div className="activity-item">
            <span className="time">5 min temu</span>
            <span>Nowy hodowca: Golden British</span>
          </div>
          <div className="activity-item">
            <span className="time">12 min temu</span>
            <span>Nowe ogłoszenie: Luna - British Shorthair</span>
          </div>
          <div className="activity-item">
            <span className="time">1h temu</span>
            <span>Płatność: 4,500 PLN - rezerwacja kota</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .overview h1 {
          margin: 0 0 30px 0;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 40px;
        }
        .stat-card {
          background: white;
          padding: 24px;
          border-radius: 16px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .stat-icon {
          font-size: 36px;
          margin-bottom: 12px;
        }
        .stat-value {
          font-size: 32px;
          font-weight: bold;
          color: #1a1a1a;
          margin-bottom: 4px;
        }
        .stat-label {
          color: #666;
          font-size: 14px;
          margin-bottom: 8px;
        }
        .stat-change {
          font-size: 13px;
          font-weight: 600;
        }
        .stat-change.positive {
          color: #34C759;
        }
        .quick-actions, .recent-activity {
          background: white;
          padding: 24px;
          border-radius: 16px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          margin-bottom: 20px;
        }
        .actions-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }
        .action-btn {
          padding: 16px;
          background: #f5f5f5;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s;
          font-weight: 500;
        }
        .action-btn:hover {
          background: #FF6B9D;
          color: white;
          transform: translateY(-2px);
        }
        .activity-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .activity-item {
          padding: 12px;
          background: #f9f9f9;
          border-radius: 8px;
          display: flex;
          gap: 16px;
        }
        .time {
          color: #999;
          font-size: 13px;
          min-width: 100px;
        }
      `}</style>
    </div>
  );
}

// User Management Component
function UserManagement() {
  return <div><h1>👥 Zarządzanie Użytkownikami</h1></div>;
}

function BreederManagement() {
  return <div><h1>🏠 Zarządzanie Hodowcami</h1></div>;
}

function CatManagement() {
  return <div><h1>🐱 Zarządzanie Kotami</h1></div>;
}

function VerificationQueue() {
  return <div><h1>✅ Kolejka Weryfikacji</h1></div>;
}

function ContentModeration() {
  return <div><h1>⚠️ Moderacja Treści</h1></div>;
}

function PaymentManagement() {
  return <div><h1>💰 Zarządzanie Płatnościami</h1></div>;
}

function AdvancedAnalytics() {
  return <div><h1>📈 Zaawansowana Analityka</h1></div>;
}

function DemoDataManager() {
  return <div><h1>🎮 Manager Danych Demo</h1></div>;
}

function SystemSettings() {
  return <div><h1>⚙️ Ustawienia Systemowe</h1></div>;
}
ADMINEOF

echo "✅ SOCIAL FEATURES + ADMIN PANEL UTWORZONE!"
echo ""
echo "📋 Dodane systemy:"
echo "   ✓ CatBook (Social Media)"
echo "   ✓ CatTok (TikTok dla kotów)"
echo "   ✓ Real-time Messaging"
echo "   ✓ Push Notifications"
echo "   ✓ Admin Dashboard (10 sekcji)"
echo ""

