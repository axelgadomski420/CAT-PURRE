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
