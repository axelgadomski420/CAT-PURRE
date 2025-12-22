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
