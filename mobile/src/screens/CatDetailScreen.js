import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function CatDetailScreen({ route }) {
  const { catId } = route.params || {};

  return (
    <ScrollView style={styles.container}>
      <Image 
        source={{ uri: 'https://placekitten.com/400/400' }}
        style={styles.image}
      />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={styles.name}>Luna</Text>
            <Text style={styles.breed}>British Shorthair</Text>
          </View>
          <Text style={styles.price}>4,500 PLN</Text>
        </View>

        <View style={styles.stats}>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Wiek</Text>
            <Text style={styles.statValue}>3 mies</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Płeć</Text>
            <Text style={styles.statValue}>♀ Samica</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Lokalizacja</Text>
            <Text style={styles.statValue}>Warszawa</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Opis</Text>
          <Text style={styles.description}>
            Piękna kotka British Shorthair w kolorze blue. Zdrowa, zaszczepiona, z pełnym rodowodem FIFe.
          </Text>
        </View>

        <View style={styles.breeder}>
          <View style={styles.breederAvatar}>🏠</View>
          <View style={styles.breederInfo}>
            <Text style={styles.breederName}>Golden British</Text>
            <Text style={styles.breederLocation}>✓ Zweryfikowany</Text>
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>💬 Zapytaj o kota</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>❤️ Dodaj do ulubionych</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  image: { width: '100%', height: 400 },
  content: { padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 },
  name: { fontSize: 28, fontWeight: 'bold' },
  breed: { fontSize: 16, color: '#666', marginTop: 4 },
  price: { fontSize: 24, fontWeight: 'bold', color: '#FF6B9D' },
  stats: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 30, backgroundColor: '#f9f9f9', padding: 20, borderRadius: 12 },
  stat: { alignItems: 'center' },
  statLabel: { fontSize: 12, color: '#999', marginBottom: 4 },
  statValue: { fontSize: 16, fontWeight: '600' },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 12 },
  description: { fontSize: 15, lineHeight: 24, color: '#333' },
  breeder: { flexDirection: 'row', padding: 16, backgroundColor: '#f9f9f9', borderRadius: 12, marginBottom: 30 },
  breederAvatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', fontSize: 24, marginRight: 12 },
  breederInfo: { flex: 1 },
  breederName: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  breederLocation: { fontSize: 14, color: '#34C759' },
  actions: { gap: 12 },
  primaryButton: { backgroundColor: '#FF6B9D', padding: 18, borderRadius: 12 },
  primaryButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
  secondaryButton: { backgroundColor: '#f0f0f0', padding: 18, borderRadius: 12 },
  secondaryButtonText: { color: '#333', fontSize: 18, fontWeight: 'bold', textAlign: 'center' }
});
