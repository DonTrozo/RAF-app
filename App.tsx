import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.page}>
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>RAF Connect</Text>
          <Text style={styles.title}>Claimant Portal</Text>
          <Text style={styles.copy}>Track claim progress, documents, messages, and appointments from one simple dashboard.</Text>
        </View>

        <View style={styles.grid}>
          <Card label="Active reference" value="RAF-2026-014582" />
          <Card label="Progress" value="42%" />
          <Card label="Missing docs" value="2" />
          <Card label="Messages" value="1" />
        </View>

        <View style={styles.panel}>
          <Text style={styles.panelTitle}>Current status</Text>
          <Row label="Stage" value="Under assessment" />
          <Row label="Office" value="Johannesburg Regional Office" />
          <Row label="Next action" value="Upload accident report" />
        </View>

        <View style={styles.panel}>
          <Text style={styles.panelTitle}>Documents</Text>
          <Row label="Identity document" value="Accepted" />
          <Row label="Medical report" value="Under review" />
          <Row label="Accident report" value="Missing" />
          <Row label="Bank confirmation" value="Missing" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Card({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardValue}>{value}</Text>
      <Text style={styles.cardLabel}>{label}</Text>
    </View>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F4F7F9' },
  page: { padding: 18, gap: 18, backgroundColor: '#F4F7F9' },
  hero: { backgroundColor: '#0F2D3A', borderRadius: 24, padding: 28, gap: 10 },
  eyebrow: { color: '#A8DADC', fontSize: 13, fontWeight: '800', letterSpacing: 1 },
  title: { color: '#FFFFFF', fontSize: 38, fontWeight: '900' },
  copy: { color: '#D8EEF5', fontSize: 16, lineHeight: 24 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  card: { flexGrow: 1, flexBasis: 145, backgroundColor: '#FFFFFF', borderRadius: 18, padding: 18, borderWidth: 1, borderColor: '#DDE6EB' },
  cardValue: { color: '#0F6B8D', fontSize: 26, fontWeight: '900' },
  cardLabel: { color: '#61717C', fontWeight: '800', marginTop: 6 },
  panel: { backgroundColor: '#FFFFFF', borderRadius: 20, padding: 18, borderWidth: 1, borderColor: '#DDE6EB', gap: 12 },
  panelTitle: { color: '#10212B', fontSize: 22, fontWeight: '900' },
  row: { flexDirection: 'row', justifyContent: 'space-between', gap: 12, borderBottomWidth: 1, borderBottomColor: '#EEF3F6', paddingBottom: 10 },
  rowLabel: { color: '#61717C', fontWeight: '700' },
  rowValue: { color: '#10212B', fontWeight: '900', textAlign: 'right', flex: 1 }
});
