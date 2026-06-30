import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export function SupportQueue() {
  const [reportStatus, setReportStatus] = useState('Outstanding');
  const [noteStatus, setNoteStatus] = useState('Not sent');

  return (
    <View style={styles.stack}>
      <View style={styles.panel}>
        <Text style={styles.title}>Support Work Queue</Text>
        <Text style={styles.copy}>Focused work screen for a claim support task.</Text>
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Assigned item</Text>
        <Row label="Reference" value="RAF-2026-014582" />
        <Row label="Task" value="Provide support document" />
        <Row label="Report" value={reportStatus} />
        <Row label="Note" value={noteStatus} />
        <Button label="Mark uploaded" onPress={() => setReportStatus('Uploaded')} />
        <Button label="Send note" onPress={() => setNoteStatus('Sent')} secondary />
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
  buttonTextSecondary: { color: '#0F6B8D' }
});
