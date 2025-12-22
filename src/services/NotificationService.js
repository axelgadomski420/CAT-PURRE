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
