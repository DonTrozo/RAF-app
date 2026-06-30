import React, { useMemo, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Tab = 'Home' | 'Documents' | 'Messages' | 'Profile';
type DocStatus = 'Accepted' | 'Under review' | 'Missing' | 'Uploaded';
type DocItem = { name: string; status: DocStatus };

const firstDocuments: DocItem[] = [
  { name: 'Identity document', status: 'Accepted' },
  { name: 'Medical report', status: 'Under review' },
  { name: 'Accident report', status: 'Missing' },
  { name: 'Bank confirmation', status: 'Missing' }
];

export function ClaimantPortal() {
  const [tab, setTab] = useState<Tab>('Home');
  const [progress, setProgress] = useState(42);
  const [stage, setStage] = useState('Under assessment');
  const [documents, setDocuments] = useState(firstDocuments);
  const [sent, setSent] = useState(false);
  const [notice, setNotice] = useState('You are inside the claimant portal. Tap an action to test the flow.');

  const missing = useMemo(() => documents.filter((item) => item.status === 'Missing').length, [documents]);

  function uploadDocs() {
    setDocuments((items) => items.map((item) => item.status === 'Missing' ? { ...item, status: 'Uploaded' } : item));
    setProgress(58);
    setStage('Documents uploaded');
    setNotice('Upload simulated. Missing documents moved to Uploaded and progress increased.');
    setTab('Documents');
  }

  function requestUpdate() {
    setNotice('Status request simulated. This would message the claims office in production.');
    setTab('Messages');
  }

  function sendMessage() {
    setSent(true);
    setNotice('Message simulated. Your message appears in the thread.');
  }

  function resetDemo() {
    setProgress(42);
    setStage('Under assessment');
    setDocuments(firstDocuments);
    setSent(false);
    setNotice('Demo reset.');
    setTab('Home');
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.page}>
        <View style={styles.hero}><Text style={styles.eyebrow}>RAF Connect</Text><Text style={styles.title}>Claimant Portal</Text><Text style={styles.copy}>Interactive demo for onboarding, tracking, documents, messages, and profile actions.</Text></View>
        <View style={styles.notice}><Text style={styles.noticeText}>{notice}</Text></View>
        <View style={styles.tabs}>{(['Home', 'Documents', 'Messages', 'Profile'] as Tab[]).map((item) => <TouchableOpacity key={item} onPress={() => setTab(item)} style={[styles.tab, tab === item && styles.tabActive]}><Text style={[styles.tabText, tab === item && styles.tabTextActive]}>{item}</Text></TouchableOpacity>)}</View>

        {tab === 'Home' && <View style={styles.stack}><View style={styles.grid}><Card label="Active reference" value="RAF-2026-014582" /><Card label="Progress" value={`${progress}%`} /><Card label="Missing docs" value={missing.toString()} /><Card label="Messages" value={sent ? '2' : '1'} /></View><Panel title="Current status"><Row label="Stage" value={stage} /><Row label="Office" value="Johannesburg Regional Office" /><Row label="Next action" value={missing > 0 ? 'Upload missing documents' : 'Wait for review'} /></Panel><Button label="Upload missing documents" onPress={uploadDocs} /><Button label="Request status update" onPress={requestUpdate} secondary /></View>}
        {tab === 'Documents' && <Panel title="Documents">{documents.map((item) => <Row key={item.name} label={item.name} value={item.status} />)}<Button label="Simulate upload" onPress={uploadDocs} /></Panel>}
        {tab === 'Messages' && <Panel title="Messages"><Row label="RAF Claims Office" value="Please upload the accident report." />{sent && <Row label="You" value="Please confirm my latest claim status." />}<Button label="Send status message" onPress={sendMessage} /></Panel>}
        {tab === 'Profile' && <Panel title="Profile and consent"><Row label="Claimant" value="Demo Claimant" /><Row label="POPIA consent" value="Accepted" /><Row label="Identity" value="Verified placeholder" /><Button label="Reset demo" onPress={resetDemo} secondary /></Panel>}
      </ScrollView>
    </SafeAreaView>
  );
}

function Card({ label, value }: { label: string; value: string }) { return <View style={styles.card}><Text style={styles.cardValue}>{value}</Text><Text style={styles.cardLabel}>{label}</Text></View>; }
function Panel({ title, children }: { title: string; children: React.ReactNode }) { return <View style={styles.panel}><Text style={styles.panelTitle}>{title}</Text>{children}</View>; }
function Row({ label, value }: { label: string; value: string }) { return <View style={styles.row}><Text style={styles.rowLabel}>{label}</Text><Text style={styles.rowValue}>{value}</Text></View>; }
function Button({ label, onPress, secondary }: { label: string; onPress: () => void; secondary?: boolean }) { return <TouchableOpacity onPress={onPress} style={[styles.button, secondary && styles.buttonSecondary]}><Text style={[styles.buttonText, secondary && styles.buttonTextSecondary]}>{label}</Text></TouchableOpacity>; }

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F4F7F9' }, page: { padding: 18, gap: 18, backgroundColor: '#F4F7F9' }, hero: { backgroundColor: '#0F2D3A', borderRadius: 24, padding: 28, gap: 10 }, eyebrow: { color: '#A8DADC', fontSize: 13, fontWeight: '800', letterSpacing: 1 }, title: { color: '#FFFFFF', fontSize: 38, fontWeight: '900' }, copy: { color: '#D8EEF5', fontSize: 16, lineHeight: 24 }, notice: { backgroundColor: '#E7F4F8', borderRadius: 16, padding: 14, borderWidth: 1, borderColor: '#CDE8F1' }, noticeText: { color: '#0F2D3A', fontWeight: '800', lineHeight: 21 }, tabs: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 }, tab: { paddingHorizontal: 14, paddingVertical: 10, borderRadius: 999, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#DDE6EB' }, tabActive: { backgroundColor: '#0F6B8D', borderColor: '#0F6B8D' }, tabText: { color: '#61717C', fontWeight: '900' }, tabTextActive: { color: '#FFFFFF' }, stack: { gap: 18 }, grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 }, card: { flexGrow: 1, flexBasis: 145, backgroundColor: '#FFFFFF', borderRadius: 18, padding: 18, borderWidth: 1, borderColor: '#DDE6EB' }, cardValue: { color: '#0F6B8D', fontSize: 26, fontWeight: '900' }, cardLabel: { color: '#61717C', fontWeight: '800', marginTop: 6 }, panel: { backgroundColor: '#FFFFFF', borderRadius: 20, padding: 18, borderWidth: 1, borderColor: '#DDE6EB', gap: 12 }, panelTitle: { color: '#10212B', fontSize: 22, fontWeight: '900' }, row: { flexDirection: 'row', justifyContent: 'space-between', gap: 12, borderBottomWidth: 1, borderBottomColor: '#EEF3F6', paddingBottom: 10 }, rowLabel: { color: '#61717C', fontWeight: '700' }, rowValue: { color: '#10212B', fontWeight: '900', textAlign: 'right', flex: 1 }, button: { backgroundColor: '#0F6B8D', borderRadius: 16, padding: 15, alignItems: 'center' }, buttonSecondary: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#0F6B8D' }, buttonText: { color: '#FFFFFF', fontWeight: '900' }, buttonTextSecondary: { color: '#0F6B8D' }
});
