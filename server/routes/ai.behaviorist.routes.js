const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/behaviorist', async (req, res) => {
  try {
    const { message, catProfile, conversationHistory } = req.body;

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    const context = \`Jesteś certyfikowanym behawiorystą kotów z 20-letnim doświadczeniem.
Twoja specjalność: problemy behawioralne kotów domowych.
Odpowiadaj profesjonalnie, empatycznie i konkretnie po polsku.

\${catProfile ? \`Profil kota: \${catProfile.name}, \${catProfile.breed}, \${catProfile.age} lat, płeć: \${catProfile.gender}\` : ''}

Użytkownik pyta: \${message}

Podaj:
1. Diagnozę problemu
2. 3-5 konkretnych kroków rozwiązania
3. Czego unikać
4. Kiedy skontaktować się z weterynarzem\`;

    const result = await model.generateContent(context);
    const response = result.response.text();

    // Parse suggestions
    const suggestions = [
      'Stopniowa desensytyzacja',
      'Pozytywne wzmocnienie',
      'Konsekwencja w działaniu',
      'Zapewnij alternatywy',
      'Monitoruj postępy'
    ];

    const relatedArticles = [
      { title: 'Jak rozumieć język ciała kota', url: '/blog/cat-body-language' },
      { title: 'Top 10 problemów behawioralnych', url: '/blog/common-issues' }
    ];

    res.json({
      response,
      suggestions,
      relatedArticles
    });

  } catch (error) {
    console.error('AI Behaviorist Error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
