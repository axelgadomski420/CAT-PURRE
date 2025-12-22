import axios from 'axios';

class VideoCallService {
  // 📹 Rozpocznij rozmowę video
  async startVideoCall(breederId, catId) {
    const response = await axios.post('/api/video/start', {
      breederId,
      catId,
      type: 'cat_viewing'
    });
    return response.data; // Zwraca token Agora/Twilio
  }

  // 📞 Dołącz do rozmowy
  async joinVideoCall(callId) {
    const response = await axios.post(`/api/video/join/${callId}`);
    return response.data;
  }

  // 🎥 Nagraj wirtualną wizytę
  async recordVisit(callId) {
    const response = await axios.post(`/api/video/record/${callId}`);
    return response.data;
  }

  // 📊 Statystyki połączenia
  async getCallStats(callId) {
    const response = await axios.get(`/api/video/stats/${callId}`);
    return response.data;
  }

  // ⏱️ Zaplanuj wideo call
  async scheduleVideoCall(breederId, dateTime) {
    const response = await axios.post('/api/video/schedule', {
      breederId,
      dateTime
    });
    return response.data;
  }
}

export default new VideoCallService();
