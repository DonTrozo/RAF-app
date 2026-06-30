import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export function AdminPortal() {
  const [status, setStatus] = useState('Under assessment');
  const [provider, setProvider] = useState('Not allocated');
  const [audit, setAudit] = useState(['Claim RAF-2026-014582 opened by operations user']);

  function validateClaim() {
    setStatus('Validated for medical review');
    setAudit((items) => ['Claim validated for medical review', ...items]);
  }

  function allocateProvider() {
    setProvider('Allocated');
    setAudit((items) => ['Service provider allocated for document support', ...items]);
  }

  function requestClarification() {
    setStatus('Clarification requested');
    setAudit((items) => ['Clarification requested from claimant', ...items]);
  }

  return (
    <View style={styles.stack}>
      <View style={styles.panel}>
        <Text style={styles.title}>RAF Operations</Text>
        <Text style={styles.copy}>Operational view for claim review, document validation, service allocation, and audit tracking.</Text>
      </View>

      <View style={styles.grid}>
        <Tile label="Open claims" value="128" onPress={() => setAudit((items) => ['Open claims queue selected', ...items])} />
        <Tile label="High priority" value="14" onPress={() => setAudit((items) => ['High priority queue selected', ...items])} />
        <Tile label="Awaiting docs" value="37" onPress={() => setAudit((items) => ['Awaiting documents queue selected', ...items])} />
        <Tile label="Ready for review" value="22" onPress={() => setAudit((items) => ['Review queue selected', ...items])} />
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Claim work item</Text>
        <Row label="Reference" value="RAF-2026-014582" />
        <Row label="Claimant" value="Registered claimant" />
        <Row label="Status" value={status} />
        <Row label="Service provider" value={provider} />
        <Button label="Validate claim" onPress={validateClaim} />
        <Button label="Allocate service provider" onPress={allocateProvider} secondary />
        <Button label="Request clarification" onPress={requestClarification} secondary />
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Audit trail</Text>
        {audit.map((item, index) => <Text key={`${item}-${index}`} style={styles.auditItem}>• {item}</Text>)}
      </View>
    </View>
  );
}

function Tile({ label, value, onPress }: { label: string; value: string; onPress: () => void }) { return <TouchableOpacity onPress={onPress} style={styles.tile}><Text style={styles.tileValue}>{value}</Text><Text style={styles.tileLabel}>{label}</Text></TouchableOpacity>; }
function Row({ label, value }: { label: string; value: string }) { return <View style={styles.row}><Text style={styles.label}>{label}</Text><Text style={styles.value}>{value}</Text></View>; }
function Button({ label, onPress, secondary }: { label: string; onPress: () => void; secondary?: boolean }) { return <TouchableOpacity onPress={onPress} style={[styles.button, secondary && styles.buttonSecondary]}><Text style={[styles.buttonText, secondary && styles.buttonTextSecondary]}>{label}</Text></TouchableOpacity>; }

const styles = StyleSheet.create({
  stack: { gap: 18 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  tile: { flexGrow: 1, flexBasis: 145, backgroundColor: '#FFFFFF', borderRadius: 18, padding: 18, borderWidth: 1, borderColor: '#DDE6EB' },
  tileValue: { color: '#0F6B8D', fontSize: 26, fontWeight: '900' },
  tileLabel: { color: '#61717C', fontWeight: '800', marginTop: 6 },
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
