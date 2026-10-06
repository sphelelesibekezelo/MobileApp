import { Feather, Ionicons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
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
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
  pendingBg: '#FEF3C7',
  pendingText: '#D97706',
  badgeLeaveBg: '#F3F4F6',
  badgeLeaveText: '#374151',
  avatarBg: '#E0E7FF',
  avatarText: '#4F46E5',
};

// --- Bottom Nav Items (Mapped to Pages) ---
const NAV_ITEMS = [
  { name: 'Dashboard',   icon: 'grid-outline',          path: '/supervisorDash' },
  { name: 'Calendar',    icon: 'calendar-outline',      path: '/supCal'         },
  { name: 'Requests',    icon: 'document-text-outline', path: '/supRequest', badge: 1 },
  { name: 'Assistances', icon: 'people-outline',        path: '/supAssistants'  },
  { name: 'Reports',     icon: 'bar-chart-outline',     path: '/supReport'      },
];

export default function OperationalRequests() {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

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
            <View style={styles.tag}>
              <Text style={styles.tagText}>SBONGILE MONTA</Text>
            </View>
            <Text style={styles.pageTitle}>Operational Requests</Text>
            <Text style={styles.pageSubtitle}>
              Manage and process team shift swaps and leave applications submitted by student assistants.
            </Text>
          </View>

          {/* --- ACTION BUTTONS --- */}
          <View style={styles.actionButtonsRow}>
            <TouchableOpacity style={[styles.actionButton, styles.actionButtonActive]}>
              <Text style={styles.actionButtonTextActive}>Awaiting Review</Text>
              <View style={styles.badgeDot}><Text style={styles.badgeDotText}>1</Text></View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>All Requests</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Feather name="refresh-cw" size={14} color={COLORS.textMain} />
              <Text style={styles.actionButtonText}>Refresh</Text>
            </TouchableOpacity>
          </View>

          {/* --- STAT CARD --- */}
          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <Feather name="shield" size={20} color={COLORS.success} />
            </View>
            <View>
              <Text style={styles.statLabel}>REQUESTS IN SHARED WORKFLOW</Text>
              <Text style={styles.statValue}>15</Text>
            </View>
          </View>

          {/* --- SEARCH & FILTER --- */}
          <View style={styles.searchFilterRow}>
            <View style={styles.searchContainer}>
              <Feather name="search" size={16} color={COLORS.textMuted} style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search by student name..."
                placeholderTextColor="#9CA3AF"
              />
            </View>
            <TouchableOpacity style={styles.filterButton}>
              <Feather name="filter" size={14} color={COLORS.textMain} />
              <Text style={styles.filterText}>Filter</Text>
              <Feather name="chevron-down" size={14} color={COLORS.textMain} />
            </TouchableOpacity>
          </View>

          {/* --- REQUEST CARD --- */}
          <View style={styles.requestCard}>

            {/* Card Header */}
            <View style={styles.requestHeader}>
              <View style={styles.requestUserInfo}>
                <View style={styles.avatarRequest}>
                  <Text style={styles.avatarRequestText}>PT</Text>
                </View>
                <Text style={styles.requestName}>Peter Thomas</Text>
              </View>
              <View style={styles.leaveBadge}>
                <Text style={styles.leaveBadgeText}>LEAVE</Text>
              </View>
            </View>

            {/* Card Body */}
            <View style={styles.requestBody}>
              <Text style={styles.requestQuote}>{"I miss my family"}</Text>

              <View style={styles.requestMetaRow}>
                <Feather name="calendar" size={12} color={COLORS.textMuted} />
                <Text style={styles.requestMetaText}>Oct 12, 2026 – Oct 13, 2026</Text>
              </View>

              <View style={styles.requestMetaRow}>
                <Feather name="clock" size={12} color={COLORS.textMuted} />
                <Text style={styles.requestMetaText}>Filed recently</Text>
              </View>
            </View>

            {/* Card Footer */}
            <View style={styles.requestFooter}>
              <View style={styles.pendingBadge}>
                <Text style={styles.pendingText}>Pending</Text>
              </View>
              <View style={styles.actionRow}>
                <TouchableOpacity style={styles.declineButton}>
                  <Feather name="x" size={14} color="#FFF" />
                  <Text style={styles.declineButtonText}>Decline</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.approveButton}>
                  <Feather name="check" size={14} color="#FFF" />
                  <Text style={styles.approveButtonText}>Approve</Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>

          {/* Padding for bottom nav */}
          <View style={{ height: 100 }} />
        </ScrollView>

        {/* --- BOTTOM NAVIGATION BAR --- */}
        <View
          style={[
            styles.bottomNav,
            { paddingBottom: insets.bottom > 0 ? insets.bottom : 20 },
          ]}
        >
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.path;

            return (
              <TouchableOpacity
                key={item.name}
                style={styles.navItem}
                activeOpacity={0.7}
                onPress={() => router.push(item.path)}
              >
                <View style={styles.navIconContainer}>
                  <Ionicons
                    name={item.icon}
                    size={22}
                    color={isActive ? COLORS.primary : '#A0AEC0'}
                  />
                  {item.badge ? (
                    <View style={styles.navBadge}>
                      <Text style={styles.navBadgeText}>{item.badge}</Text>
                    </View>
                  ) : null}
                </View>
                <Text style={[styles.navText, isActive && styles.navTextActive]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          })}
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
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
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
  tag: { backgroundColor: '#EFF6FF', alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, marginBottom: 8 },
  tagText: { fontSize: 10, fontWeight: 'bold', color: COLORS.primary, letterSpacing: 1 },
  pageTitle: { fontSize: 24, fontWeight: 'bold', color: COLORS.darkBlue, fontFamily: 'serif', marginBottom: 8 },
  pageSubtitle: { fontSize: 13, color: COLORS.textMuted, lineHeight: 18 },

  // Action Buttons
  actionButtonsRow: { flexDirection: 'row', marginBottom: 16, flexWrap: 'wrap' },
  actionButton: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF',
    paddingHorizontal: 12, paddingVertical: 8, borderRadius: 6,
    borderWidth: 1, borderColor: COLORS.border, marginRight: 8, marginBottom: 8,
  },
  actionButtonActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  actionButtonText: { fontSize: 12, fontWeight: '600', color: COLORS.textMain },
  actionButtonTextActive: { fontSize: 12, fontWeight: '600', color: '#FFF' },
  badgeDot: { backgroundColor: '#3B82F6', borderRadius: 10, paddingHorizontal: 6, paddingVertical: 2, marginLeft: 6 },
  badgeDotText: { color: '#FFF', fontSize: 10, fontWeight: 'bold' },

  // Stat Card
  statCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.card,
    padding: 16, borderRadius: 12, borderWidth: 1, borderColor: COLORS.border,
    marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05, shadowRadius: 4, elevation: 2,
  },
  statIcon: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: '#F0FDF4',
    justifyContent: 'center', alignItems: 'center', marginRight: 12,
  },
  statLabel: { fontSize: 10, fontWeight: 'bold', color: COLORS.textMuted, letterSpacing: 0.5 },
  statValue: { fontSize: 24, fontWeight: 'bold', color: COLORS.darkBlue },

  // Search & Filter
  searchFilterRow: { flexDirection: 'row', marginBottom: 16 },
  searchContainer: {
    flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF',
    borderWidth: 1, borderColor: COLORS.border, borderRadius: 8, paddingHorizontal: 12, marginRight: 8,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, paddingVertical: 10, fontSize: 13, color: COLORS.textMain },
  filterButton: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF',
    borderWidth: 1, borderColor: COLORS.border, borderRadius: 8, paddingHorizontal: 12,
  },
  filterText: { fontSize: 12, fontWeight: '600', color: COLORS.textMain, marginHorizontal: 4 },

  // Request Card
  requestCard: {
    backgroundColor: COLORS.card, borderRadius: 12, padding: 16,
    borderWidth: 1, borderColor: COLORS.border, marginBottom: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05, shadowRadius: 4, elevation: 2,
  },
  requestHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  requestUserInfo: { flexDirection: 'row', alignItems: 'center' },
  avatarRequest: {
    width: 32, height: 32, borderRadius: 16, backgroundColor: COLORS.avatarBg,
    justifyContent: 'center', alignItems: 'center', marginRight: 10,
  },
  avatarRequestText: { color: COLORS.avatarText, fontWeight: 'bold', fontSize: 12 },
  requestName: { fontSize: 15, fontWeight: 'bold', color: COLORS.textMain },
  leaveBadge: { backgroundColor: COLORS.badgeLeaveBg, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  leaveBadgeText: { fontSize: 10, fontWeight: 'bold', color: COLORS.badgeLeaveText },

  requestBody: { marginBottom: 16 },
  requestQuote: { fontSize: 14, fontStyle: 'italic', color: COLORS.textMuted, marginBottom: 8 },
  requestMetaRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  requestMetaText: { fontSize: 12, color: COLORS.textMuted, marginLeft: 6 },

  requestFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: COLORS.border, paddingTop: 12 },
  pendingBadge: { backgroundColor: COLORS.pendingBg, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  pendingText: { color: COLORS.pendingText, fontSize: 12, fontWeight: 'bold' },
  actionRow: { flexDirection: 'row' },
  declineButton: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#EF4444',
    paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6, marginRight: 8,
  },
  declineButtonText: { color: '#FFF', fontSize: 12, fontWeight: 'bold', marginLeft: 4 },
  approveButton: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.primary,
    paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6,
  },
  approveButtonText: { color: '#FFF', fontSize: 12, fontWeight: 'bold', marginLeft: 4 },

  // Bottom Navigation Bar
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
    minWidth: 55,
  },
  navIconContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navBadge: {
    position: 'absolute',
    top: -4,
    right: -8,
    backgroundColor: COLORS.danger,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    paddingHorizontal: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navBadgeText: {
    color: '#FFF',
    fontSize: 9,
    fontWeight: 'bold',
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