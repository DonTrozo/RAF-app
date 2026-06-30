import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ClaimantPortal } from './ClaimantPortal';
import { AdminPortal } from './AdminPortal';
import { SupportQueue } from './SupportQueue';

type Mode = 'Claimant' | 'Admin' | 'Support';

export function ModeShell() {
  const [mode, setMode] = useState<Mode>('Claimant');

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.page}>
        <View style={styles.box}>
          <Text style={styles.title}>RAF Connect</Text>
          <Text style={styles.copy}>Choose a flow to test.</Text>
          <View style={styles.row}>
            {(['Claimant', 'Admin', 'Support'] as Mode[]).map((item) => (
              <TouchableOpacity key={item} onPress={() => setMode(item)} style={[styles.button, mode === item && styles.active]}>
                <Text style={[styles.buttonText, mode === item && styles.activeText]}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {mode === 'Claimant' && <ClaimantPortal />}
        {mode === 'Admin' && <AdminPortal />}
        {mode === 'Support' && <SupportQueue />}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F4F7F9' },
  page: { padding: 18, gap: 18, backgroundColor: '#F4F7F9' },
  box: { backgroundColor: '#FFFFFF', borderRadius: 20, padding: 18, borderWidth: 1, borderColor: '#DDE6EB', gap: 10 },
  title: { color: '#10212B', fontSize: 24, fontWeight: '900' },
  copy: { color: '#61717C', lineHeight: 21 },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  button: { paddingHorizontal: 14, paddingVertical: 10, borderRadius: 999, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#DDE6EB' },
  active: { backgroundColor: '#0F6B8D', borderColor: '#0F6B8D' },
  buttonText: { color: '#61717C', fontWeight: '900' },
  activeText: { color: '#FFFFFF' }
});
