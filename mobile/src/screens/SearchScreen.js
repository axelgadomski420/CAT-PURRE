import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

export default function SearchScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');

  const popularBreeds = ['British Shorthair', 'Maine Coon', 'Persian', 'Bengal'];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🔍 Szukaj</Text>
      </View>

      <View style={styles.searchBox}>
        <TextInput
          style={styles.searchInput}
          placeholder="Rasa, lokalizacja..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Popularne rasy</Text>
        <View style={styles.breedsGrid}>
          {popularBreeds.map((breed, idx) => (
            <TouchableOpacity key={idx} style={styles.breedCard}>
              <Text style={styles.breedEmoji}>🐱</Text>
              <Text style={styles.breedName}>{breed}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { padding: 20, paddingTop: 60, backgroundColor: '#667eea' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#fff' },
  searchBox: { padding: 20 },
  searchInput: { 
    padding: 15, 
    backgroundColor: '#f0f0f0', 
    borderRadius: 12,
    fontSize: 16 
  },
  content: { flex: 1, padding: 20 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  breedsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  breedCard: { 
    width: '48%', 
    backgroundColor: '#f9f9f9', 
    padding: 20, 
    borderRadius: 12,
    alignItems: 'center' 
  },
  breedEmoji: { fontSize: 40, marginBottom: 8 },
  breedName: { fontSize: 14, fontWeight: '600' }
});
