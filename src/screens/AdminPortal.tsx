import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export function AdminPortal() {
  const [status, setStatus] = useState('Under assessment');
  const [assigned, setAssigned] = useState(false);
  const [audit, setAudit] = useState(['Admin opened claim RAF-2026-014582']);

  function validateClaim() {
    setStatus('Validated for medical review');
    setAudit((items) => ['Claim validated and moved to medical review', ...items]);
  }

  function assignPartner() {
    setAssigned(true);
    setAudit((items) => ['Partner assigned for document support', ...items]);
  }

  function flagIssue() {
    setStatus('Clarification required');
    setAudit((items) => ['Claim flagged for claimant clarification', ...items]);
  }

  return (
    <View style={styles.stack}>
      <View style={styles.panel}>
        <Text style={styles.title}>RAF Admin Portal</Text>
        <Text style={styles.copy}>Review claims, validate documents, assign partners, and track admin actions.</Text>
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Claim queue</Text>
        <Row label="Reference" value="RAF-2026-014582" />
        <Row label="Claimant" value="Demo Claimant" />
        <Row label="Status" value={status} />
        <Row label="Partner" value={assigned ? 'Assigned' : 'Not assigned'} />
        <Button label="Validate claim" onPress={validateClaim} />
        <Button label="Assign partner" onPress={assignPartner} secondary />
        <Button label="Request clarification" onPress={flagIssue} secondary />
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Action history</Text>
        {audit.map((item, index) => <Text key={`${item}-${index}`} style={styles.auditItem}>• {item}</Text>)}
      </View>
    </View>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return <View style={styles.row}><Text style={styles.label}>{label}</Text><Text style={styles.value}>{value}</Text></View>;
}

function Button({ label, onPress, secondary }: { label: string; onPress: () => void; secondary?: boolean }) {
  return <TouchableOpacity onPress={onPress} style={[styles.button, secondary && styles.buttonSecondary]}><Text style={[styles.buttonText, secondary && styles.buttonTextSecondary]}>{label}</Text></TouchableOpacity>;
}

const styles = StyleSheet.create({
  stack: { gap: 18 },
  panel: { backgroundColor: '#FFFFFF', borderRadius: 20, padding: 18, borderWidth: 1, borderColor: '#DDE6EB', gap: 12 },
  title: { color: '#10212B', fontSize: 30, fontWeight: '900' },
  copy: { color: '#61717C', fontSize: 16, lineHeight: 23 },
  panelTitle: { color: '#10212B', fontSize: 22, fontWeight: '900' },
  row: { flexDirection: 'row', justifyContent: 'space-between', gap: 12, borderBottomWidth: 1, borderBottomColor: '#EEF3F6', paddingBottom: 10 },
  label: { color: '#61717C', fontWeight: '700' },
  value: { color: '#10212B', fontWeight: '900', textAlign: 'right', flex: 1 },
  button: { backgroundColor: '#0F6B8D', borderRadius: 16, padding: 15, alignItems: 'center' },
  buttonSecondary: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#0F6B8D' },
  buttonText: { color: '#FFFFFF', fontWeight: '900' },
  buttonTextSecondary: { color: '#0F6B8D' },
  auditItem: { color: '#334155', lineHeight: 22, fontWeight: '700' }
});
