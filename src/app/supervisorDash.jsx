import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

// --- Theme Colors ---
const COLORS = {
  primary: '#2563EB', // Bright blue
  darkBlue: '#1E3A8A', // Dark blue text
  textMain: '#111827',
  textMuted: '#6B7280',
  bg: '#F8FAFC',
  card: '#FFFFFF',
  border: '#E5E7EB',
  pendingBg: '#FEF3C7',
  pendingText: '#D97706',
  iconBg: '#EFF6FF',
};

// --- Mock Data ---
const metrics = [
  { id: 1, title: 'PENDING APPROVALS', value: '1', icon: 'clock', color: COLORS.primary },
  { id: 2, title: 'APPROVED', value: '6', icon: 'check-circle', color: COLORS.primary },
  { id: 3, title: 'ASSISTANTS', value: '3', icon: 'users', color: COLORS.primary },
  { id: 4, title: 'TOTAL REQUESTS', value: '15', icon: 'clipboard', color: COLORS.primary },
];

// --- Main Component ---
export default function SupervisorDashboard() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* --- HEADER --- */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.themeToggle} onPress={toggleTheme}>
          <Feather name={isDarkMode ? 'sun' : 'moon'} size={16} color={COLORS.textMuted} />
          <Text style={styles.themeText}>
            Change mode <Text style={{ color: '#F59E0B' }}>{isDarkMode ? 'Light' : 'Dark'}</Text>
          </Text>
        </TouchableOpacity>

        <View style={styles.userProfile}>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Sbongile Monta</Text>
            <Text style={styles.userRole}>Supervisor</Text>
          </View>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>SM</Text>
          </View>
        </View>
      </View>

      {/* --- MAIN SCROLLABLE CONTENT --- */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>SUPERVISOR PORTAL</Text>
          </View>
          <Text style={styles.heroTitle}>Supervisor dashboard</Text>
          <Text style={styles.heroSubtitle}>
            Monitor incoming student assistant requests and keep operational decisions synchronized.
          </Text>
        </View>

        {/* Metrics Grid (2x2) */}
        <View style={styles.metricsGrid}>
          {metrics.map((item) => (
            <View key={item.id} style={styles.metricCard}>
              <View style={styles.metricHeader}>
                <Text style={styles.metricTitle}>{item.title}</Text>
                <Feather name={item.icon} size={16} color={COLORS.primary} />
              </View>
              <Text style={styles.metricValue}>{item.value}</Text>
            </View>
          ))}
        </View>

        {/* Awaiting Review Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>AWAITING YOUR REVIEW</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>VIEW ALL</Text>
          </TouchableOpacity>
        </View>

        {/* Request Item */}
        <View style={styles.requestCard}>
          <View style={styles.requestInfo}>
            <Text style={styles.requestName}>Peter Thomas</Text>
            <Text style={styles.requestDetails}>Personal Issues · Oct 12, 2026 - Oct 13, 2026</Text>
          </View>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>Pending</Text>
          </View>
        </View>

        {/* Operational Note */}
        <View style={styles.noteSection}>
          <Text style={styles.noteTitle}>Operational note</Text>
          <Text style={styles.noteDesc}>
            Approvals and rejections made from Operational Requests are written to the shared request store, so the student dashboard and history reflect the latest decision.
          </Text>
        </View>

        {/* Workflow Card */}
        <View style={styles.workflowCard}>
          <View style={styles.workflowIcon}>
            <Feather name="refresh-cw" size={20} color={COLORS.primary} />
          </View>
          <View style={styles.workflowTextContainer}>
            <Text style={styles.workflowTitle}>Current workflow</Text>
            <Text style={styles.workflowSteps}>STUDENT → SUPERVISOR → STUDENT</Text>
          </View>
        </View>

        {/* Bottom Padding for Bottom Nav */}
        <View style={{ height: 80 }} />
      </ScrollView>

      {/* --- BOTTOM NAVIGATION BAR (Converted from Side Panel) --- */}
      <View style={styles.bottomNav}>
        {[
          { name: 'Dashboard', icon: 'grid' },
          { name: 'Calendar', icon: 'calendar' },
          { name: 'Requests', icon: 'file-text' },
          { name: 'Assistances', icon: 'users' },
          { name: 'Reports', icon: 'bar-chart-2' },
        ].map((item) => (
          <TouchableOpacity
            key={item.name}
            style={styles.navItem}
            onPress={() => setActiveTab(item.name)}
          >
            <Feather
              name={item.icon}
              size={20}
              color={activeTab === item.name ? COLORS.primary : COLORS.textMuted}
            />
            <Text
              style={[
                styles.navText,
                activeTab === item.name && styles.navTextActive,
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.card,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  themeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  themeText: {
    marginLeft: 6,
    fontSize: 12,
    color: COLORS.textMuted,
  },
  userProfile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInfo: {
    alignItems: 'flex-end',
    marginRight: 8,
  },
  userName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.textMain,
  },
  userRole: {
    fontSize: 10,
    color: COLORS.textMuted,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  // Scroll Content
  scrollContent: {
    padding: 16,
  },
  // Hero Section
  heroSection: {
    marginBottom: 20,
  },
  tag: {
    backgroundColor: COLORS.iconBg,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.primary,
    letterSpacing: 1,
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.darkBlue,
    fontFamily: 'serif',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 14,
    color: COLORS.textMuted,
    lineHeight: 20,
  },
  // Metrics Grid
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  metricCard: {
    width: '48%',
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.textMain,
    letterSpacing: 0.5,
  },
  metricValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.darkBlue,
  },
  // Awaiting Review
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.textMain,
    letterSpacing: 1,
  },
  viewAllText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.textMain,
  },
  requestCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24,
  },
  requestInfo: {
    flex: 1,
  },
  requestName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textMain,
    marginBottom: 4,
  },
  requestDetails: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  statusBadge: {
    backgroundColor: COLORS.pendingBg,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: COLORS.pendingText,
    fontSize: 12,
    fontWeight: 'bold',
  },
  // Operational Note
  noteSection: {
    marginBottom: 24,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: COLORS.textMain,
    marginBottom: 8,
  },
  noteDesc: {
    fontSize: 13,
    color: COLORS.textMuted,
    lineHeight: 20,
  },
  // Workflow Card
  workflowCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  workflowIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.iconBg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  workflowTextContainer: {
    flex: 1,
  },
  workflowTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.textMain,
    marginBottom: 4,
  },
  workflowSteps: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.textMain,
    letterSpacing: 0.5,
  },
  // Bottom Navigation Bar
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingVertical: 10,
    paddingBottom: 20, // For safe area on newer iPhones
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
  },
  navText: {
    fontSize: 10,
    color: COLORS.textMuted,
    marginTop: 4,
  },
  navTextActive: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
});