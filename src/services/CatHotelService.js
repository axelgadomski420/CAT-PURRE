class CatHotelService {
  // 🏨 Znajdź hotel dla kota
  async findHotels(location, dates, catRequirements) {
    const response = await fetch('/api/cat-hotels/search', {
      method: 'POST',
      body: JSON.stringify({ location, dates, catRequirements })
    });
    return response.json();
  }

  // 📅 Zarezerwuj pobyt
  async bookHotel(hotelId, catId, checkIn, checkOut, services) {
    const response = await fetch('/api/cat-hotels/book', {
      method: 'POST',
      body: JSON.stringify({
        hotelId,
        catId,
        checkIn,
        checkOut,
        services // grooming, play_time, medication, etc.
      })
    });
    return response.json();
  }

  // 📹 Live camera access
  async getHotelCamera(bookingId) {
    const response = await fetch(`/api/cat-hotels/camera/${bookingId}`);
    return response.json();
  }

  // 📊 Daily reports
  async getDailyReport(bookingId, date) {
    const response = await fetch(`/api/cat-hotels/reports/${bookingId}?date=${date}`);
    return response.json();
  }
}

export default new CatHotelService();
