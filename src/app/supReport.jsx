import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

// --- Theme Colors ---
const COLORS = {
  primary: '#2563EB',
  darkBlue: '#1E3A8A',
  textMain: '#111827',
  textMuted: '#6B7280',
  bg: '#F8FAFC',
  card: '#FFFFFF',
  border: '#E5E7EB',
  danger: '#EF4444',
  success: '#10B981',
  rejectedBg: '#FEE2E2',
  rejectedText: '#EF4444',
  staffCardBg: '#DBEAFE', // Light blue for staff cards
  staffCardBorder: '#BFDBFE',
};

// --- Mock Data ---
const shiftData = [
  {
    id: '1',
    name: 'Peter Thomas',
    position: 'Library Assistant',
    date: '2026-09-30',
    time: '08:00 AM - 04:00 PM',
    duration: '4 hours',
  },
];

const requestData = [
  {
    id: '1',
    name: 'Nothando Nkosi',
    request: 'Sick Leave',
    date: 'Oct 5, 2026 – Oct 5, 2026',
    status: 'Rejected',
  },
  {
    id: '2',
    name: 'Peter Thomas',
    request: 'Day-off Request',
    date: 'Sep 30, 2026 – Sep 30, 2026',
    status: 'Rejected',
  },
];

const staffData = [
  { id: '1', initials: 'SM', name: 'Simphiwe Masanabo', hours: '0.0h', requests: '0', location: 'CIRCULAR 2', days: '0 days' },
  { id: '2', initials: 'SL', name: 'Segomoto Lencwe', hours: '0.0h', requests: '0', location: 'ICENTER', days: '0 days' },
  { id: '3', initials: 'ST', name: 'Shoba Thabiso', hours: '0.0h', requests: '0', location: 'ICENTER', days: '0 days' },
  { id: '4', initials: 'MS', name: 'Mawelela Sibusiso', hours: '0.0h', requests: '0', location: 'ICENTER', days: '0 days' },
  { id: '5', initials: 'MB', name: 'Mashabela Basetsana', hours: '0.0h', requests: '0', location: 'ICENTER2', days: '0 days' },
  { id: '6', initials: 'JD', name: 'Jiyane Duduzile', hours: '0.0h', requests: '0', location: 'ICENTER', days: '0 days' },
  { id: '7', initials: 'PT', name: 'Peter Thomas', hours: '4.0h', requests: '1', location: 'LIBRARY ASSISTANT', days: '1 days' },
  { id: '8', initials: 'NN', name: 'Nothando Nkosi', hours: '0.0h', requests: '1', location: '—', days: '0 days' },
];

