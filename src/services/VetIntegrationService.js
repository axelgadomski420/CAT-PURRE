class VetIntegrationService {
  // 🏥 Znajdź weterynarza
  async findNearbyVets(location, specialization) {
    const response = await fetch(`/api/vets/nearby?location=${location}&spec=${specialization}`);
    return response.json();
  }

  // 📅 Umów wizytę
  async bookVetAppointment(vetId, date, catId) {
    const response = await fetch('/api/vets/appointments', {
      method: 'POST',
      body: JSON.stringify({ vetId, date, catId })
    });
    return response.json();
  }

  // 💊 E-recepta
  async getPrescription(appointmentId) {
    const response = await fetch(`/api/vets/prescriptions/${appointmentId}`);
    return response.json();
  }

  // 📞 Telemedycyna z weterynarzem
  async startTeleVetConsultation(catId, symptoms) {
    const response = await fetch('/api/vets/tele-consultation', {
      method: 'POST',
      body: JSON.stringify({ catId, symptoms })
    });
    return response.json();
  }

  // 📊 Udostępnij karty zdrowia
  async shareHealthRecords(catId, vetId) {
    const response = await fetch('/api/vets/share-records', {
      method: 'POST',
      body: JSON.stringify({ catId, vetId })
    });
    return response.json();
  }
}

export default new VetIntegrationService();
