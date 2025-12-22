import React, { useState, useEffect } from 'react';
import CatCard from '../ui/CatCard';
import axios from 'axios';

export default function FeaturedCats() {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedCats();
  }, []);

  const loadFeaturedCats = async () => {
    try {
      const response = await axios.get('/api/cats?featured=true&limit=8');
      setCats(response.data.cats || mockCats);
    } catch (error) {
      setCats(mockCats);
    }
    setLoading(false);
  };

  const mockCats = [
    { id: 1, name: 'Luna', breed: 'British Shorthair', price: 4500, age: '3 mies', gender: 'female', location: 'Warszawa', images: ['/cat1.jpg'], status: 'available', breeder: { name: 'Golden British', verified: true }, views: 234, likes: 12 },
    { id: 2, name: 'Max', breed: 'Maine Coon', price: 6500, age: '4 mies', gender: 'male', location: 'Kraków', images: ['/cat2.jpg'], status: 'available', breeder: { name: 'Maine Magic', verified: true }, views: 456, likes: 23 },
    { id: 3, name: 'Bella', breed: 'Persian', price: 3800, age: '2 mies', gender: 'female', location: 'Gdańsk', images: ['/cat3.jpg'], status: 'available', breeder: { name: 'Royal Persians', verified: true }, views: 189, likes: 8 },
    { id: 4, name: 'Leo', breed: 'Bengal', price: 7200, age: '5 mies', gender: 'male', location: 'Wrocław', images: ['/cat4.jpg'], status: 'reserved', breeder: { name: 'Wild Bengals', verified: true }, views: 567, likes: 34 }
  ];

  if (loading) return <div className="loading">Ładowanie...</div>;

  return (
    <div className="featured-cats">
      <div className="grid grid-4">
        {cats.map(cat => (
          <CatCard key={cat.id} cat={cat} />
        ))}
      </div>
    </div>
  );
}
