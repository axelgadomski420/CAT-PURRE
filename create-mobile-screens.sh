#!/bin/zsh

echo "📱 Tworzenie Mobile Screens..."

# SearchScreen
cat > mobile/src/screens/SearchScreen.js << 'SEARCHEOF'
import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

export default function SearchScreen() {
  const [search, setSearch] = useState({ breed: '', location: '', minPrice: '', maxPrice: '' });

  const breeds = ['British Shorthair', 'Maine Coon', 'Persian', 'Ragdoll', 'Bengal'];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Znajdź swojego kota</Text>
      
      <View style={styles.form}>
        <Text style={styles.label}>Rasa</Text>
        <View style={styles.chipContainer}>
          {breeds.map(breed => (
            <TouchableOpacity 
              key={breed}
              style={[styles.chip, search.breed === breed && styles.chipActive]}
              onPress={() => setSearch({...search, breed})}
            >
              <Text style={styles.chipText}>{breed}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Lokalizacja</Text>
        <TextInput 
          style={styles.input}
          placeholder="np. Warszawa"
          value={search.location}
          onChangeText={(text) => setSearch({...search, location: text})}
        />

        <Text style={styles.label}>Zakres cenowy</Text>
        <View style={styles.row}>
          <TextInput 
            style={[styles.input, styles.halfInput]}
            placeholder="Od"
            keyboardType="numeric"
            value={search.minPrice}
            onChangeText={(text) => setSearch({...search, minPrice: text})}
          />
          <TextInput 
            style={[styles.input, styles.halfInput]}
            placeholder="Do"
            keyboardType="numeric"
            value={search.maxPrice}
            onChangeText={(text) => setSearch({...search, maxPrice: text})}
          />
        </View>

        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchButtonText}>🔍 Szukaj kotów</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, marginTop: 40 },
  form: { marginBottom: 20 },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 8, marginTop: 16 },
  input: { backgroundColor: '#f5f5f5', padding: 16, borderRadius: 12, fontSize: 16 },
  chipContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  chip: { paddingHorizontal: 16, paddingVertical: 10, backgroundColor: '#f0f0f0', borderRadius: 20 },
  chipActive: { backgroundColor: '#FF6B9D' },
  chipText: { fontSize: 14, fontWeight: '500' },
  row: { flexDirection: 'row', gap: 10 },
  halfInput: { flex: 1 },
  searchButton: { backgroundColor: '#FF6B9D', padding: 18, borderRadius: 12, marginTop: 30 },
  searchButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold', textAlign: 'center' }
});
SEARCHEOF

# FavoritesScreen
cat > mobile/src/screens/FavoritesScreen.js << 'FAVEOF'
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default function FavoritesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>❤️ Ulubione</Text>
      <Text style={styles.empty}>Nie masz jeszcze ulubionych kotów</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20, paddingTop: 60 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  empty: { textAlign: 'center', color: '#999', marginTop: 50, fontSize: 16 }
});
FAVEOF

# MessagesScreen
cat > mobile/src/screens/MessagesScreen.js << 'MSGEOF'
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

