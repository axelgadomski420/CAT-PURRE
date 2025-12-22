class DNATestingService {
  // 🧬 Zamów test DNA
  async orderDNATest(catId, testType) {
    const response = await fetch('/api/dna/order', {
      method: 'POST',
      body: JSON.stringify({
        catId,
        testType, // basic, advanced, full_genome
        tests: ['HCM', 'PKD', 'PRA', 'SMA', 'blood_type']
      })
    });
    return response.json();
  }

  // 📊 Wyniki testów
  async getTestResults(testId) {
    const response = await fetch(`/api/dna/results/${testId}`);
    return response.json();
  }

  // 🎨 Analiza kolorów
  async analyzeColorGenetics(catId) {
    const response = await fetch(`/api/dna/colors/${catId}`);
    return response.json();
  }

  // 👨‍👩‍👧 DNA Matching - znajdź krewnych
  async findRelatives(catId) {
    const response = await fetch(`/api/dna/relatives/${catId}`);
    return response.json();
  }

  // 🌍 Ancestry analysis
  async getAncestryAnalysis(catId) {
    const response = await fetch(`/api/dna/ancestry/${catId}`);
    return response.json();
  }

  // 🏆 Breed purity percentage
  async getBreedPurity(catId) {
    const response = await fetch(`/api/dna/purity/${catId}`);
    return response.json();
  }
}

export default new DNATestingService();
