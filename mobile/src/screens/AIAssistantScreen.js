import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

export default function AIAssistantScreen() {
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Cześć! Jak mogę Ci pomóc?' }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    
    setMessages([...messages, { role: 'user', text: input }]);
    setInput('');
    
    // Mock AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'ai', 
        text: 'To świetne pytanie! Czy szukasz konkretnej rasy?' 
      }]);
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🤖 AI Asystent</Text>
      </View>

      <ScrollView style={styles.messages}>
        {messages.map((msg, idx) => (
          <View key={idx} style={[
            styles.message,
            msg.role === 'user' ? styles.userMessage : styles.aiMessage
          ]}>
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
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendBtn}>
          <Text style={styles.sendBtnText}>📤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { padding: 20, paddingTop: 60, backgroundColor: '#667eea' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#fff' },
  messages: { flex: 1, padding: 16 },
  message: { 
    padding: 12, 
    borderRadius: 16, 
    marginBottom: 12, 
    maxWidth: '80%' 
  },
  userMessage: { 
    alignSelf: 'flex-end', 
    backgroundColor: '#FF6B9D' 
  },
  aiMessage: { 
    alignSelf: 'flex-start', 
    backgroundColor: '#f0f0f0' 
  },
  messageText: { color: '#fff' },
  inputContainer: { 
    flexDirection: 'row', 
    padding: 16, 
    borderTopWidth: 1, 
    borderTopColor: '#e0e0e0' 
  },
  input: { 
    flex: 1, 
    padding: 12, 
    backgroundColor: '#f0f0f0', 
    borderRadius: 25, 
    marginRight: 8 
  },
  sendBtn: { 
    width: 50, 
    height: 50, 
    borderRadius: 25, 
    backgroundColor: '#FF6B9D',
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  sendBtnText: { fontSize: 20 }
});
