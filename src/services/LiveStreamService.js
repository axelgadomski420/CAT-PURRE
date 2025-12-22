class LiveStreamService {
  // 📡 Rozpocznij live stream
  async startLiveStream(breederId, title) {
    const response = await fetch('/api/streams/start', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ breederId, title })
    });
    return response.json();
  }

  // 👁️ Dołącz do stream
  async joinLiveStream(streamId) {
    const response = await fetch(`/api/streams/join/${streamId}`);
    return response.json();
  }

  // 💬 Chat podczas stream
  async sendChatMessage(streamId, message) {
    const response = await fetch(`/api/streams/${streamId}/chat`, {
      method: 'POST',
      body: JSON.stringify({ message })
    });
    return response.json();
  }

  // 🎁 Wyślij tip podczas stream
  async sendTip(streamId, amount) {
    const response = await fetch(`/api/streams/${streamId}/tip`, {
      method: 'POST',
      body: JSON.stringify({ amount })
    });
    return response.json();
  }

  // 📊 Statystyki stream
  async getStreamStats(streamId) {
    const response = await fetch(`/api/streams/${streamId}/stats`);
    return response.json();
  }

  // 📹 Zapisz stream (VOD)
  async saveStreamRecording(streamId) {
    const response = await fetch(`/api/streams/${streamId}/save`, {
      method: 'POST'
    });
    return response.json();
  }
}

export default new LiveStreamService();
