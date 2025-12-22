import { getModel } from '../../config/gemini.config';

class GeminiService {
  constructor() {
    this.modelPro = getModel('PRO');
    this.modelVision = getModel('VISION');
    this.chatSessions = new Map();
  }

  // ✅ FUNKCJA 1: Rozpoznawanie rasy ze zdjęcia
  async recognizeBreed(imageFile) {
    try {
      const imageData = await this.fileToGenerativePart(imageFile);
      
      const prompt = `Jesteś ekspertem felinologiem. Przeanalizuj zdjęcie i określ:
1. Rasę kota (lub mieszankę)
2. Pewność identyfikacji (0-100%)
3. Charakterystyczne cechy
4. Szacowany wiek
5. Stan sierści i zdrowia (wizualnie)

Odpowiedz TYLKO w formacie JSON:
{
  "breed": "nazwa rasy po polsku",
  "breedEn": "breed name in English",
  "confidence": 85,
  "features": ["cecha1", "cecha2", "cecha3"],
  "estimatedAge": "2-3 lata",
  "healthStatus": "dobry/średni/niepokojący",
  "coatCondition": "ocena sierści",
  "recommendations": ["rada1", "rada2"]
}`;

      const result = await this.modelVision.generateContent([prompt, imageData]);
      const text = result.response.text();
      return this.parseJSON(text);
    } catch (error) {
      console.error('Błąd rozpoznawania rasy:', error);
      throw error;
    }
  }

  // ✅ FUNKCJA 2: Smart Matching - dopasuj kota do klienta
  async matchCatToClient(clientProfile, availableCats) {
    const prompt = `Jesteś AI ekspertem od adopcji kotów. Dopasuj najlepszego kota do klienta.

PROFIL KLIENTA:
${JSON.stringify(clientProfile, null, 2)}

DOSTĘPNE KOTY:
${JSON.stringify(availableCats, null, 2)}

Zwróć top 3 najlepsze dopasowania w JSON:
{
  "matches": [
    {
      "catId": "id",
      "catName": "imię",
      "matchScore": 95,
      "reasons": ["powód1", "powód2"],
      "pros": ["plus1", "plus2"],
      "cons": ["minus1"],
      "recommendation": "szczegółowe uzasadnienie"
    }
  ],
  "summary": "ogólne podsumowanie"
}`;

    const result = await this.modelPro.generateContent(prompt);
    return this.parseJSON(result.response.text());
  }

  // ✅ FUNKCJA 3: Oszacowanie ceny kota
  async estimatePrice(catData) {
    const prompt = `Jesteś ekspertem rynku kotów rasowych w Polsce. Oszacuj wartość rynkową kota.

DANE KOTA:
${JSON.stringify(catData, null, 2)}

Zwróć oszacowanie w JSON:
{
  "estimatedPrice": 5500,
  "priceRange": { "min": 4500, "max": 6500 },
  "currency": "PLN",
  "factors": {
    "positive": ["czynnik podnoszący cenę"],
    "negative": ["czynnik obniżający cenę"]
  },
  "marketPosition": "budżetowy/średni/premium/luksusowy",
  "confidence": 85,
  "explanation": "szczegółowe wyjaśnienie wyceny"
}`;

    const result = await this.modelPro.generateContent(prompt);
    return this.parseJSON(result.response.text());
  }

  // ✅ FUNKCJA 4: Analiza zdrowia ze zdjęcia
  async analyzeHealthFromPhoto(imageFile) {
    const imageData = await this.fileToGenerativePart(imageFile);
    
    const prompt = `Jesteś weterynarzem AI. Oceń wizualny stan zdrowia kota.
WAŻNE: To nie zastępuje wizyty u weterynarza!

Oceń i zwróć JSON:
{
  "overallHealth": "dobry/średni/wymaga uwagi",
  "coat": { "status": "ocena", "notes": "uwagi" },
  "eyes": { "status": "ocena", "notes": "uwagi" },
  "ears": { "status": "ocena", "notes": "uwagi" },
  "bodyCondition": { "status": "ocena", "notes": "uwagi" },
  "alerts": ["potencjalny problem1"],
  "recommendations": ["zalecenie1", "zalecenie2"],
  "vetVisitUrgency": "niska/średnia/wysoka"
}`;

    const result = await this.modelVision.generateContent([prompt, imageData]);
    return this.parseJSON(result.response.text());
  }

