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
  activeBg: '#D1FAE5',
  activeText: '#059669',
  pendingBg: '#FEF3C7',
  pendingText: '#D97706',
  rejectedBg: '#FEE2E2',
  rejectedText: '#EF4444',
  approvedBg: '#D1FAE5',
  approvedText: '#059669',
  avatarColors: ['#E0E7FF', '#FEF3C7', '#D1FAE5', '#FCE7F3', '#DBEAFE'],
  avatarTextColors: ['#4F46E5', '#D97706', '#059669', '#DB2777', '#2563EB'],
};

// --- Mock Data for Students ---
const studentData = [
  {
    id: '1', initials: 'JD', name: 'John Doe', course: 'MANAGEMENT SCIENCES',
    email: 'sync.test01@tut4life.ac.za', phone: '083 456 7330', studNo: '777888999',
    requests: { total: 2, approved: 1, rejected: 1, pending: 0, rejectedCount: 1 },
    memberSince: '20 Sept 2026', status: 'Active', colorIndex: 0
  },
  {
    id: '2', initials: 'MT', name: 'Mobile Test', course: 'DIP COMPUTER SCIENCE',
    email: 'mobile.test01@tut4life.ac.za', phone: '0831112222', studNo: '999888777',
    requests: { total: 0, approved: 0, rejected: 0, pending: 0 },
    memberSince: '29 Sept 2026', status: 'Active', colorIndex: 1
  },
  {
    id: '3', initials: 'NN', name: 'Nthando Nkosi', course: 'DIPLOMA IN INFORMATICS',
    email: '333222111@tut4life.ac.za', phone: '0756293253', studNo: '333222111',
    requests: { total: 1, approved: 0, rejected: 1, pending: 0, rejectedCount: 1 },
    memberSince: '1 Oct 2026', status: 'Active', colorIndex: 2
  },
  {
    id: '4', initials: 'PT', name: 'Peter Thomas', course: 'BSC COMPUTER SYSTEMS ENGINEERING',
    email: 'test.phone01@tut4life.ac.za', phone: '082 555 1243', studNo: '555444333',
    requests: { total: 12, approved: 5, pending: 1, rejected: 6, rejectedCount: 6 },
    memberSince: '19 Sept 2026', status: 'Active', colorIndex: 3
  },
  {
    id: '5', initials: 'SN', name: 'Sarah Nkosi', course: 'DIP COMPUTER SCIENCE',
    email: 'fresh.test01@tut4life.ac.za', phone: '078 453 1244', studNo: '111222333',
    requests: { total: 0, approved: 0, rejected: 0, pending: 0 },
    memberSince: '19 Sept 2026', status: 'Active', colorIndex: 4
  },
  {
    id: '6', initials: 'TS', name: 'Test Student', course: 'COMPUTER SCIENCE',
    email: 'nsukushrewdness@gmail.com', phone: '0000000000', studNo: 'TEST002',
    requests: { total: 0, approved: 0, rejected: 0, pending: 0 },
    memberSince: '4 Oct 2026', status: 'Active', colorIndex: 0
  },
  {
    id: '7', initials: 'TS', name: 'Test Student', course: 'COMPUTER SCIENCE',
    email: 'yourname+student@gmail.com', phone: '0000000000', studNo: 'TEST001',
    requests: { total: 0, approved: 0, rejected: 0, pending: 0 },
    memberSince: '4 Oct 2026', status: 'Active', colorIndex: 1
  },
];

