class InsuranceService {
  // 🛡️ Wycena ubezpieczenia
  async getInsuranceQuote(catData) {
    const response = await fetch('/api/insurance/quote', {
      method: 'POST',
      body: JSON.stringify(catData)
    });
    return response.json();
  }

  // 📋 Dostępne pakiety
  async getInsurancePlans(breed) {
    const response = await fetch(`/api/insurance/plans?breed=${breed}`);
    return response.json();
  }

  // ✍️ Wykup polisę
  async purchaseInsurance(planId, catId, ownerData) {
    const response = await fetch('/api/insurance/purchase', {
      method: 'POST',
      body: JSON.stringify({ planId, catId, ownerData })
    });
    return response.json();
  }

  // 🏥 Zgłoś szkodę
  async fileClaim(policyId, claimData) {
    const response = await fetch('/api/insurance/claims', {
      method: 'POST',
      body: JSON.stringify({ policyId, ...claimData })
    });
    return response.json();
  }
}

export default new InsuranceService();
