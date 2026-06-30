import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export function SupportQueue() {
  const [reportStatus, setReportStatus] = useState('Outstanding');
  const [noteStatus, setNoteStatus] = useState('Not submitted');
  const [selected, setSelected] = useState('Select a work item to view details.');

  return (
    <View style={styles.stack}>
      <View style={styles.panel}>
        <Text style={styles.title}>Service Provider Workbench</Text>
        <Text style={styles.copy}>Authorised providers can manage allocated claim tasks, submit supporting documents, and update work notes.</Text>
      </View>

      <View style={styles.notice}><Text style={styles.noticeText}>{selected}</Text></View>

      <View style={styles.grid}>
        <Tile label="Allocated tasks" value="8" onPress={() => setSelected('Allocated task queue selected.')} />
        <Tile label="Due today" value="3" onPress={() => setSelected('Due today queue selected.')} />
        <Tile label="Submitted" value="12" onPress={() => setSelected('Submitted work queue selected.')} />
        <Tile label="Returned" value="1" onPress={() => setSelected('Returned work queue selected.')} />
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Assigned work item</Text>
        <Row label="Reference" value="RAF-2026-014582" />
        <Row label="Task" value="Provide accident report" />
        <Row label="Document status" value={reportStatus} />
        <Row label="Work note" value={noteStatus} />
        <Button label="Mark document submitted" onPress={() => { setReportStatus('Submitted'); setSelected('Document submission recorded.'); }} />
        <Button label="Submit work note" onPress={() => { setNoteStatus('Submitted'); setSelected('Work note submitted.'); }} secondary />
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
  notice: { backgroundColor: '#E7F4F8', borderRadius: 16, padding: 14, borderWidth: 1, borderColor: '#CDE8F1' },
  noticeText: { color: '#0F2D3A', fontWeight: '800' },
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
