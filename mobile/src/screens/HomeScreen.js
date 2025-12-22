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
