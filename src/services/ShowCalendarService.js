class ShowCalendarService {
  // 📅 Lista wystaw kotów
  async getUpcomingShows(country = 'PL') {
    const response = await fetch(`/api/shows/upcoming?country=${country}`);
    return response.json();
  }

  // 🏆 Zarejestruj kota na wystawę
  async registerForShow(showId, catId) {
    const response = await fetch('/api/shows/register', {
      method: 'POST',
      body: JSON.stringify({ showId, catId })
    });
    return response.json();
  }

  // 🎖️ Wyniki wystaw
  async getShowResults(showId) {
    const response = await fetch(`/api/shows/results/${showId}`);
    return response.json();
  }

  // 📊 Rankingi kotów
  async getCatRankings(breed, organization = 'FIFe') {
    const response = await fetch(`/api/shows/rankings?breed=${breed}&org=${organization}`);
    return response.json();
  }

  // 🔔 Powiadomienia o wystawach
  async subscribeToShowNotifications(preferences) {
    const response = await fetch('/api/shows/subscribe', {
      method: 'POST',
      body: JSON.stringify(preferences)
    });
    return response.json();
  }
}

export default new ShowCalendarService();
