const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const multer = require('multer');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const upload = multer({ storage: multer.memoryStorage() });

// Chat with AI
router.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    
    const prompt = \`Jesteś ekspertem od kotów rasowych i doradcą w platformie CAT PURRE.
Odpowiadaj po polsku, pomocnie i konkretnie.

Pytanie użytkownika: \${message}\`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();
    
    res.json({ response });
  } catch (error) {
    console.error('AI Chat Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Recognize breed from image
router.post('/recognize-breed', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image provided' });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    const imagePart = {
      inlineData: {
         req.file.buffer.toString('base64'),
        mimeType: req.file.mimetype
      }
    };

    const prompt = \`Przeanalizuj to zdjęcie kota i podaj:
1. Rasę (lub mieszankę ras)
2. Pewność rozpoznania (0-100%)
3. Charakterystyczne cechy
4. Prawdopodobny kolor/wzór
5. Przybliżony wiek

Odpowiedź w formacie JSON.\`;

    const result = await model.generateContent([prompt, imagePart]);
    const text = result.response.text();
    
    // Parse JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const data = jsonMatch ? JSON.parse(jsonMatch[0]) : {
      breed: 'Nie można rozpoznać',
      confidence: 0,
      characteristics: [],
      colorPattern: 'Nieznany',
      estimatedAge: 'Nieznany'
    };

    res.json({ data });
  } catch (error) {
    console.error('Breed Recognition Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Breed matching quiz
router.post('/breed-match', async (req, res) => {
  try {
    const { 
      livingSpace, 
      activityLevel, 
      experience, 
      allergies, 
      children,
      budget 
    } = req.body;

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    const prompt = \`Jestem doradcą ras kotów. Na podstawie preferencji użytkownika, polecę 3 najlepsze rasy.

Preferencje:
- Przestrzeń: \${livingSpace}
- Poziom aktywności: \${activityLevel}
- Doświadczenie: \${experience}
- Alergie: \${allergies ? 'Tak' : 'Nie'}
- Dzieci w domu: \${children ? 'Tak' : 'Nie'}
- Budżet: \${budget} PLN

Odpowiedź w formacie JSON z polami: recommendations (array of {breed, score, reasons}).\`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const data = jsonMatch ? JSON.parse(jsonMatch[0]) : {
      recommendations: []
    };

    res.json(data);
  } catch (error) {
    console.error('Breed Match Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Generate marketing content for breeder
router.post('/generate-marketing', async (req, res) => {
  try {
    const { catName, breed, characteristics } = req.body;

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    const prompt = \`Wygeneruj atrakcyjny opis marketingowy dla kota:
Imię: \${catName}
Rasa: \${breed}
Cechy: \${characteristics}

Napisz:
1. Chwytliwy tytuł (max 60 znaków)
2. Opis ogłoszenia (150-200 słów)
3. 5 hashtagów
4. 3 punkty wyróżniające

Format JSON.\`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const data = jsonMatch ? JSON.parse(jsonMatch[0]) : {};

    res.json(data);
  } catch (error) {
    console.error('Marketing Generation Error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