export default function StudentAssistances() {
  const [activeTab, setActiveTab] = useState('Assistances');

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
            <View style={styles.titleRow}>
              <Text style={styles.pageTitle}>Student Assistances</Text>
              <TouchableOpacity style={styles.refreshButton}>
                <Feather name="refresh-cw" size={14} color={COLORS.textMain} />
                <Text style={styles.refreshText}>Refresh</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.pageSubtitle}>
              Live roster of every student assistant in the system with their request activity.
            </Text>
          </View>

          {/* --- STATS ROW --- */}
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>TOTAL ASSISTANTS</Text>
              <Text style={styles.statValue}>7</Text>
              <Feather name="users" size={16} color={COLORS.primary} style={styles.statIcon} />
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>TOTAL REQUESTS</Text>
              <Text style={styles.statValue}>15</Text>
              <Feather name="clipboard" size={16} color={COLORS.primary} style={styles.statIcon} />
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>PENDING REVIEW</Text>
              <Text style={styles.statValue}>1</Text>
              <Feather name="clock" size={16} color={COLORS.pendingText} style={styles.statIcon} />
            </View>
          </View>

          {/* --- SEARCH BAR --- */}
          <View style={styles.searchContainer}>
            <Feather name="search" size={16} color={COLORS.textMuted} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search by name, email, course, or student"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* --- STUDENT LIST (Cards) --- */}
          {studentData.map((student) => (
            <View key={student.id} style={styles.studentCard}>
              
              {/* Card Header: Avatar, Name, Course, Status */}
              <View style={styles.studentHeader}>
                <View style={styles.studentMainInfo}>
                  <View style={[styles.avatarStudent, { backgroundColor: COLORS.avatarColors[student.colorIndex] }]}>
                    <Text style={[styles.avatarStudentText, { color: COLORS.avatarTextColors[student.colorIndex] }]}>
                      {student.initials}
                    </Text>
                  </View>
                  <View style={styles.studentTextInfo}>
                    <Text style={styles.studentName}>{student.name}</Text>
                    <Text style={styles.studentCourse}>{student.course}</Text>
                  </View>
                </View>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>{student.status}</Text>
                </View>
              </View>

              <View style={styles.divider} />

              {/* Contact Info */}
              <View style={styles.contactSection}>
                <View style={styles.contactRow}>
                  <Feather name="mail" size={12} color={COLORS.textMuted} />
                  <Text style={styles.contactText}>{student.email}</Text>
                </View>
                <View style={styles.contactRow}>
                  <Feather name="phone" size={12} color={COLORS.textMuted} />
                  <Text style={styles.contactText}>{student.phone}</Text>
                </View>
                <View style={styles.contactRow}>
                  <Feather name="hash" size={12} color={COLORS.textMuted} />
                  <Text style={styles.contactText}>STUDNO: {student.studNo}</Text>
                </View>
              </View>

              {/* Request Badges */}
              <View style={styles.requestStats}>
                <View style={styles.requestBadgeRow}>
                  <Text style={styles.requestLabel}>Requests:</Text>
                  <View style={[styles.requestBadge, { backgroundColor: COLORS.grayLight }]}>
                    <Text style={[styles.requestBadgeText, { color: COLORS.textMain }]}>{student.requests.total} total</Text>
                  </View>
                  {student.requests.approved > 0 && (
                    <View style={[styles.requestBadge, { backgroundColor: COLORS.approvedBg }]}>
                      <Text style={[styles.requestBadgeText, { color: COLORS.approvedText }]}>{student.requests.approved} approved</Text>
                    </View>
                  )}
                  {student.requests.pending > 0 && (
                    <View style={[styles.requestBadge, { backgroundColor: COLORS.pendingBg }]}>
                      <Text style={[styles.requestBadgeText, { color: COLORS.pendingText }]}>{student.requests.pending} pending</Text>
                    </View>
                  )}
                  {student.requests.rejected > 0 && (
                    <View style={[styles.requestBadge, { backgroundColor: COLORS.rejectedBg }]}>
                      <Text style={[styles.requestBadgeText, { color: COLORS.rejectedText }]}>{student.requests.rejected} rejected</Text>
                    </View>
                  )}
                </View>
              </View>

              {/* Card Footer: Member Since & Issue Strike */}
              <View style={styles.studentFooter}>
                <Text style={styles.memberSince}>Member since: {student.memberSince}</Text>
                <TouchableOpacity style={styles.issueStrikeButton}>
                  <Feather name="alert-triangle" size={12} color={COLORS.danger} />
                  <Text style={styles.issueStrikeText}>Issue strike</Text>
                </TouchableOpacity>
              </View>

            </View>
          ))}

          {/* Footer Note */}
          <View style={styles.footerNote}>
            <Feather name="info" size={12} color={COLORS.textMuted} />
            <Text style={styles.footerNoteText}>
              Counts update automatically whenever students submit or supervisors decide on a request.
            </Text>
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
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  pageTitle: { fontSize: 24, fontWeight: 'bold', color: COLORS.darkBlue, fontFamily: 'serif' },
  refreshButton: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF',
    borderWidth: 1, borderColor: COLORS.border, paddingHorizontal: 10, paddingVertical: 6,
    borderRadius: 6, gap: 4,
  },
  refreshText: { fontSize: 12, fontWeight: '600', color: COLORS.textMain },
  pageSubtitle: { fontSize: 13, color: COLORS.textMuted, lineHeight: 18 },

  // Stats Row
  statsRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  statCard: {
    flex: 1, backgroundColor: COLORS.card, padding: 12, borderRadius: 8,
    borderWidth: 1, borderColor: COLORS.border, position: 'relative',
  },
  statLabel: { fontSize: 8, fontWeight: 'bold', color: COLORS.textMuted, letterSpacing: 0.5, marginBottom: 4 },
  statValue: { fontSize: 20, fontWeight: 'bold', color: COLORS.darkBlue },
  statIcon: { position: 'absolute', top: 10, right: 10 },

  // Search Bar
  searchContainer: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF',
    borderWidth: 1, borderColor: COLORS.border, borderRadius: 8,
    paddingHorizontal: 12, marginBottom: 16,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, paddingVertical: 12, fontSize: 13, color: COLORS.textMain },

  // Student Card
  studentCard: {
    backgroundColor: COLORS.card, borderRadius: 12, padding: 16,
    borderWidth: 1, borderColor: COLORS.border, marginBottom: 12,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05, shadowRadius: 4, elevation: 2,
  },
  studentHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  studentMainInfo: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  avatarStudent: {
    width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginRight: 12,
  },
  avatarStudentText: { fontWeight: 'bold', fontSize: 14 },
  studentTextInfo: { flex: 1 },
  studentName: { fontSize: 15, fontWeight: 'bold', color: COLORS.textMain },
  studentCourse: { fontSize: 10, color: COLORS.textMuted, marginTop: 2 },
  statusBadge: {
    backgroundColor: COLORS.activeBg, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12,
  },
  statusText: { color: COLORS.activeText, fontSize: 11, fontWeight: 'bold' },

  divider: { height: 1, backgroundColor: COLORS.border, marginVertical: 12 },

  // Contact Section
  contactSection: { gap: 6, marginBottom: 12 },
  contactRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  contactText: { fontSize: 12, color: COLORS.textMuted },

  // Request Stats
  requestStats: { marginBottom: 12 },
  requestLabel: { fontSize: 11, color: COLORS.textMuted, marginBottom: 6, fontWeight: '600' },
  requestBadgeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, alignItems: 'center' },
  requestBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4 },
  requestBadgeText: { fontSize: 10, fontWeight: 'bold' },

  // Card Footer
  studentFooter: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    borderTopWidth: 1, borderTopColor: COLORS.border, paddingTop: 12,
  },
  memberSince: { fontSize: 11, color: COLORS.textMuted },
  issueStrikeButton: {
    flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: COLORS.danger,
    paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, gap: 4,
  },
  issueStrikeText: { color: COLORS.danger, fontSize: 10, fontWeight: 'bold' },

  // Footer Note
  footerNote: { flexDirection: 'row', alignItems: 'flex-start', gap: 6, marginTop: 8 },
  footerNoteText: { fontSize: 11, color: COLORS.textMuted, flex: 1, lineHeight: 16 },

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