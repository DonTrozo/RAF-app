import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.card}>
        <Text style={styles.title}>App Preview</Text>
        <Text style={styles.body}>The deployment is live and the app is rendering.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    minHeight: '100%',
    backgroundColor: '#F4F7F9',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24
  },
  card: {
    width: '100%',
    maxWidth: 720,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 32,
    borderWidth: 1,
    borderColor: '#DDE6EB'
  },
  title: {
    color: '#0F2D3A',
    fontSize: 40,
    fontWeight: '900',
    marginBottom: 12
  },
  body: {
    color: '#61717C',
    fontSize: 18,
    lineHeight: 26
  }
});
