import axios from 'axios';

class ReservationService {
  // 📅 Rezerwacja kota
  async reserveCat(catId, visitDate, depositAmount) {
    const response = await axios.post('/api/reservations/create', {
      catId,
      visitDate,
      depositAmount,
      status: 'pending'
    });
    return response.data;
  }

  // 📆 Dostępne terminy wizyt
  async getAvailableSlots(breederId, date) {
    const response = await axios.get(`/api/reservations/slots/${breederId}`, {
      params: { date }
    });
    return response.data;
  }

  // ✅ Potwierdzenie rezerwacji
  async confirmReservation(reservationId) {
    const response = await axios.put(`/api/reservations/${reservationId}/confirm`);
    return response.data;
  }

  // ❌ Anulowanie rezerwacji
  async cancelReservation(reservationId, reason) {
    const response = await axios.put(`/api/reservations/${reservationId}/cancel`, {
      reason
    });
    return response.data;
  }

  // 🔔 Przypomnienia
  async setReminder(reservationId, reminderTime) {
    const response = await axios.post(`/api/reservations/${reservationId}/reminder`, {
      reminderTime
    });
    return response.data;
  }

  // 🗓️ Google Calendar Integration
  async addToGoogleCalendar(reservationId) {
    const response = await axios.post(`/api/reservations/${reservationId}/add-to-calendar`);
    return response.data;
  }
}

export default new ReservationService();
