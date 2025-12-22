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
