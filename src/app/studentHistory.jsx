// src/app/studentHistory.jsx

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// ---------------------------------------------------------------------------
// Mock data (replace with real data from your backend later)
// ---------------------------------------------------------------------------
const STUDENT_NAME = 'Nicholas Mathebula';

const REQUESTS = [
  { id: 'REQ-003', type: 'Exam Leave', status: 'Approved' },
  { id: 'REQ-001', type: 'Sick Leave', status: 'Rejected' },
  { id: 'REQ-002', type: 'Shift Swap – Simphiwe Masanabo', status: 'Approved' },
];

const STATUS_STYLES = {
  Approved: { bg: '#DCFCE7', color: '#16A34A' },
  Rejected: { bg: '#FEE2E2', color: '#DC2626' },
  Pending: { bg: '#FEF3C7', color: '#D97706' },
};

export default function StudentHistory() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>

      {/* Top Header Bar */}
      <View style={styles.headerBar}>
        <View style={styles.headerLeft}>
          <View style={styles.logoContainer}>
            <Ionicons name="school" size={16} color="#FFFFFF" />
          </View>

          <View>
            <Text style={styles.headerTitle}>Student Portal</Text>
            <Text style={styles.headerSubtitle}>ABSENCE AND LEAVE TRACKER</Text>
          </View>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.headerIcon}
            onPress={() => router.back()}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <Ionicons name="chevron-back" size={20} color="#2563EB" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.headerIcon}
            onPress={() => router.push('/studentNotifications')}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <Ionicons name="notifications-outline" size={20} color="#2563EB" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.headerIcon}
            onPress={() => router.replace('/')}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <Ionicons name="log-out-outline" size={20} color="#2563EB" />
          </TouchableOpacity>
        </View>
      </View>

      {/* User row */}
      <View style={styles.userRow}>
        <View style={styles.userTextWrap}>
          <Text style={styles.userName}>{STUDENT_NAME}</Text>
          <Text style={styles.userRole}>Student Assist</Text>
        </View>

        <View style={styles.avatar}>
          <Text style={styles.avatarText}>NM</Text>
        </View>
      </View>

      {/* Library background with a blue wash */}
      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1000&auto=format&fit=crop',
        }}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.backgroundOverlay} />

        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >

          {/* Badge + New Request */}
          <View style={styles.topRow}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>STUDENT PORTAL</Text>
            </View>

            <TouchableOpacity
              style={styles.newRequestButton}
              onPress={() => router.push('/studentRequest')}
              activeOpacity={0.85}
            >
              <Ionicons name="add" size={14} color="#FFFFFF" />
              <Text style={styles.newRequestText}>New Request</Text>
            </TouchableOpacity>
          </View>

          {/* Title */}
          <Text style={styles.pageTitle}>{STUDENT_NAME}’s History</Text>
          <Text style={styles.pageSubtitle}>View all the requests you made.</Text>

          {/* All Leave Requests table */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>All Leave Requests</Text>

            {/* Table header */}
            <View style={styles.tableHeader}>
              <Text style={[styles.headCell, styles.colId]}>ID</Text>
              <Text style={[styles.headCell, styles.colType]}>TYPE</Text>
              <Text style={[styles.headCell, styles.colStatus]}>STATUS</Text>
            </View>

            {/* Rows */}
            {REQUESTS.length === 0 ? (
              <View style={styles.emptyState}>
                <Ionicons name="document-text-outline" size={30} color="#9CA3AF" />
                <Text style={styles.emptyText}>You haven’t made any requests yet.</Text>
              </View>
            ) : (
              REQUESTS.map((item) => {
                const statusStyle = STATUS_STYLES[item.status] || STATUS_STYLES.Pending;

                return (
                  <View key={item.id} style={styles.tableRow}>
                    <Text style={[styles.cell, styles.colId]}>{item.id}</Text>

                    <Text style={[styles.cell, styles.colType]} numberOfLines={2}>
                      {item.type}
                    </Text>

                    <View style={styles.colStatus}>
                      <View style={[styles.statusPill, { backgroundColor: statusStyle.bg }]}>
                        <Text style={[styles.statusText, { color: statusStyle.color }]}>
                          {item.status}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              })
            )}
          </View>

        </ScrollView>
      </ImageBackground>

      {/* Bottom Tab Navigation (same on every screen: Home, Requests, History, Schedule) */}
      <View style={styles.bottomNav}>

        {/* HOME */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.replace('/studentDash')}
        >
          <Ionicons name="grid-outline" size={24} color="#6B7280" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        {/* REQUESTS */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push('/studentRequest')}
        >
          <View style={styles.navIconContainer}>
            <Ionicons name="clipboard-outline" size={24} color="#6B7280" />
            <View style={styles.navRedDot} />
          </View>

          <Text style={styles.navText}>Requests</Text>
        </TouchableOpacity>

        {/* HISTORY (active on this screen) */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.replace('/studentHistory')}
        >
          <MaterialCommunityIcons name="history" size={24} color="#2563EB" />
          <Text style={[styles.navText, styles.navTextActive]}>History</Text>
        </TouchableOpacity>

        {/* SCHEDULE */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push('/studentSchedule')}
        >
          <Ionicons name="calendar-outline" size={24} color="#6B7280" />
          <Text style={styles.navText}>Schedule</Text>
        </TouchableOpacity>

      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#8FB2DA',
  },

  // --- Header ---
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 6,
    backgroundColor: '#FFFFFF',
  },

  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logoContainer: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },

  headerTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#111827',
  },

  headerSubtitle: {
    fontSize: 7,
    fontWeight: '800',
    color: '#DC2626',
    letterSpacing: 1,
  },

  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  headerIcon: {
    marginLeft: 14,
  },

  userRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },

  userTextWrap: {
    alignItems: 'flex-end',
    marginRight: 8,
  },

  userName: {
    fontSize: 11,
    fontWeight: '700',
    color: '#111827',
  },

  userRole: {
    fontSize: 9,
    color: '#6B7280',
  },

  avatar: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },

  // --- Background ---
  background: {
    flex: 1,
  },

  backgroundOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(122, 160, 205, 0.88)',
  },

  scrollContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 30,
  },

  // --- Page heading ---
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  badge: {
    backgroundColor: '#DBEAFE',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },

  badgeText: {
    fontSize: 8,
    fontWeight: '800',
    color: '#2563EB',
    letterSpacing: 0.5,
  },

  newRequestButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2563EB',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },

  newRequestText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    marginLeft: 4,
  },

  pageTitle: {
    fontFamily: 'serif',
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginTop: 10,
  },

  pageSubtitle: {
    fontSize: 11,
    color: '#1F2937',
    marginTop: 4,
    marginBottom: 16,
  },

  // --- Table card ---
  card: {
    backgroundColor: '#F4F7FA',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },

  cardTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 14,
  },

  tableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },

  headCell: {
    fontSize: 8,
    fontWeight: '800',
    color: '#374151',
    letterSpacing: 0.8,
  },

  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },

  cell: {
    fontSize: 11,
    color: '#111827',
  },

  colId: {
    flex: 1.1,
  },

  colType: {
    flex: 2,
    paddingRight: 8,
  },

  colStatus: {
    flex: 1.1,
    alignItems: 'flex-end',
  },

  statusPill: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },

  statusText: {
    fontSize: 9,
    fontWeight: '700',
  },

  emptyState: {
    alignItems: 'center',
    paddingVertical: 28,
  },

  emptyText: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 8,
  },

  // --- Bottom Navigation (identical on every screen) ---
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },

  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
  },

  navText: {
    fontSize: 10,
    color: '#6B7280',
    marginTop: 4,
  },

  navTextActive: {
    color: '#2563EB',
    fontWeight: '700',
  },

  navIconContainer: {
    position: 'relative',
  },

  navRedDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
});