export default function MessagesScreen() {
  const conversations = [
    { id: 1, breeder: 'Golden British', lastMessage: 'Tak, kot jest dostępny!', time: '10 min', unread: 2 },
    { id: 2, breeder: 'Maine Magic', lastMessage: 'Dziękuję za zapytanie', time: '1h', unread: 0 }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>💬 Wiadomości</Text>
      {conversations.map(conv => (
        <TouchableOpacity key={conv.id} style={styles.conversation}>
          <View style={styles.avatar}>🏠</View>
          <View style={styles.content}>
            <Text style={styles.name}>{conv.breeder}</Text>
            <Text style={styles.message}>{conv.lastMessage}</Text>
          </View>
          <View>
            <Text style={styles.time}>{conv.time}</Text>
            {conv.unread > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{conv.unread}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20, paddingTop: 60 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  conversation: { flexDirection: 'row', padding: 16, backgroundColor: '#f9f9f9', borderRadius: 12, marginBottom: 12 },
  avatar: { fontSize: 40, marginRight: 12 },
  content: { flex: 1 },
  name: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  message: { fontSize: 14, color: '#666' },
  time: { fontSize: 12, color: '#999' },
  badge: { backgroundColor: '#FF6B9D', width: 20, height: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: 4 },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: 'bold' }
});
MSGEOF

# ProfileScreen
cat > mobile/src/screens/ProfileScreen.js << 'PROFEOF'
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

export default function ProfileScreen() {
  const menuItems = [
    { icon: '👤', title: 'Moje dane', screen: 'EditProfile' },
    { icon: '🐱', title: 'Moje koty', screen: 'MyCats' },
    { icon: '❤️', title: 'Ulubione', screen: 'Favorites' },
    { icon: '📄', title: 'Umowy', screen: 'Contracts' },
    { icon: '💳', title: 'Płatności', screen: 'Payments' },
    { icon: '⚙️', title: 'Ustawienia', screen: 'Settings' },
    { icon: '❓', title: 'Pomoc', screen: 'Help' },
    { icon: '🚪', title: 'Wyloguj', screen: 'Logout' }
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>👤</View>
        <Text style={styles.name}>Jan Kowalski</Text>
        <Text style={styles.email}>jan@example.com</Text>
      </View>

      <View style={styles.menu}>
        {menuItems.map((item, idx) => (
          <TouchableOpacity key={idx} style={styles.menuItem}>
            <Text style={styles.menuIcon}>{item.icon}</Text>
            <Text style={styles.menuTitle}>{item.title}</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { alignItems: 'center', padding: 40, paddingTop: 60, backgroundColor: '#FF6B9D' },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', fontSize: 40, marginBottom: 16 },
  name: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 4 },
  email: { fontSize: 14, color: 'rgba(255,255,255,0.8)' },
  menu: { padding: 20 },
  menuItem: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#f9f9f9', borderRadius: 12, marginBottom: 12 },
  menuIcon: { fontSize: 24, marginRight: 16 },
  menuTitle: { flex: 1, fontSize: 16, fontWeight: '500' },
  menuArrow: { fontSize: 24, color: '#999' }
});
PROFEOF

# CatDetailScreen
cat > mobile/src/screens/CatDetailScreen.js << 'DETAILEOF'
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
DETAILEOF

# AIAssistantScreen
cat > mobile/src/screens/AIAssistantScreen.js << 'AIEOF'
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

export default function AIAssistantScreen() {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Cześć! 🐱 W czym mogę Ci pomóc?' }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', text: input }]);
    setInput('');
    
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        text: 'To świetne pytanie! Mogę Ci pomóc w wyborze odpowiedniej rasy.' 
      }]);
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.messages}>
        {messages.map((msg, idx) => (
          <View 
            key={idx} 
            style={[styles.message, msg.role === 'user' ? styles.userMessage : styles.aiMessage]}
          >
            <Text style={styles.messageText}>{msg.text}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input}
          placeholder="Zadaj pytanie..."
          value={input}
          onChangeText={setInput}
          onSubmitEditing={sendMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>📤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  messages: { flex: 1, padding: 20 },
  message: { maxWidth: '80%', padding: 16, borderRadius: 20, marginBottom: 12 },
  userMessage: { alignSelf: 'flex-end', backgroundColor: '#FF6B9D' },
  aiMessage: { alignSelf: 'flex-start', backgroundColor: '#f0f0f0' },
  messageText: { fontSize: 16 },
  inputContainer: { flexDirection: 'row', padding: 16, borderTopWidth: 1, borderColor: '#e0e0e0' },
  input: { flex: 1, backgroundColor: '#f9f9f9', padding: 16, borderRadius: 24, fontSize: 16, marginRight: 12 },
  sendButton: { width: 50, height: 50, backgroundColor: '#FF6B9D', borderRadius: 25, alignItems: 'center', justifyContent: 'center' },
  sendButtonText: { fontSize: 24 }
});
AIEOF

echo "✅ Wszystkie Mobile Screens utworzone"

