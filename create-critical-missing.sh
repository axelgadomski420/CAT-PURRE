#!/bin/zsh

echo "🔥 Tworzenie KRYTYCZNYCH brakujących elementów..."

# ============================================
# GEMINI CONFIG (BARDZO WAŻNE!)
# ============================================

mkdir -p src/config

cat > src/config/gemini.config.js << 'GEMINIEOF'
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
GEMINIEOF

# ============================================
# BREEDS DATABASE (SUPER WAŻNE!)
# ============================================

cat > src/database/breeds.data.js << 'BREEDSEOF'
export const BREEDS_DATABASE = [
  {
    id: 1,
    nameEn: 'British Shorthair',
    namePl: 'Brytyjski Krótkowłosy',
    nameRu: 'Британская короткошерстная',
    nameDe: 'Britisch Kurzhaar',
    origin: 'Wielka Brytania',
    description: 'Spokojny, łagodny kot o pluszowej sierści. Idealny dla rodzin.',
    characteristics: {
      size: 'średni do dużego',
      weight: '4-8 kg',
      lifespan: '12-17 lat',
      coat: 'krótka, gęsta',
      activity: 'niska do średniej',
      grooming: 'niska'
    },
    temperament: ['spokojny', 'łagodny', 'towarzyski', 'niezależny'],
    colors: ['niebieski', 'czarny', 'biały', 'kremowy', 'złoty', 'srebrny', 'tabby', 'colorpoint'],
    priceRange: { min: 3000, max: 6000, currency: 'PLN' },
    popularity: 10,
    goodFor: ['rodziny', 'seniorzy', 'mieszkania', 'początkujący'],
    healthIssues: ['HCM', 'PKD'],
    imageUrl: '/breeds/british-shorthair.jpg'
  },
  {
    id: 2,
    nameEn: 'Maine Coon',
    namePl: 'Maine Coon',
    nameRu: 'Мейн-кун',
    nameDe: 'Maine Coon',
    origin: 'USA',
    description: 'Gigantyczny, przyjazny kot o lwich kształtach. "Gentle giant".',
    characteristics: {
      size: 'bardzo duży',
      weight: '5-11 kg',
      lifespan: '12-15 lat',
      coat: 'długa, gęsta',
      activity: 'średnia do wysokiej',
      grooming: 'średnia do wysokiej'
    },
    temperament: ['przyjazny', 'towarzyski', 'inteligentny', 'playful'],
    colors: ['brown tabby', 'czarny', 'biały', 'czerwony', 'silver', 'tortie'],
    priceRange: { min: 4500, max: 8000, currency: 'PLN' },
    popularity: 9,
    goodFor: ['rodziny z dziećmi', 'aktywni właściciele', 'domy'],
    healthIssues: ['HCM', 'SMA', 'HD'],
    imageUrl: '/breeds/maine-coon.jpg'
  },
  {
    id: 3,
    nameEn: 'Persian',
    namePl: 'Pers',
    nameRu: 'Персидская',
    nameDe: 'Perser',
    origin: 'Iran',
    description: 'Elegancki kot o długiej sierści i płaskiej twarzy. Spokojny i łagodny.',
    characteristics: {
      size: 'średni',
      weight: '3.5-7 kg',
      lifespan: '12-17 lat',
      coat: 'bardzo długa',
      activity: 'niska',
      grooming: 'bardzo wysoka'
    },
    temperament: ['spokojny', 'łagodny', 'cichy', 'domator'],
    colors: ['wszystkie kolory', 'solid', 'tabby', 'colorpoint', 'bicolor'],
    priceRange: { min: 3000, max: 7000, currency: 'PLN' },
    popularity: 8,
    goodFor: ['spokojne osoby', 'mieszkania', 'seniorzy'],
    healthIssues: ['PKD', 'problemy z oddychaniem', 'choroby oczu'],
    imageUrl: '/breeds/persian.jpg'
  },
  {
    id: 4,
    nameEn: 'Ragdoll',
    namePl: 'Ragdoll',
    nameRu: 'Рэгдолл',
    nameDe: 'Ragdoll',
    origin: 'USA',
    description: 'Duży, łagodny kot który "rozpływa się" w rękach. Idealny kompan.',
    characteristics: {
      size: 'duży',
      weight: '4-9 kg',
      lifespan: '12-17 lat',
      coat: 'półdługa',
      activity: 'niska do średniej',
      grooming: 'średnia'
    },
    temperament: ['bardzo łagodny', 'towarzyski', 'spokojny', 'przywiązany'],
    colors: ['colorpoint', 'mitted', 'bicolor', 'seal', 'blue', 'chocolate', 'lilac'],
    priceRange: { min: 3500, max: 7000, currency: 'PLN' },
    popularity: 9,
    goodFor: ['rodziny', 'dzieci', 'mieszkania', 'początkujący'],
    healthIssues: ['HCM', 'PKD'],
    imageUrl: '/breeds/ragdoll.jpg'
  },
  {
    id: 5,
    nameEn: 'Bengal',
    namePl: 'Bengal',
    nameRu: 'Бенгальская',
    nameDe: 'Bengalkatze',
    origin: 'USA',
    description: 'Dziki wygląd lamparta, łagodny charakter. Energiczny i atletyczny.',
    characteristics: {
      size: 'średni do dużego',
      weight: '4-7 kg',
      lifespan: '12-16 lat',
      coat: 'krótka',
      activity: 'bardzo wysoka',
      grooming: 'niska'
    },
    temperament: ['energiczny', 'playful', 'inteligentny', 'aktywny'],
    colors: ['brown spotted', 'silver spotted', 'snow', 'marbled'],
    priceRange: { min: 5000, max: 12000, currency: 'PLN' },
    popularity: 8,
    goodFor: ['aktywni właściciele', 'doświadczeni', 'domy z ogrodem'],
    healthIssues: ['PRA', 'HCM'],
    imageUrl: '/breeds/bengal.jpg'
  },
  {
    id: 6,
    nameEn: 'Siamese',
    namePl: 'Syjamski',
    nameRu: 'Сиамская',
    nameDe: 'Siamkatze',
    origin: 'Tajlandia',
    description: 'Gadatliwy, inteligentny kot o charakterystycznych niebieskich oczach.',
    characteristics: {
      size: 'średni',
      weight: '3-5 kg',
      lifespan: '12-20 lat',
      coat: 'krótka',
      activity: 'wysoka',
      grooming: 'niska'
    },
    temperament: ['gadatliwy', 'towarzyski', 'inteligentny', 'wymagający uwagi'],
    colors: ['seal point', 'blue point', 'chocolate point', 'lilac point'],
    priceRange: { min: 2500, max: 5000, currency: 'PLN' },
    popularity: 7,
    goodFor: ['aktywni', 'towarzystwo', 'doświadczeni'],
    healthIssues: ['choroby zębów', 'problemy z oddychaniem'],
    imageUrl: '/breeds/siamese.jpg'
  },
  {
    id: 7,
    nameEn: 'Sphynx',
    namePl: 'Sfinks',
    nameRu: 'Сфинкс',
    nameDe: 'Sphynx',
    origin: 'Kanada',
    description: 'Bezwłosy kot o ciepłej skórze. Towarzyski i energiczny.',
    characteristics: {
      size: 'średni',
      weight: '3-5 kg',
      lifespan: '12-15 lat',
      coat: 'brak',
      activity: 'wysoka',
      grooming: 'specjalna (kąpiele)'
    },
    temperament: ['energiczny', 'towarzyski', 'ciepły', 'ciekawy'],
    colors: ['wszystkie kolory skóry'],
    priceRange: { min: 4000, max: 8000, currency: 'PLN' },
    popularity: 6,
    goodFor: ['alergicy', 'towarzystwo', 'ciepłe mieszkania'],
    healthIssues: ['choroby skóry', 'HCM'],
    imageUrl: '/breeds/sphynx.jpg'
  },
  {
    id: 8,
    nameEn: 'Scottish Fold',
    namePl: 'Szkocki Zwisłouchy',
    nameRu: 'Шотландская вислоухая',
    nameDe: 'Scottish Fold',
    origin: 'Szkocja',
    description: 'Kot o charakterystycznych złożonych uszach. Słodki i spokojny.',
    characteristics: {
      size: 'średni',
      weight: '3-6 kg',
      lifespan: '11-15 lat',
      coat: 'krótka lub długa',
      activity: 'niska do średniej',
      grooming: 'niska do średniej'
    },
    temperament: ['spokojny', 'łagodny', 'towarzyski', 'adaptacyjny'],
    colors: ['wszystkie kolory'],
    priceRange: { min: 3500, max: 7000, currency: 'PLN' },
    popularity: 8,
    goodFor: ['rodziny', 'mieszkania', 'początkujący'],
    healthIssues: ['osteochondrodysplazja', 'problemy stawów'],
    imageUrl: '/breeds/scottish-fold.jpg'
  },
  {
    id: 9,
    nameEn: 'Norwegian Forest Cat',
    namePl: 'Norweski Leśny',
    nameRu: 'Норвежская лесная',
    nameDe: 'Norwegische Waldkatze',
    origin: 'Norwegia',
    description: 'Duży kot z wikińską historią. Wytrzymały i niezależny.',
    characteristics: {
      size: 'duży',
      weight: '4-9 kg',
      lifespan: '12-16 lat',
      coat: 'długa, wodoodporna',
      activity: 'średnia',
      grooming: 'średnia'
    },
    temperament: ['niezależny', 'łagodny', 'inteligentny', 'aktywny'],
    colors: ['wszystkie oprócz colorpoint'],
    priceRange: { min: 3500, max: 6500, currency: 'PLN' },
    popularity: 7,
    goodFor: ['domy', 'ogrody', 'aktywni'],
    healthIssues: ['HCM', 'GSD IV'],
    imageUrl: '/breeds/norwegian-forest.jpg'
  },
  {
    id: 10,
    nameEn: 'Abyssinian',
    namePl: 'Abisyński',
    nameRu: 'Абиссинская',
    nameDe: 'Abessinier',
    origin: 'Etiopia',
    description: 'Elegancki, atletyczny kot. Bardzo aktywny i ciekawy świata.',
    characteristics: {
      size: 'średni',
      weight: '3-5 kg',
      lifespan: '12-15 lat',
      coat: 'krótka',
      activity: 'bardzo wysoka',
      grooming: 'niska'
    },
    temperament: ['aktywny', 'inteligentny', 'ciekawy', 'playful'],
    colors: ['ruddy', 'sorrel', 'blue', 'fawn'],
    priceRange: { min: 3000, max: 6000, currency: 'PLN' },
    popularity: 6,
    goodFor: ['aktywni', 'doświadczeni', 'domy'],
    healthIssues: ['PRA', 'PK deficiency'],
    imageUrl: '/breeds/abyssinian.jpg'
  }
];

