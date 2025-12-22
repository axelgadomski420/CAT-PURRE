class HealthTrackingService {
  // 💉 Dodaj szczepienie
  async addVaccination(catId, vaccinationData) {
    const response = await fetch('/api/health/vaccinations', {
      method: 'POST',
      body: JSON.stringify({ catId, ...vaccinationData })
    });
    return response.json();
  }

  // 🩺 Dodaj wizytę u weterynarza
  async addVetVisit(catId, visitData) {
    const response = await fetch('/api/health/vet-visits', {
      method: 'POST',
      body: JSON.stringify({ catId, ...visitData })
    });
    return response.json();
  }

  // 📊 Wykres wagi
  async getWeightChart(catId) {
    const response = await fetch(`/api/health/weight-chart/${catId}`);
    return response.json();
  }

  // 🔔 Przypomnienia o szczepieniach
  async setVaccinationReminder(catId, vaccineType, date) {
    const response = await fetch('/api/health/reminders', {
      method: 'POST',
      body: JSON.stringify({ catId, vaccineType, date })
    });
    return response.json();
  }

  // 📝 Historia zdrowotna
  async getHealthHistory(catId) {
    const response = await fetch(`/api/health/history/${catId}`);
    return response.json();
  }

  // 🧬 Wyniki testów genetycznych
  async addGeneticTest(catId, testData) {
    const response = await fetch('/api/health/genetic-tests', {
      method: 'POST',
      body: JSON.stringify({ catId, ...testData })
    });
    return response.json();
  }

  // 📱 Eksport do weterynarza
  async exportHealthRecord(catId, format = 'pdf') {
    const response = await fetch(`/api/health/export/${catId}?format=${format}`);
    return response.blob();
  }
}

export default new HealthTrackingService();
