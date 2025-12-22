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