export default function PerformanceReports() {
  const [activeTab, setActiveTab] = useState('Reports');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Background Image with 70% White Overlay */}
      <ImageBackground 
        source={{ uri: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1590&auto=format&fit=crop' }} 
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay} />

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          
          {/* --- HEADER --- */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.themeToggle}>
              <Feather name="moon" size={16} color={COLORS.textMuted} />
              <Text style={styles.themeText}>
                Change mode <Text style={{ color: '#F59E0B' }}>Dark</Text>
              </Text>
            </TouchableOpacity>

            <View style={styles.userProfile}>
              <View style={styles.userInfo}>
                <Text style={styles.userName}>Sbongile Monta</Text>
                <Text style={styles.userRole}>Supervisor</Text>
              </View>
              <View style={styles.avatarSmall}>
                <Text style={styles.avatarSmallText}>SM</Text>
              </View>
            </View>
          </View>

          {/* --- TITLE SECTION --- */}
          <View style={styles.titleSection}>
            <Text style={styles.pageTitle}>Performance Reports</Text>
            <Text style={styles.pageSubtitle}>
              Review and analyze student activity and work efficiency metrics. Use the period filter to generate details for today, the current month, the last 7 days, or a specific date range.
            </Text>
            
            <View style={styles.actionButtonsRow}>
              <TouchableOpacity style={styles.exportButton}>
                <Feather name="download" size={14} color={COLORS.textMain} />
                <Text style={styles.exportText}>Export CSV</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.generateButton}>
                <Feather name="file-text" size={14} color="#FFF" />
                <Text style={styles.generateText}>Generate New Report</Text>
                <Feather name="chevron-down" size={14} color="#FFF" />
              </TouchableOpacity>
            </View>
          </View>

          {/* --- STATS ROW --- */}
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>TOTAL HOURS</Text>
              <Text style={styles.statValue}>4.0h</Text>
              <Feather name="bar-chart-2" size={14} color={COLORS.primary} style={styles.statIcon} />
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>REQUESTS IN PERIOD</Text>
              <Text style={styles.statValue}>2</Text>
              <Feather name="file-text" size={14} color={COLORS.primary} style={styles.statIcon} />
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>ASSISTANTS WITH REQUESTS</Text>
              <Text style={styles.statValue}>2</Text>
              <Feather name="users" size={14} color={COLORS.primary} style={styles.statIcon} />
            </View>
          </View>

          {/* --- FILTER BAR --- */}
          <View style={styles.filterContainer}>
            <View style={styles.searchContainer}>
              <Feather name="search" size={16} color={COLORS.textMuted} style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Filter by student name or role..."
                placeholderTextColor="#9CA3AF"
              />
            </View>
            <View style={styles.filterActions}>
              <TouchableOpacity style={styles.filterButton}>
                <Feather name="filter" size={12} color={COLORS.textMain} />
                <Text style={styles.filterText}>Filters</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterButton}>
                <Feather name="calendar" size={12} color={COLORS.textMain} />
                <Text style={styles.filterText}>Last 7 Days</Text>
                <Feather name="chevron-down" size={12} color={COLORS.textMain} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Date Range Info */}
          <View style={styles.dateRangeContainer}>
            <Text style={styles.dateRangeText}>
              Report details for: <Text style={styles.dateRangeHighlight}>30 Sep 2026 – 06 Oct 2026</Text>
            </Text>
          </View>

          {/* --- SHIFT DETAILS TABLE (Converted to Cards) --- */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Shift details in selected period</Text>
            <Text style={styles.sectionSubtitle}>Every scheduled shift contributes its duration to the report totals.</Text>
            
            {shiftData.map((item) => (
              <View key={item.id} style={styles.tableCard}>
                <View style={styles.tableRow}>
                  <Text style={styles.tableLabel}>STUDENT ASSISTANT</Text>
                  <Text style={styles.tableValue}>{item.name}</Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableLabel}>POSITION</Text>
                  <Text style={styles.tableValue}>{item.position}</Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableLabel}>DATE</Text>
                  <Text style={styles.tableValue}>{item.date}</Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableLabel}>SHIFT TIME</Text>
                  <Text style={styles.tableValue}>{item.time}</Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableLabel}>DURATION</Text>
                  <Text style={[styles.tableValue, { fontWeight: 'bold', color: COLORS.darkBlue }]}>{item.duration}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* --- REQUEST DETAILS TABLE (Converted to Cards) --- */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Request details in selected period</Text>
            <Text style={styles.sectionSubtitle}>These requests match the active date filter and are included in the report period.</Text>
            
            {requestData.map((item) => (
              <View key={item.id} style={styles.tableCard}>
                <View style={styles.tableRow}>
                  <Text style={styles.tableLabel}>STUDENT ASSISTANT</Text>
                  <Text style={styles.tableValue}>{item.name}</Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableLabel}>REQUEST</Text>
                  <Text style={styles.tableValue}>{item.request}</Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableLabel}>DATE</Text>
                  <Text style={styles.tableValue}>{item.date}</Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableLabel}>STATUS</Text>
                  <View style={[styles.statusBadge, { backgroundColor: COLORS.rejectedBg }]}>
                    <Text style={[styles.statusText, { color: COLORS.rejectedText }]}>{item.status}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>

          {/* --- STAFF GRID (Converted to 2-Column Grid) --- */}
          <View style={styles.staffGrid}>
            {staffData.map((staff) => (
              <View key={staff.id} style={styles.staffCard}>
                <View style={styles.staffHeader}>
                  <View style={styles.staffAvatar}>
                    <Text style={styles.staffAvatarText}>{staff.initials}</Text>
                  </View>
                  <Text style={styles.staffName} numberOfLines={1}>{staff.name}</Text>
                  <Feather name="more-horizontal" size={16} color={COLORS.textMuted} />
                </View>
                
                <View style={styles.staffStatsRow}>
                  <View>
                    <Text style={styles.staffStatLabel}>HOURS WORKED</Text>
                    <Text style={styles.staffStatValue}>{staff.hours}</Text>
                  </View>
                  <View>
                    <Text style={styles.staffStatLabel}>REQUESTS</Text>
                    <Text style={styles.staffStatValue}>{staff.requests}</Text>
                  </View>
                </View>

                <View style={styles.staffFooter}>
                  <Text style={styles.staffLocation}>{staff.location}</Text>
                  <Text style={styles.staffDays}>{staff.days}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Padding for bottom nav */}
          <View style={{ height: 100 }} />
        </ScrollView>

        {/* --- BOTTOM NAVIGATION BAR --- */}
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
      </ImageBackground>
    </SafeAreaView>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  backgroundImage: { flex: 1, width: '100%', height: '100%' },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // 70% white overlay
  },
  scrollContent: { padding: 16 },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  themeToggle: { flexDirection: 'row', alignItems: 'center' },
  themeText: { marginLeft: 6, fontSize: 12, color: COLORS.textMuted },
  userProfile: { flexDirection: 'row', alignItems: 'center' },
  userInfo: { alignItems: 'flex-end', marginRight: 8 },
  userName: { fontSize: 12, fontWeight: 'bold', color: COLORS.textMain },
  userRole: { fontSize: 10, color: COLORS.textMuted },
  avatarSmall: {
    width: 36, height: 36, borderRadius: 18, backgroundColor: COLORS.primary,
    justifyContent: 'center', alignItems: 'center',
  },
  avatarSmallText: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },

  // Title Section
  titleSection: { marginBottom: 16 },
  pageTitle: { fontSize: 24, fontWeight: 'bold', color: COLORS.darkBlue, fontFamily: 'serif', marginBottom: 8 },
  pageSubtitle: { fontSize: 13, color: COLORS.textMuted, lineHeight: 18, marginBottom: 12 },
  actionButtonsRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  exportButton: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF',
    borderWidth: 1, borderColor: COLORS.border, paddingHorizontal: 12, paddingVertical: 8,
    borderRadius: 6, gap: 6,
  },
  exportText: { fontSize: 12, fontWeight: '600', color: COLORS.textMain },
  generateButton: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.primary,
    paddingHorizontal: 12, paddingVertical: 8, borderRadius: 6, gap: 6,
  },
  generateText: { fontSize: 12, fontWeight: '600', color: '#FFF' },

  // Stats Row
  statsRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  statCard: {
    flex: 1, backgroundColor: COLORS.card, padding: 12, borderRadius: 8,
    borderWidth: 1, borderColor: COLORS.border, position: 'relative',
  },
  statLabel: { fontSize: 8, fontWeight: 'bold', color: COLORS.textMuted, letterSpacing: 0.5, marginBottom: 4, height: 20 },
  statValue: { fontSize: 18, fontWeight: 'bold', color: COLORS.darkBlue },
  statIcon: { position: 'absolute', top: 10, right: 10 },

  // Filter Section
  filterContainer: {
    backgroundColor: COLORS.card, borderRadius: 8, borderWidth: 1, borderColor: COLORS.border, padding: 12, marginBottom: 8,
  },
  searchContainer: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF',
    borderWidth: 1, borderColor: COLORS.border, borderRadius: 6, paddingHorizontal: 12, marginBottom: 8,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, paddingVertical: 10, fontSize: 13, color: COLORS.textMain },
  filterActions: { flexDirection: 'row', gap: 8 },
  filterButton: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF',
    borderWidth: 1, borderColor: COLORS.border, borderRadius: 6,
    paddingHorizontal: 12, paddingVertical: 8, gap: 6,
  },
  filterText: { fontSize: 11, fontWeight: '600', color: COLORS.textMain },

  // Date Range
  dateRangeContainer: {
    backgroundColor: '#EFF6FF', padding: 12, borderRadius: 6, marginBottom: 16,
    borderWidth: 1, borderColor: '#BFDBFE',
  },
  dateRangeText: { fontSize: 12, color: COLORS.textMain },
  dateRangeHighlight: { fontWeight: 'bold', color: COLORS.primary },

  // Section Cards (Shift & Request Details)
  sectionCard: {
    backgroundColor: COLORS.card, borderRadius: 12, borderWidth: 1, borderColor: COLORS.border,
    padding: 16, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05, shadowRadius: 4, elevation: 2,
  },
  sectionTitle: { fontSize: 15, fontWeight: 'bold', color: COLORS.textMain, marginBottom: 4 },
  sectionSubtitle: { fontSize: 11, color: COLORS.textMuted, marginBottom: 12, lineHeight: 16 },

  // Table Card (Row converted to card)
  tableCard: {
    backgroundColor: '#F8FAFC', borderRadius: 8, padding: 12, marginBottom: 8,
    borderWidth: 1, borderColor: COLORS.border, gap: 8,
  },
  tableRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  tableLabel: { fontSize: 9, fontWeight: 'bold', color: COLORS.textMuted, letterSpacing: 0.5 },
  tableValue: { fontSize: 12, color: COLORS.textMain, textAlign: 'right', flex: 1, paddingLeft: 16 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4 },
  statusText: { fontSize: 10, fontWeight: 'bold' },

  // Staff Grid
  staffGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 16 },
  staffCard: {
    width: '48%', backgroundColor: COLORS.staffCardBg, borderRadius: 8,
    borderWidth: 1, borderColor: COLORS.staffCardBorder, padding: 12, marginBottom: 12,
  },
  staffHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  staffAvatar: {
    width: 28, height: 28, borderRadius: 14, backgroundColor: '#FFF',
    justifyContent: 'center', alignItems: 'center', marginRight: 6,
  },
  staffAvatarText: { fontSize: 10, fontWeight: 'bold', color: COLORS.textMain },
  staffName: { flex: 1, fontSize: 11, fontWeight: 'bold', color: COLORS.textMain },
  staffStatsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  staffStatLabel: { fontSize: 8, fontWeight: 'bold', color: COLORS.textMuted, marginBottom: 2 },
  staffStatValue: { fontSize: 12, fontWeight: 'bold', color: COLORS.textMain },
  staffFooter: { borderTopWidth: 1, borderTopColor: 'rgba(0,0,0,0.05)', paddingTop: 6 },
  staffLocation: { fontSize: 10, color: COLORS.textMuted, marginBottom: 2 },
  staffDays: { fontSize: 10, fontWeight: 'bold', color: COLORS.textMain },

  // Bottom Navigation Bar
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingVertical: 10,
    paddingBottom: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: { alignItems: 'center', justifyContent: 'center', padding: 4 },
  navText: { fontSize: 10, color: COLORS.textMuted, marginTop: 4 },
  navTextActive: { color: COLORS.primary, fontWeight: 'bold' },
});