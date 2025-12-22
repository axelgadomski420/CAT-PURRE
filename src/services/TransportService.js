class TransportService {
  // 🚗 Zamów transport
  async bookTransport(fromAddress, toAddress, catId, date) {
    const response = await fetch('/api/transport/book', {
      method: 'POST',
      body: JSON.stringify({
        fromAddress,
        toAddress,
        catId,
        date,
        serviceType: 'door_to_door', // door_to_door, airport, train_station
        insurance: true
      })
    });
    return response.json();
  }

  // ✈️ Transport międzynarodowy
  async bookInternationalTransport(details) {
    const response = await fetch('/api/transport/international', {
      method: 'POST',
      body: JSON.stringify(details)
    });
    return response.json();
  }

  // 📍 Śledź transport (GPS tracking)
  async trackTransport(transportId) {
    const response = await fetch(`/api/transport/track/${transportId}`);
    return response.json();
  }

  // 💰 Wycena transportu
  async getQuote(fromLocation, toLocation, catDetails) {
    const response = await fetch('/api/transport/quote', {
      method: 'POST',
      body: JSON.stringify({ fromLocation, toLocation, catDetails })
    });
    return response.json();
  }

  // 📋 Dokumenty podróżne
  async getTravelDocuments(catId, destination) {
    const response = await fetch(`/api/transport/documents/${catId}?dest=${destination}`);
    return response.json();
  }
}

export default new TransportService();
