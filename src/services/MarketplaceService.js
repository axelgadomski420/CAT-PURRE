class MarketplaceService {
  // 🛒 Produkty dla kotów
  async getProducts(category, breed) {
    const response = await fetch(`/api/marketplace/products?category=${category}&breed=${breed}`);
    return response.json();
  }

  // 🍖 Rekomendacja karmy
  async getRecommendedFood(catData) {
    const response = await fetch('/api/marketplace/food/recommend', {
      method: 'POST',
      body: JSON.stringify(catData)
    });
    return response.json();
  }

  // 🎁 Starter pack dla nowego kota
  async getStarterPack(breed, age) {
    const response = await fetch(`/api/marketplace/starter-pack?breed=${breed}&age=${age}`);
    return response.json();
  }

  // 🏠 Akcesoria dla rasy
  async getBreedSpecificItems(breed) {
    const response = await fetch(`/api/marketplace/breed-specific/${breed}`);
    return response.json();
  }

  // 💳 Złóż zamówienie
  async placeOrder(items, deliveryAddress) {
    const response = await fetch('/api/marketplace/orders', {
      method: 'POST',
      body: JSON.stringify({ items, deliveryAddress })
    });
    return response.json();
  }
}

export default new MarketplaceService();
