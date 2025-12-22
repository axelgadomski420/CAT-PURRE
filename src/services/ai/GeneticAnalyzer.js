import { getModel } from '../../config/gemini.config';

class GeneticAnalyzer {
  constructor() {
    this.model = getModel('PRO');
  }

  // 🧬 Analiza kompatybilności genetycznej
  async analyzeBreedingCompatibility(cat1Data, cat2Data) {
    const prompt = `Jesteś genetykiem kotów. Przeanalizuj kompatybilność hodowlaną:

KOT 1: ${JSON.stringify(cat1Data)}
KOT 2: ${JSON.stringify(cat2Data)}

Zwróć JSON:
{
  "compatibilityScore": 85,
  "inbreedingRisk": "niskie/średnie/wysokie",
  "expectedOffspring": {
    "colors": ["kolor1", "kolor2"],
    "patterns": ["wzór1"],
    "healthRisks": ["ryzyko1"]
  },
  "recommendations": ["zalecenie1", "zalecenie2"],
  "geneticDiversity": 92
}`;

    const result = await this.model.generateContent(prompt);
    return this.parseJSON(result.response.text());
  }

  // 🎨 Przewidywanie kolorów potomstwa
  async predictOffspringColors(parent1, parent2) {
    const prompt = `Przewidnij kolory kociąt na podstawie genetyki rodziców:
RODZIC 1: ${parent1.color}, ${parent1.genetics}
RODZIC 2: ${parent2.color}, ${parent2.genetics}

Zwróć JSON z prawdopodobieństwami kolorów.`;

    const result = await this.model.generateContent(prompt);
    return this.parseJSON(result.response.text());
  }

  // 🏥 Analiza ryzyka zdrowotnego
  async analyzeHealthRisks(pedigreeData) {
    const prompt = `Przeanalizuj ryzyko chorób genetycznych na podstawie rodowodu:
${JSON.stringify(pedigreeData)}

Zwróć JSON z oceną ryzyka i zaleceniami testów.`;

    const result = await this.model.generateContent(prompt);
    return this.parseJSON(result.response.text());
  }

  // 📊 Współczynnik inbreeding
  async calculateInbreedingCoefficient(pedigree) {
    // Algorytm Wrighta do obliczenia współczynnika inbreeding
    // Simplified version
    let coefficient = 0;
    
    // Check for common ancestors in 5 generations
    const ancestors = this.extractAncestors(pedigree, 5);
    const duplicates = this.findDuplicateAncestors(ancestors);
    
    coefficient = (duplicates.length / ancestors.length) * 100;
    
    return {
      coefficient: coefficient.toFixed(2),
      risk: coefficient < 5 ? 'niskie' : coefficient < 10 ? 'średnie' : 'wysokie',
      recommendations: coefficient > 10 ? ['Unikaj dalszego inbreeding'] : ['Bezpieczny poziom']
    };
  }

  // Helper methods
  extractAncestors(pedigree, generations) {
    // Extract all ancestors up to N generations
    return [];
  }

  findDuplicateAncestors(ancestors) {
    // Find common ancestors
    return [];
  }

  parseJSON(text) {
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      return jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(text);
    } catch (error) {
      console.error('JSON parse error:', error);
      return null;
    }
  }
}

export default new GeneticAnalyzer();
