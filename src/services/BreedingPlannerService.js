class BreedingPlannerService {
  // 📅 Zaplanuj miot
  async planLitter(maleId, femaleId, plannedDate) {
    const response = await fetch('/api/breeding/plan', {
      method: 'POST',
      body: JSON.stringify({ maleId, femaleId, plannedDate })
    });
    return response.json();
  }

  // 🧬 Sprawdź kompatybilność
  async checkCompatibility(cat1Id, cat2Id) {
    const response = await fetch('/api/breeding/compatibility', {
      method: 'POST',
      body: JSON.stringify({ cat1Id, cat2Id })
    });
    return response.json();
  }

  // 🎨 Przewiduj kolory kociąt
  async predictOffspring(parent1, parent2) {
    const response = await fetch('/api/breeding/predict', {
      method: 'POST',
      body: JSON.stringify({ parent1, parent2 })
    });
    return response.json();
  }

  // 📊 Heat cycle tracker
  async trackHeatCycle(catId, cycleData) {
    const response = await fetch('/api/breeding/heat-cycle', {
      method: 'POST',
      body: JSON.stringify({ catId, ...cycleData })
    });
    return response.json();
  }

  // 🤰 Pregnancy tracker
  async trackPregnancy(catId, matingDate) {
    const response = await fetch('/api/breeding/pregnancy', {
      method: 'POST',
      body: JSON.stringify({ catId, matingDate })
    });
    return response.json();
  }

  // 👶 Kitten development tracker
  async trackKittenDevelopment(litterId, kittenData) {
    const response = await fetch('/api/breeding/kittens', {
      method: 'POST',
      body: JSON.stringify({ litterId, kittenData })
    });
    return response.json();
  }

  // 📋 Lista rezerwacji na kocięta
  async getWaitingList(breederId, breed) {
    const response = await fetch(`/api/breeding/waiting-list?breeder=${breederId}&breed=${breed}`);
    return response.json();
  }

  // 🎯 Matching service dla kocich par
  async findBreedingPartner(catId, preferences) {
    const response = await fetch('/api/breeding/match', {
      method: 'POST',
      body: JSON.stringify({ catId, preferences })
    });
    return response.json();
  }
}

export default new BreedingPlannerService();
