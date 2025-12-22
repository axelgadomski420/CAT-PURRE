class AuctionService {
  // 🔨 Utwórz aukcję
  async createAuction(catId, startingPrice, duration, reservePrice) {
    const response = await fetch('/api/auctions/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        catId,
        startingPrice,
        duration,
        reservePrice,
        type: 'english', // english, dutch, silent
        autoExtend: true // przedłuż jeśli licytacja w ostatnich 5 min
      })
    });
    return response.json();
  }

  // 💰 Złóż ofertę
  async placeBid(auctionId, amount) {
    const response = await fetch('/api/auctions/bid', {
      method: 'POST',
      body: JSON.stringify({ auctionId, amount })
    });
    return response.json();
  }

  // 🤖 Auto-bidding (proxy bid)
  async setAutoBid(auctionId, maxAmount) {
    const response = await fetch('/api/auctions/auto-bid', {
      method: 'POST',
      body: JSON.stringify({ auctionId, maxAmount })
    });
    return response.json();
  }

  // 📊 Historia licytacji
  async getBidHistory(auctionId) {
    const response = await fetch(`/api/auctions/${auctionId}/history`);
    return response.json();
  }

  // ⏰ Aktywne aukcje
  async getActiveAuctions(filters = {}) {
    const params = new URLSearchParams(filters);
    const response = await fetch(`/api/auctions/active?${params}`);
    return response.json();
  }

  // 🔔 Obserwuj aukcję
  async watchAuction(auctionId) {
    const response = await fetch(`/api/auctions/${auctionId}/watch`, {
      method: 'POST'
    });
    return response.json();
  }

  // 🎯 Snipe bid (ostatnia sekunda)
  async scheduleSniperBid(auctionId, amount, timing) {
    const response = await fetch('/api/auctions/sniper', {
      method: 'POST',
      body: JSON.stringify({ auctionId, amount, timing })
    });
    return response.json();
  }
}

export default new AuctionService();
