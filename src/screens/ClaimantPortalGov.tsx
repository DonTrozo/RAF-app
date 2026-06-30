import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Page = 'Overview' | 'Documents' | 'Messages' | 'Profile';

export function ClaimantPortalGov() {
  const [page, setPage] = useState<Page>('Overview');
  const [progress, setProgress] = useState(42);
  const [notice, setNotice] = useState('Your claim summary is ready.');
  const [docsReceived, setDocsReceived] = useState(false);
  const [sent, setSent] = useState(false);

  function receiveDocs() {
    setDocsReceived(true);
    setProgress(58);
    setNotice('Required documents received. The claim has moved to review.');
    setPage('Documents');
  }

  function sendEnquiry() {
    setSent(true);
    setNotice('Status enquiry added to claim correspondence.');
    setPage('Messages');
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.page}>
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>RAF Connect</Text>
          <Text style={styles.title}>Claimant Portal</Text>
          <Text style={styles.copy}>Digital claim access for status tracking, document submission, correspondence, and profile verification.</Text>
        </View>

        <View style={styles.notice}><Text style={styles.noticeText}>{notice}</Text></View>

        <View style={styles.tabs}>{(['Overview', 'Documents', 'Messages', 'Profile'] as Page[]).map((item) => <TouchableOpacity key={item} onPress={() => setPage(item)} style={[styles.tab, page === item && styles.tabActive]}><Text style={[styles.tabText, page === item && styles.tabTextActive]}>{item}</Text></TouchableOpacity>)}</View>

        {page === 'Overview' && <View style={styles.stack}><View style={styles.grid}><Tile label="Claim reference" value="RAF-2026-014582" onPress={() => setNotice('Claim reference selected.')} /><Tile label="Progress" value={`${progress}%`} onPress={() => setNotice('Current stage: documentation review.')} /><Tile label="Required documents" value={docsReceived ? '0' : '2'} onPress={() => setPage('Documents')} /><Tile label="Correspondence" value={sent ? '2' : '1'} onPress={() => setPage('Messages')} /></View><Panel title="Current claim status"><Row label="Stage" value={docsReceived ? 'Documentation review' : 'Under assessment'} /><Row label="Office" value="Johannesburg Regional Office" /><Row label="Next action" value={docsReceived ? 'Await assessment outcome' : 'Submit required documents'} /></Panel><Button label="Submit required documents" onPress={receiveDocs} /><Button label="Send status enquiry" onPress={sendEnquiry} secondary /></View>}

        {page === 'Documents' && <Panel title="Document register"><TouchableOpacity onPress={() => setNotice('Identity document accepted.')}><Row label="Identity document" value="Accepted" /></TouchableOpacity><TouchableOpacity onPress={() => setNotice('Medical report is under review.')}><Row label="Medical report" value="Under review" /></TouchableOpacity><TouchableOpacity onPress={() => setNotice('Accident report selected.')}><Row label="Accident report" value={docsReceived ? 'Received' : 'Required'} /></TouchableOpacity><TouchableOpacity onPress={() => setNotice('Bank confirmation selected.')}><Row label="Bank confirmation" value={docsReceived ? 'Received' : 'Required'} /></TouchableOpacity><Button label="Submit required documents" onPress={receiveDocs} /></Panel>}

        {page === 'Messages' && <Panel title="Correspondence"><Row label="Claims Office" value="Please submit the required documents." />{sent && <Row label="Claimant" value="Please confirm the latest claim status." />}<Button label="Send status enquiry" onPress={sendEnquiry} /></Panel>}

        {page === 'Profile' && <Panel title="Claimant profile"><Row label="Claimant" value="Registered claimant" /><Row label="Consent" value="Accepted" /><Row label="Identity" value="Verified" /><Row label="Preferred channel" value="Email and SMS" /></Panel>}
      </ScrollView>
    </SafeAreaView>
  );
}

function Tile({ label, value, onPress }: { label: string; value: string; onPress: () => void }) { return <TouchableOpacity onPress={onPress} style={styles.card}><Text style={styles.cardValue}>{value}</Text><Text style={styles.cardLabel}>{label}</Text></TouchableOpacity>; }
function Panel({ title, children }: { title: string; children: React.ReactNode }) { return <View style={styles.panel}><Text style={styles.panelTitle}>{title}</Text>{children}</View>; }
function Row({ label, value }: { label: string; value: string }) { return <View style={styles.row}><Text style={styles.rowLabel}>{label}</Text><Text style={styles.rowValue}>{value}</Text></View>; }
function Button({ label, onPress, secondary }: { label: string; onPress: () => void; secondary?: boolean }) { return <TouchableOpacity onPress={onPress} style={[styles.button, secondary && styles.buttonSecondary]}><Text style={[styles.buttonText, secondary && styles.buttonTextSecondary]}>{label}</Text></TouchableOpacity>; }

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F4F7F9' }, page: { padding: 18, gap: 18, backgroundColor: '#F4F7F9' }, hero: { backgroundColor: '#0F2D3A', borderRadius: 24, padding: 28, gap: 10 }, eyebrow: { color: '#A8DADC', fontSize: 13, fontWeight: '800', letterSpacing: 1 }, title: { color: '#FFFFFF', fontSize: 38, fontWeight: '900' }, copy: { color: '#D8EEF5', fontSize: 16, lineHeight: 24 }, notice: { backgroundColor: '#E7F4F8', borderRadius: 16, padding: 14, borderWidth: 1, borderColor: '#CDE8F1' }, noticeText: { color: '#0F2D3A', fontWeight: '800', lineHeight: 21 }, tabs: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 }, tab: { paddingHorizontal: 14, paddingVertical: 10, borderRadius: 999, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#DDE6EB' }, tabActive: { backgroundColor: '#0F6B8D', borderColor: '#0F6B8D' }, tabText: { color: '#61717C', fontWeight: '900' }, tabTextActive: { color: '#FFFFFF' }, stack: { gap: 18 }, grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 }, card: { flexGrow: 1, flexBasis: 145, backgroundColor: '#FFFFFF', borderRadius: 18, padding: 18, borderWidth: 1, borderColor: '#DDE6EB' }, cardValue: { color: '#0F6B8D', fontSize: 26, fontWeight: '900' }, cardLabel: { color: '#61717C', fontWeight: '800', marginTop: 6 }, panel: { backgroundColor: '#FFFFFF', borderRadius: 20, padding: 18, borderWidth: 1, borderColor: '#DDE6EB', gap: 12 }, panelTitle: { color: '#10212B', fontSize: 22, fontWeight: '900' }, row: { flexDirection: 'row', justifyContent: 'space-between', gap: 12, borderBottomWidth: 1, borderBottomColor: '#EEF3F6', paddingBottom: 10 }, rowLabel: { color: '#61717C', fontWeight: '700' }, rowValue: { color: '#10212B', fontWeight: '900', textAlign: 'right', flex: 1 }, button: { backgroundColor: '#0F6B8D', borderRadius: 16, padding: 15, alignItems: 'center' }, buttonSecondary: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#0F6B8D' }, buttonText: { color: '#FFFFFF', fontWeight: '900' }, buttonTextSecondary: { color: '#0F6B8D' }
});
