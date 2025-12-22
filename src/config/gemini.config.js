import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY);

export const MODELS = {
  FLASH: 'gemini-2.0-flash-exp',
  PRO: 'gemini-1.5-pro',
  VISION: 'gemini-2.0-flash-exp'
};

export const getModel = (type = 'FLASH') => {
  return genAI.getGenerativeModel({ model: MODELS[type] });
};

export const generateContent = async (prompt, modelType = 'FLASH') => {
  try {
    const model = getModel(modelType);
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error('Gemini Error:', error);
    throw error;
  }
};

export const analyzeImage = async (imageFile, prompt) => {
  try {
    const model = getModel('VISION');
    
    const imagePart = {
      inlineData: {
         await fileToBase64(imageFile),
        mimeType: imageFile.type
      }
    };
    
    const result = await model.generateContent([prompt, imagePart]);
    return result.response.text();
  } catch (error) {
    console.error('Image Analysis Error:', error);
    throw error;
  }
};

const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = error => reject(error);
  });
};

export default genAI;