  // ✅ FUNKCJA 5: Asystent czat
  async chat(message, sessionId, context = {}) {
    let chat = this.chatSessions.get(sessionId);
    
    if (!chat) {
      const systemPrompt = `Jesteś pomocnym asystentem platformy CAT PURRE - marketplace kotów rasowych.
Pomagasz użytkownikom w:
- Wyborze odpowiedniej rasy
- Znalezieniu hodowcy
- Zrozumieniu procesu zakupu
- Pielęgnacji kotów
- Odpowiadaniu na pytania

Kontekst: ${JSON.stringify(context)}

Odpowiadaj po polsku, profesjonalnie i przyjaźnie. Używaj emoji 🐱 dla atmosfery.`;
      
      chat = this.modelPro.startChat({
        history: [
          { role: 'user', parts: [{ text: systemPrompt }] },
          { role: 'model', parts: [{ text: 'Cześć! 🐱 Jestem asystentem CAT PURRE. W czym mogę Ci pomóc?' }] }
        ]
      });
      
      this.chatSessions.set(sessionId, chat);
    }
    
    const result = await chat.sendMessage(message);
    return result.response.text();
  }

  // ✅ FUNKCJA 6: Generowanie opisów kotów
  async generateCatDescription(catData) {
    const prompt = `Wygeneruj atrakcyjne opisy kota do sprzedaży.

DANE: ${JSON.stringify(catData, null, 2)}

Zwróć JSON:
{
  "shortDescription": "50-100 słów dla karty produktu",
  "fullDescription": "200-300 słów szczegółowy opis",
  "seoTitle": "tytuł SEO (60 znaków)",
  "seoDescription": "meta opis (160 znaków)",
  "highlights": ["punkt1", "punkt2", "punkt3"],
  "tags": ["tag1", "tag2"]
}`;

    const result = await this.modelPro.generateContent(prompt);
    return this.parseJSON(result.response.text());
  }

  // ✅ FUNKCJA 7: Analiza rodowodu
  async analyzePedigree(pedigreeData) {
    const prompt = `Jesteś genetykiem kotów. Przeanalizuj rodowód.

RODOWÓD: ${JSON.stringify(pedigreeData, null, 2)}

Zwróć JSON:
{
  "lineQuality": "wysoka/średnia/niska",
  "inbreedingCoefficient": 5.2,
  "geneticDiversity": "dobra/średnia/niska",
  "strengths": ["siła1", "siła2"],
  "concerns": ["problem1"],
  "breedingRecommendations": ["zalecenie1"]
}`;

    const result = await this.modelPro.generateContent(prompt);
    return this.parseJSON(result.response.text());
  }

  // ✅ FUNKCJA 8: Sugestie poprawy zdjęć
  async suggestPhotoImprovements(imageFile) {
    const imageData = await this.fileToGenerativePart(imageFile);
    
    const prompt = `Jesteś fotografem zwierząt. Oceń zdjęcie i zasugeruj poprawki.

Zwróć JSON:
{
  "overallScore": 75,
  "composition": "ocena i rada",
  "lighting": "ocena i rada",
  "focus": "ocena i rada",
  "background": "ocena i rada",
  "catPresentation": "jak kot wygląda na zdjęciu",
  "improvements": ["konkretna poprawa1", "poprawa2"]
}`;

    const result = await this.modelVision.generateContent([prompt, imageData]);
    return this.parseJSON(result.response.text());
  }

