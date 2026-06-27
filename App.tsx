import React, { useMemo, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { claims, documents, messages, notifications, appointments } from './src/mockData';
import { ClaimStage } from './src/types';

const tabs = [
  { key: 'dashboard', label: 'Home', icon: 'home-outline' },
  { key: 'timeline', label: 'Timeline', icon: 'git-branch-outline' },
  { key: 'documents', label: 'Docs', icon: 'document-text-outline' },
  { key: 'messages', label: 'Messages', icon: 'chatbubbles-outline' },
  { key: 'profile', label: 'Profile', icon: 'person-outline' },
] as const;

type TabKey = (typeof tabs)[number]['key'];

const stageOrder: ClaimStage[] = [
  'Claim registered',
  'Documents pending',
  'Documents received',
  'Under assessment',
  'Medical review',
  'Legal review',
  'Awaiting decision',
  'Approved',
  'Payment processing',
  'Paid',
];

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('dashboard');
  const activeClaim = claims[0];

  const completedStageIndex = useMemo(
    () => Math.max(stageOrder.findIndex((stage) => stage === activeClaim.currentStage), 0),
    [activeClaim.currentStage]
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ExpoStatusBar style="light" />
      <StatusBar barStyle="light-content" />
      <View style={styles.appShell}>
        <View style={styles.header}>
          <View>
            <Text style={styles.headerEyebrow}>RAF Connect</Text>
            <Text style={styles.headerTitle}>Claimant Portal</Text>
          </View>
          <View style={styles.secureBadge}>
            <Ionicons name="shield-checkmark-outline" size={16} color="#D7FBE8" />
            <Text style={styles.secureBadgeText}>POPIA Secure</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {activeTab === 'dashboard' && (
            <Dashboard activeClaim={activeClaim} completedStageIndex={completedStageIndex} />
          )}
          {activeTab === 'timeline' && (
            <Timeline activeClaim={activeClaim} completedStageIndex={completedStageIndex} />
          )}
          {activeTab === 'documents' && <Documents />}
          {activeTab === 'messages' && <Messages />}
          {activeTab === 'profile' && <Profile />}
        </ScrollView>

        <View style={styles.navBar}>
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <TouchableOpacity
                key={tab.key}
                style={[styles.navItem, isActive && styles.navItemActive]}
                onPress={() => setActiveTab(tab.key)}
              >
                <Ionicons
                  name={tab.icon}
                  size={21}
                  color={isActive ? '#0B4F6C' : '#7A8792'}
                />
                <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>{tab.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}

function Dashboard({
  activeClaim,
  completedStageIndex,
}: {
  activeClaim: (typeof claims)[number];
  completedStageIndex: number;
}) {
  const missingDocs = documents.filter((document) => document.status === 'Missing');
  const urgentNotifications = notifications.filter((notification) => notification.priority === 'High');

  return (
    <View style={styles.screen}>
      <View style={styles.cardHero}>
        <Text style={styles.heroLabel}>Active claim</Text>
        <Text style={styles.heroRef}>{activeClaim.reference}</Text>
        <View style={styles.statusPill}>
          <Ionicons name="time-outline" size={16} color="#0B4F6C" />
          <Text style={styles.statusPillText}>{activeClaim.currentStage}</Text>
        </View>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${activeClaim.progress}%` }]} />
        </View>
        <Text style={styles.progressText}>{activeClaim.progress}% complete</Text>
      </View>

      <View style={styles.quickGrid}>
        <MetricCard title="Missing docs" value={missingDocs.length.toString()} icon="alert-circle-outline" />
        <MetricCard title="Updates" value={notifications.length.toString()} icon="notifications-outline" />
        <MetricCard title="Appointments" value={appointments.length.toString()} icon="calendar-outline" />
        <MetricCard title="Messages" value={messages.length.toString()} icon="mail-outline" />
      </View>

      <Section title="Next action" action="Upload now">
        <View style={styles.actionBox}>
          <Ionicons name="cloud-upload-outline" size={26} color="#0B4F6C" />
          <View style={styles.flexOne}>
            <Text style={styles.actionTitle}>Submit outstanding documents</Text>
            <Text style={styles.actionText}>
              RAF needs {missingDocs.map((document) => document.name).join(' and ')} before the claim can move forward.
            </Text>
          </View>
        </View>
      </Section>

      <Section title="Recent updates">
        {urgentNotifications.map((notification) => (
          <ListItem
            key={notification.id}
            icon="warning-outline"
            title={notification.title}
            subtitle={notification.body}
            tag={notification.priority}
          />
        ))}
      </Section>

      <Section title="Current progress">
        <MiniTimeline completedStageIndex={completedStageIndex} />
      </Section>
    </View>
  );
}

function Timeline({
  activeClaim,
  completedStageIndex,
}: {
  activeClaim: (typeof claims)[number];
  completedStageIndex: number;
}) {
  return (
    <View style={styles.screen}>
      <ScreenIntro
        title="Claim timeline"
        subtitle="Track every major step from registration to payment. Only claimant-safe statuses are shown here."
      />
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{activeClaim.reference}</Text>
        <Text style={styles.mutedText}>Accident date: {activeClaim.accidentDate}</Text>
        <Text style={styles.mutedText}>Assigned office: {activeClaim.assignedOffice}</Text>
      </View>
      <View style={styles.timelineList}>
        {stageOrder.map((stage, index) => {
          const done = index <= completedStageIndex;
          const current = index === completedStageIndex;
          return (
            <View key={stage} style={styles.timelineRow}>
              <View style={[styles.timelineDot, done && styles.timelineDotDone]}>
                {done && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
              </View>
              <View style={styles.timelineContent}>
                <Text style={[styles.timelineTitle, current && styles.timelineTitleCurrent]}>{stage}</Text>
                <Text style={styles.timelineSubtitle}>
                  {current ? 'Current claim stage' : done ? 'Completed' : 'Pending'}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

function Documents() {
  return (
    <View style={styles.screen}>
      <ScreenIntro
        title="Document vault"
        subtitle="Upload and track the status of claim documents. This MVP uses mock upload actions."
      />
      <TouchableOpacity style={styles.primaryButton}>
        <Ionicons name="cloud-upload-outline" size={19} color="#FFFFFF" />
        <Text style={styles.primaryButtonText}>Upload document</Text>
      </TouchableOpacity>
      <Section title="Required documents">
        {documents.map((document) => (
          <ListItem
            key={document.id}
            icon={document.status === 'Accepted' ? 'checkmark-circle-outline' : 'document-attach-outline'}
            title={document.name}
            subtitle={document.description}
            tag={document.status}
          />
        ))}
      </Section>
    </View>
  );
}

function Messages() {
  return (
    <View style={styles.screen}>
      <ScreenIntro
        title="Messages"
        subtitle="Secure communication between the claimant and RAF officials."
      />
      <Section title="Inbox">
        {messages.map((message) => (
          <ListItem
            key={message.id}
            icon="chatbubble-ellipses-outline"
            title={message.sender}
            subtitle={message.preview}
            tag={message.time}
          />
        ))}
      </Section>
      <Section title="Appointments">
        {appointments.map((appointment) => (
          <ListItem
            key={appointment.id}
            icon="calendar-outline"
            title={appointment.title}
            subtitle={`${appointment.date} • ${appointment.location}`}
            tag={appointment.status}
          />
        ))}
      </Section>
    </View>
  );
}

function Profile() {
  return (
    <View style={styles.screen}>
      <ScreenIntro
        title="Profile"
        subtitle="Claimant identity, beneficiary information, and consent controls."
      />
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>DT</Text>
        </View>
        <View style={styles.flexOne}>
          <Text style={styles.profileName}>Demo Claimant</Text>
          <Text style={styles.mutedText}>ID verified placeholder</Text>
        </View>
      </View>
      <Section title="Security controls">
        <ListItem icon="lock-closed-outline" title="POPIA consent" subtitle="Accepted for claim processing" tag="Active" />
        <ListItem icon="finger-print-outline" title="Biometric login" subtitle="Placeholder for production integration" tag="Planned" />
        <ListItem icon="people-outline" title="Beneficiary management" subtitle="Add family or legal representatives" tag="MVP" />
      </Section>
    </View>
  );
}

function MetricCard({ title, value, icon }: { title: string; value: string; icon: keyof typeof Ionicons.glyphMap }) {
  return (
    <View style={styles.metricCard}>
      <Ionicons name={icon} size={22} color="#0B4F6C" />
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricTitle}>{title}</Text>
    </View>
  );
}

function Section({
  title,
  action,
  children,
}: {
  title: string;
  action?: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {action && <Text style={styles.sectionAction}>{action}</Text>}
      </View>
      {children}
    </View>
  );
}

function ScreenIntro({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <View style={styles.screenIntro}>
      <Text style={styles.screenTitle}>{title}</Text>
      <Text style={styles.screenSubtitle}>{subtitle}</Text>
    </View>
  );
}

function ListItem({
  icon,
  title,
  subtitle,
  tag,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  tag?: string;
}) {
  return (
    <View style={styles.listItem}>
      <View style={styles.listIcon}>
        <Ionicons name={icon} size={20} color="#0B4F6C" />
      </View>
      <View style={styles.flexOne}>
        <Text style={styles.listTitle}>{title}</Text>
        <Text style={styles.listSubtitle}>{subtitle}</Text>
      </View>
      {tag && <Text style={styles.tag}>{tag}</Text>}
    </View>
  );
}

function MiniTimeline({ completedStageIndex }: { completedStageIndex: number }) {
  return (
    <View style={styles.miniTimeline}>
      {stageOrder.slice(0, 6).map((stage, index) => (
        <View key={stage} style={styles.miniStep}>
          <View style={[styles.miniDot, index <= completedStageIndex && styles.miniDotDone]} />
          <Text style={styles.miniText}>{stage}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#073B4C' },
  appShell: { flex: 1, backgroundColor: '#F4F7FA' },
  header: {
    backgroundColor: '#073B4C',
    paddingHorizontal: 20,
    paddingBottom: 22,
    paddingTop: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerEyebrow: { color: '#A8DADC', fontSize: 13, fontWeight: '700', letterSpacing: 0.8 },
  headerTitle: { color: '#FFFFFF', fontSize: 26, fontWeight: '800', marginTop: 3 },
  secureBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 999,
  },
  secureBadgeText: { color: '#D7FBE8', fontSize: 12, fontWeight: '700' },
  content: { padding: 18, paddingBottom: 110 },
  screen: { gap: 18 },
  cardHero: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#001219',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 20,
    elevation: 4,
  },
  heroLabel: { color: '#7A8792', fontSize: 13, fontWeight: '700', textTransform: 'uppercase' },
  heroRef: { color: '#102A43', fontSize: 30, fontWeight: '900', marginVertical: 8 },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    backgroundColor: '#E7F6FA',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  statusPillText: { color: '#0B4F6C', fontSize: 13, fontWeight: '800' },
  progressTrack: { height: 10, backgroundColor: '#E6EDF2', borderRadius: 999, marginTop: 18, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#2A9D8F', borderRadius: 999 },
  progressText: { marginTop: 8, color: '#52616B', fontWeight: '700' },
  quickGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  metricCard: {
    width: '47.8%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    gap: 6,
    borderWidth: 1,
    borderColor: '#E6EDF2',
  },
  metricValue: { color: '#102A43', fontSize: 24, fontWeight: '900' },
  metricTitle: { color: '#64748B', fontWeight: '700' },
  section: { gap: 10 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { color: '#102A43', fontSize: 18, fontWeight: '900' },
  sectionAction: { color: '#0B4F6C', fontWeight: '800' },
  actionBox: {
    flexDirection: 'row',
    gap: 14,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#D9E8EF',
  },
  actionTitle: { color: '#102A43', fontSize: 16, fontWeight: '900' },
  actionText: { color: '#52616B', lineHeight: 20, marginTop: 3 },
  flexOne: { flex: 1 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 20, padding: 16, borderWidth: 1, borderColor: '#E6EDF2' },
  cardTitle: { color: '#102A43', fontSize: 18, fontWeight: '900', marginBottom: 6 },
  mutedText: { color: '#64748B', lineHeight: 21 },
  screenIntro: { gap: 6 },
  screenTitle: { color: '#102A43', fontSize: 28, fontWeight: '900' },
  screenSubtitle: { color: '#52616B', fontSize: 15, lineHeight: 22 },
  timelineList: { backgroundColor: '#FFFFFF', borderRadius: 22, padding: 16, borderWidth: 1, borderColor: '#E6EDF2' },
  timelineRow: { flexDirection: 'row', gap: 12, paddingVertical: 10 },
  timelineDot: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#DCE6EC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timelineDotDone: { backgroundColor: '#2A9D8F' },
  timelineContent: { flex: 1, borderBottomWidth: 1, borderBottomColor: '#EEF3F6', paddingBottom: 10 },
  timelineTitle: { color: '#475569', fontWeight: '800' },
  timelineTitleCurrent: { color: '#0B4F6C', fontSize: 16 },
  timelineSubtitle: { color: '#7A8792', marginTop: 3 },
  primaryButton: {
    backgroundColor: '#0B4F6C',
    borderRadius: 18,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  primaryButtonText: { color: '#FFFFFF', fontWeight: '900', fontSize: 16 },
  listItem: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E6EDF2',
  },
  listIcon: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: '#E7F6FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listTitle: { color: '#102A43', fontWeight: '900', fontSize: 15 },
  listSubtitle: { color: '#64748B', marginTop: 3, lineHeight: 19 },
  tag: {
    color: '#0B4F6C',
    backgroundColor: '#E7F6FA',
    overflow: 'hidden',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 999,
    fontSize: 11,
    fontWeight: '900',
  },
  miniTimeline: { backgroundColor: '#FFFFFF', borderRadius: 18, padding: 14, borderWidth: 1, borderColor: '#E6EDF2' },
  miniStep: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 7 },
  miniDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#DCE6EC' },
  miniDotDone: { backgroundColor: '#2A9D8F' },
  miniText: { color: '#52616B', fontWeight: '700' },
  profileCard: { flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: '#FFFFFF', borderRadius: 22, padding: 16 },
  avatar: { width: 62, height: 62, borderRadius: 31, backgroundColor: '#0B4F6C', alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#FFFFFF', fontSize: 20, fontWeight: '900' },
  profileName: { color: '#102A43', fontSize: 20, fontWeight: '900' },
  navBar: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#001219',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 8,
  },
  navItem: { flex: 1, alignItems: 'center', paddingVertical: 8, borderRadius: 18, gap: 3 },
  navItemActive: { backgroundColor: '#E7F6FA' },
  navLabel: { color: '#7A8792', fontSize: 11, fontWeight: '800' },
  navLabelActive: { color: '#0B4F6C' },
});