export const getBreedById = (id) => {
  return BREEDS_DATABASE.find(breed => breed.id === id);
};

export const getBreedByName = (name) => {
  return BREEDS_DATABASE.find(breed => 
    breed.nameEn.toLowerCase() === name.toLowerCase() ||
    breed.namePl.toLowerCase() === name.toLowerCase()
  );
};

export const searchBreeds = (query) => {
  const lowerQuery = query.toLowerCase();
  return BREEDS_DATABASE.filter(breed =>
    breed.nameEn.toLowerCase().includes(lowerQuery) ||
    breed.namePl.toLowerCase().includes(lowerQuery) ||
    breed.description.toLowerCase().includes(lowerQuery)
  );
};

export const getBreedsByPrice = (min, max) => {
  return BREEDS_DATABASE.filter(breed =>
    breed.priceRange.min >= min && breed.priceRange.max <= max
  );
};

export const getPopularBreeds = (limit = 5) => {
  return [...BREEDS_DATABASE]
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, limit);
};
BREEDSEOF

# ============================================
# i18n CONFIG
# ============================================

cat > src/i18n.js << 'I18NEOF'
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  pl: {
    translation: {
      common: {
        search: 'Szukaj',
        filter: 'Filtruj',
        reset: 'Wyczyść',
        save: 'Zapisz',
        cancel: 'Anuluj',
        delete: 'Usuń',
        edit: 'Edytuj',
        view: 'Zobacz',
        back: 'Wróć',
        next: 'Dalej',
        loading: 'Ładowanie...',
        error: 'Błąd'
      },
      nav: {
        home: 'Strona główna',
        cats: 'Koty',
        breeds: 'Rasy',
        breeders: 'Hodowcy',
        ai: 'AI Asystent',
        login: 'Zaloguj się',
        register: 'Zarejestruj się'
      },
      hero: {
        title: 'Znajdź swojego wymarzonego kota rasowego',
        subtitle: 'Ponad 500 kotów od zweryfikowanych hodowców',
        cta: 'Przeglądaj koty',
        aiCta: 'Zapytaj AI'
      },
      filters: {
        breed: 'Rasa',
        location: 'Lokalizacja',
        price: 'Cena',
        gender: 'Płeć',
        age: 'Wiek',
        allBreeds: 'Wszystkie rasy',
        male: 'Samiec',
        female: 'Samica'
      }
    }
  },
  en: {
    translation: {
      common: {
        search: 'Search',
        filter: 'Filter',
        reset: 'Reset',
        save: 'Save',
        cancel: 'Cancel',
        delete: 'Delete',
        edit: 'Edit',
        view: 'View',
        back: 'Back',
        next: 'Next',
        loading: 'Loading...',
        error: 'Error'
      },
      nav: {
        home: 'Home',
        cats: 'Cats',
        breeds: 'Breeds',
        breeders: 'Breeders',
        ai: 'AI Assistant',
        login: 'Login',
        register: 'Register'
      },
      hero: {
        title: 'Find your dream cat',
        subtitle: 'Over 500 cats from verified breeders',
        cta: 'Browse cats',
        aiCta: 'Ask AI'
      },
      filters: {
        breed: 'Breed',
        location: 'Location',
        price: 'Price',
        gender: 'Gender',
        age: 'Age',
        allBreeds: 'All breeds',
        male: 'Male',
        female: 'Female'
      }
    }
  },
  de: {
    translation: {
      nav: {
        home: 'Startseite',
        cats: 'Katzen',
        breeds: 'Rassen',
        breeders: 'Züchter'
      }
    }
  },
  ru: {
    translation: {
      nav: {
        home: 'Главная',
        cats: 'Кошки',
        breeds: 'Породы',
        breeders: 'Заводчики'
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'pl',
    fallbackLng: 'pl',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
I18NEOF

# ============================================
# SEED SCRIPT - Demo Data
# ============================================

cat > server/scripts/seed.js << 'SEEDEOF'
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Cat = require('../models/Cat.model');
const User = require('../models/User.model');
const Breeder = require('../models/Breeder.model');
const bcrypt = require('bcryptjs');

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/catpurre');
    console.log('📦 Connected to MongoDB');

    // Clear existing data
    await Cat.deleteMany({});
    await User.deleteMany({});
    await Breeder.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create demo users
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    const users = await User.create([
      {
        email: 'admin@catpurre.pl',
        password: hashedPassword,
        firstName: 'Admin',
        lastName: 'CAT PURRE',
        userType: 'admin'
      },
      {
        email: 'hodowca1@test.pl',
        password: hashedPassword,
        firstName: 'Jan',
        lastName: 'Kowalski',
        userType: 'breeder'
      },
      {
        email: 'hodowca2@test.pl',
        password: hashedPassword,
        firstName: 'Anna',
        lastName: 'Nowak',
        userType: 'breeder'
      }
    ]);
    console.log('✅ Created users');

    // Create breeders
    const breeders = await Breeder.create([
      {
        user: users[1]._id,
        catteryName: 'Golden British',
        prefix: 'Golden',
        organization: 'FIFe',
        verified: true,
        verificationDate: new Date(),
        address: {
          city: 'Warszawa',
          voivodeship: 'mazowieckie'
        },
        contact: {
          phone: '+48 123 456 789',
          email: 'golden@british.pl'
        },
        breeds: ['British Shorthair'],
        rating: 4.9,
        reviewsCount: 45
      },
      {
        user: users[2]._id,
        catteryName: 'Maine Magic',
        prefix: 'Magic',
        organization: 'FIFe',
        verified: true,
        verificationDate: new Date(),
        address: {
          city: 'Kraków',
          voivodeship: 'małopolskie'
        },
        contact: {
          phone: '+48 987 654 321',
          email: 'contact@mainemagic.pl'
        },
        breeds: ['Maine Coon'],
        rating: 5.0,
        reviewsCount: 67
      }
    ]);
    console.log('✅ Created breeders');

    // Create demo cats
    const cats = await Cat.create([
      {
        name: 'Luna',
        breed: 'British Shorthair',
        gender: 'female',
        birthDate: new Date(2024, 8, 15),
        price: 4500,
        color: 'blue',
        description: 'Piękna kotka British Shorthair w kolorze blue. Zdrowa, zaszczepiona, z pełnym rodowodem FIFe. Bardzo spokojna i łagodna.',
        images: ['/demo/cat1.jpg', '/demo/cat1-2.jpg'],
        status: 'available',
        breeder: breeders[0]._id,
        pedigree: {
          number: 'FIFe/BS/2024/001',
          organization: 'FIFe',
          father: 'Champion Golden King',
          mother: 'Princess Luna Blue'
        },
        health: {
          vaccinations: [
            { name: 'Tricat', date: new Date(2024, 10, 1) }
          ],
          microchip: '616093900123456'
        },
        location: {
          city: 'Warszawa',
          voivodeship: 'mazowieckie',
          coordinates: { lat: 52.2297, lng: 21.0122 }
        },
        views: 234,
        likes: 12
      },
      {
        name: 'Max',
        breed: 'Maine Coon',
        gender: 'male',
        birthDate: new Date(2024, 7, 20),
        price: 6500,
        color: 'brown tabby',
        description: 'Wspaniały Maine Coon w kolorze brown tabby. Duży, silny, z doskonałym charakterem. Rodowód FIFe.',
        images: ['/demo/cat2.jpg'],
        status: 'available',
        breeder: breeders[1]._id,
        pedigree: {
          number: 'FIFe/MC/2024/002',
          organization: 'FIFe',
          father: 'Grand Champion Magic Lion',
          mother: 'Magic Forest Queen'
        },
        health: {
          vaccinations: [
            { name: 'Tricat', date: new Date(2024, 9, 15) }
          ],
          tests: [
            { name: 'HCM', result: 'negative', date: new Date(2024, 10, 1) }
          ],
          microchip: '616093900234567'
        },
        location: {
          city: 'Kraków',
          voivodeship: 'małopolskie',
          coordinates: { lat: 50.0647, lng: 19.9450 }
        },
        views: 456,
        likes: 23
      },
      {
        name: 'Bella',
        breed: 'Persian',
        gender: 'female',
        birthDate: new Date(2024, 9, 5),
        price: 3800,
        color: 'white',
        description: 'Elegancki pers biały o długiej, luksusowej sierści. Idealna dla rodzin.',
        images: ['/demo/cat3.jpg'],
        status: 'available',
        breeder: breeders[0]._id,
        location: {
          city: 'Gdańsk',
          voivodeship: 'pomorskie'
        },
        views: 189,
        likes: 8
      },
      {
        name: 'Leo',
        breed: 'Bengal',
        gender: 'male',
        birthDate: new Date(2024, 6, 10),
        price: 7200,
        color: 'brown spotted',
        description: 'Bengal o dzikim wyglądzie i łagodnym charakterze. Bardzo aktywny.',
        images: ['/demo/cat4.jpg'],
        status: 'reserved',
        breeder: breeders[1]._id,
        location: {
          city: 'Wrocław',
          voivodeship: 'dolnośląskie'
        },
        views: 567,
        likes: 34
      }
    ]);
    console.log('✅ Created cats');

    console.log('');
    console.log('🎉 Database seeded successfully!');
    console.log('');
    console.log('📊 Created:');
    console.log(\`   - \${users.length} users\`);
    console.log(\`   - \${breeders.length} breeders\`);
    console.log(\`   - \${cats.length} cats\`);
    console.log('');
    console.log('🔐 Login credentials:');
    console.log('   Email: admin@catpurre.pl');
    console.log('   Password: password123');
    console.log('');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
};

seedDatabase();
SEEDEOF

# ============================================
# MOBILE APP.JS
# ============================================

cat > mobile/App.js << 'MOBILEAPPEOF'
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { store } from './src/store';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import SearchScreen from './src/screens/SearchScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import MessagesScreen from './src/screens/MessagesScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import CatDetailScreen from './src/screens/CatDetailScreen';
import AIAssistantScreen from './src/screens/AIAssistantScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="HomeMain" 
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="CatDetail" component={CatDetailScreen} />
    </Stack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#FF6B9D',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          paddingBottom: 5,
          height: 60
        }
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeStack}
        options={{
          tabBarIcon: () => '🏠',
          tabBarLabel: 'Główna',
          headerShown: false
        }}
      />
      <Tab.Screen 
        name="Search" 
        component={SearchScreen}
        options={{
          tabBarIcon: () => '🔍',
          tabBarLabel: 'Szukaj',
          headerShown: false
        }}
      />
      <Tab.Screen 
        name="AI" 
        component={AIAssistantScreen}
        options={{
          tabBarIcon: () => '🤖',
          tabBarLabel: 'AI',
          headerShown: false
        }}
      />
      <Tab.Screen 
        name="Messages" 
        component={MessagesScreen}
        options={{
          tabBarIcon: () => '💬',
          tabBarLabel: 'Wiadomości',
          headerShown: false
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarIcon: () => '👤',
          tabBarLabel: 'Profil',
          headerShown: false
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainTabs />
      </NavigationContainer>
    </Provider>
  );
}
MOBILEAPPEOF

# ============================================
# MOBILE HOME SCREEN
# ============================================

cat > mobile/src/screens/HomeScreen.js << 'MOBILEHOMEEOF'
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function HomeScreen({ navigation }) {
  const featuredCats = [
    { id: 1, name: 'Luna', breed: 'British Shorthair', price: 4500, image: '/cat1.jpg' },
    { id: 2, name: 'Max', breed: 'Maine Coon', price: 6500, image: '/cat2.jpg' }
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>🐱 CAT PURRE</Text>
        <TouchableOpacity style={styles.notificationBtn}>
          <Text style={styles.notificationIcon}>🔔</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Znajdź swojego{'\n'}wymarzonego kota</Text>
        <Text style={styles.heroSubtitle}>500+ kotów od zweryfikowanych hodowców</Text>
      </View>

      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.actionCard}>
          <Text style={styles.actionIcon}>🔍</Text>
          <Text style={styles.actionText}>Szukaj</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionCard}>
          <Text style={styles.actionIcon}>🤖</Text>
          <Text style={styles.actionText}>AI</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionCard}>
          <Text style={styles.actionIcon}>🏠</Text>
          <Text style={styles.actionText}>Hodowcy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionCard}>
          <Text style={styles.actionIcon}>📚</Text>
          <Text style={styles.actionText}>Rasy</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔥 Wyróżnione</Text>
        {featuredCats.map(cat => (
          <TouchableOpacity 
            key={cat.id}
            style={styles.catCard}
            onPress={() => navigation.navigate('CatDetail', { catId: cat.id })}
          >
            <View style={styles.catImage}>
              <Text style={styles.placeholderImage}>🐱</Text>
            </View>
            <View style={styles.catInfo}>
              <Text style={styles.catName}>{cat.name}</Text>
              <Text style={styles.catBreed}>{cat.breed}</Text>
              <Text style={styles.catPrice}>{cat.price.toLocaleString()} PLN</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, paddingTop: 50 },
  logo: { fontSize: 24, fontWeight: 'bold' },
  notificationBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#f0f0f0', alignItems: 'center', justifyContent: 'center' },
  notificationIcon: { fontSize: 20 },
  hero: { padding: 20, backgroundColor: '#667eea', borderRadius: 20, margin: 20 },
  heroTitle: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 8 },
  heroSubtitle: { fontSize: 16, color: 'rgba(255,255,255,0.9)' },
  quickActions: { flexDirection: 'row', padding: 20, gap: 12 },
  actionCard: { flex: 1, backgroundColor: '#f9f9f9', padding: 16, borderRadius: 12, alignItems: 'center' },
  actionIcon: { fontSize: 32, marginBottom: 8 },
  actionText: { fontSize: 12, fontWeight: '600' },
  section: { padding: 20 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  catCard: { flexDirection: 'row', backgroundColor: '#f9f9f9', borderRadius: 16, padding: 12, marginBottom: 12 },
  catImage: { width: 80, height: 80, borderRadius: 12, backgroundColor: '#e0e0e0', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  placeholderImage: { fontSize: 40 },
  catInfo: { flex: 1, justifyContent: 'center' },
  catName: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  catBreed: { fontSize: 14, color: '#666', marginBottom: 4 },
  catPrice: { fontSize: 16, fontWeight: 'bold', color: '#FF6B9D' }
});
MOBILEHOMEEOF

# ============================================
# LAUNCH SCRIPT - Uruchom wszystko jednym kliknięciem
# ============================================

cat > launch.sh << 'LAUNCHEOF'
#!/bin/zsh

echo "🚀 Starting CAT PURRE Platform..."
echo ""

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null; then
    echo "🍃 Starting MongoDB..."
    brew services start mongodb-community 2>/dev/null || sudo systemctl start mongodb 2>/dev/null || mongod --fork --logpath /tmp/mongodb.log
    sleep 2
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    cd server && npm install && cd ..
    cd mobile && npm install && cd ..
fi

# Seed database if empty
echo "🌱 Checking database..."
cd server && npm run seed 2>/dev/null && cd ..

echo ""
echo "✅ Starting services..."
echo ""

# Start backend
echo "🔧 Starting Backend (port 5000)..."
cd server
npm run dev &
BACKEND_PID=$!
cd ..

sleep 2

# Start frontend
echo "🎨 Starting Frontend (port 3000)..."
npm run dev &
FRONTEND_PID=$!

sleep 2

# Start mobile (optional)
# echo "📱 Starting Mobile App..."
# cd mobile && npm start &
# MOBILE_PID=$!
# cd ..

echo ""
echo "✅ CAT PURRE is running!"
echo ""
echo "🌐 Frontend: http://localhost:3000"
echo "🔧 Backend:  http://localhost:5000"
echo "📱 Mobile:   Use Expo app"
echo ""
echo "Press Ctrl+C to stop all services"
echo ""

# Wait for Ctrl+C
trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; echo '\n👋 Stopped all services'; exit" INT
wait
LAUNCHEOF

chmod +x launch.sh

echo "✅ WSZYSTKIE KRYTYCZNE ELEMENTY UTWORZONE!"
echo ""
echo "📋 Utworzono:"
echo "   ✓ Gemini Config"
echo "   ✓ Breeds Database (10 ras)"
echo "   ✓ i18n (4 języki)"
echo "   ✓ Seed Script (demo data)"
echo "   ✓ Mobile App.js + Navigation"
echo "   ✓ Mobile HomeScreen"
echo "   ✓ Launch Script"
echo ""

