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
