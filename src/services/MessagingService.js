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