  // ✅ FUNKCJA 9: Generowanie postów social media
  async generateSocialMediaPosts(catData, platform) {
    const prompt = `Wygeneruj post na ${platform} promujący kota.

KOT: ${JSON.stringify(catData, null, 2)}

Zwróć JSON:
{
  "post": "treść posta z emoji",
  "hashtags": ["#tag1", "#tag2"],
  "callToAction": "wezwanie do działania",
  "bestTimeToPost": "najlepszy czas publikacji"
}`;

    const result = await this.modelPro.generateContent(prompt);
    return this.parseJSON(result.response.text());
  }

  // ✅ FUNKCJA 10: Porównanie kotów
  async compareCats(cat1, cat2) {
    const prompt = `Porównaj dwa koty dla klienta.

KOT 1: ${JSON.stringify(cat1, null, 2)}
KOT 2: ${JSON.stringify(cat2, null, 2)}

Zwróć JSON:
{
  "comparison": {
    "personality": "porównanie charakterów",
    "care": "porównanie wymagań",
    "health": "porównanie zdrowia",
    "price": "porównanie cen"
  },
  "recommendation": "który wybrać i dlaczego",
  "bestFor": {
    "cat1": "typ osoby",
    "cat2": "typ osoby"
  }
}`;

    const result = await this.modelPro.generateContent(prompt);
    return this.parseJSON(result.response.text());
  }

  // ✅ FUNKCJA 11: Plan opieki dla nowego właściciela
  async generateCarePlan(catData, ownerProfile) {
    const prompt = `Stwórz spersonalizowany plan opieki.

KOT: ${JSON.stringify(catData, null, 2)}
WŁAŚCICIEL: ${JSON.stringify(ownerProfile, null, 2)}

Zwróć JSON:
{
  "dailyCare": ["czynność1", "czynność2"],
  "weeklyCare": ["czynność1"],
  "monthlyCare": ["czynność1"],
  "diet": "zalecenia żywieniowe",
  "healthChecks": "kalendarz badań",
  "grooming": "plan pielęgnacji",
  "tips": ["wskazówka1", "wskazówka2"]
}`;

    const result = await this.modelPro.generateContent(prompt);
    return this.parseJSON(result.response.text());
  }

  // ✅ FUNKCJA 12: Wykrywanie fałszywych ogłoszeń
  async detectFraudulentListing(listingData) {
    const prompt = `Przeanalizuj ogłoszenie pod kątem potencjalnego oszustwa.

OGŁOSZENIE: ${JSON.stringify(listingData, null, 2)}

Zwróć JSON:
{
  "riskScore": 45,
  "riskLevel": "niskie/średnie/wysokie",
  "redFlags": ["podejrzany element1"],
  "greenFlags": ["pozytywny element1"],
  "recommendation": "czy zaufać",
  "verificationNeeded": ["co zweryfikować"]
}`;

    const result = await this.modelPro.generateContent(prompt);
    return this.parseJSON(result.response.text());
  }

  // ✅ FUNKCJA 13: Tłumaczenie terminów felinologicznych
  async translateFelineTerms(term, targetLang = 'pl') {
    const prompt = `Przetłumacz termin felinologiczny: "${term}" na język: ${targetLang}
Dodaj wyjaśnienie.

Zwróć JSON:
{
  "term": "oryginalny termin",
  "translation": "tłumaczenie",
  "explanation": "wyjaśnienie co to znaczy",
  "relatedTerms": ["powiązany1", "powiązany2"]
}`;

    const result = await this.modelPro.generateContent(prompt);
    return this.parseJSON(result.response.text());
  }

  // Helper: konwersja pliku na format Gemini
  async fileToGenerativePart(file) {
    const base64 = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(',')[1]);
      reader.readAsDataURL(file);
    });

    return {
      inlineData: {
         base64,
        mimeType: file.type
      }
    };
  }

  // Helper: parsowanie JSON z odpowiedzi AI
  parseJSON(text) {
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      return jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(text);
    } catch (error) {
      console.error('Błąd parsowania JSON:', text);
      throw new Error('AI zwróciło nieprawidłowy format');
    }
  }

  // Czyszczenie sesji czatu
  clearChat(sessionId) {
    this.chatSessions.delete(sessionId);
  }
}

export default new GeminiService();
