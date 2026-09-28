// src/app/supervisorDash.jsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Dummy data for the review list
const requests = [
  { id: 1, name: 'Mathebula Nicholas', initials: 'MN', reason: 'Academic Commitment', date: '25 AUG 2026', color: '#E9D8FD' },
  { id: 2, name: 'Hlongwane Jan', initials: 'HJ', reason: 'Exam Period', date: '20 AUG 2026', color: '#E9D8FD' },
  { id: 3, name: 'Jeyane Duduzile', initials: 'JD', reason: 'Medical Leave', date: '18 AUG 2026', color: '#E9D8FD' },
];

const StatCard = ({ title, value, iconName }) => (
  <View style={styles.statCard}>
    <View style={styles.statHeader}>
      <Text style={styles.statTitle}>{title}</Text>
      <Ionicons name={iconName} size={16} color="#8FB3D9" />
    </View>
    <Text style={styles.statValue}>{value}</Text>
  </View>
);

export default function SupervisorDashboard() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      
      {/* Top Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.logoContainer}>
            <Ionicons name="calendar" size={20} color="#FFFFFF" />
          </View>
          <View>
            <Text style={styles.headerTitle}>StudentAssist</Text>
            <Text style={styles.headerSubtitle}>ABSENCE TRACKER</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
         
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={22} color="#1E3A8A" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={() => router.replace('/logIn')}>
            <Ionicons name="log-out-outline" size={22} color="#1E3A8A" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Supervisor Dashboard</Text>
          <Text style={styles.welcomeSubtitle}>
            Manage student leave and absence tracking for the current semester.
          </Text>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <StatCard title="PENDING REVIEW" value="3" iconName="time-outline" />
          <StatCard title="APPROVED" value="12" iconName="checkmark-circle-outline" />
          <StatCard title="ASSISTANTS" value="18" iconName="people-outline" />
          <StatCard title="CLOSURES" value="2" iconName="calendar-outline" />
        </View>

        {/* Section Header */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <Ionicons name="time-outline" size={16} color="#1E3A8A" style={styles.sectionIcon} />
            <Text style={styles.sectionTitle}>AWAITING YOUR REVIEW</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>VIEW ALL</Text>
          </TouchableOpacity>
        </View>

        {/* Review List */}
        <View style={styles.listContainer}>
          {requests.map((item) => (
            <TouchableOpacity key={item.id} style={styles.listItem} activeOpacity={0.7}>
              {/* Avatar */}
              <View style={[styles.avatar, { backgroundColor: item.color }]}>
                <Text style={styles.avatarText}>{item.initials}</Text>
              </View>
              
              {/* Details */}
              <View style={styles.listItemDetails}>
                <Text style={styles.listItemName}>{item.name}</Text>
                <Text style={styles.listItemReason}>{item.reason}</Text>
                <Text style={styles.listItemDate}>{item.date}</Text>
              </View>

              {/* Status Badge & Arrow */}
              <View style={styles.listItemRight}>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>PENDING</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#A0AEC0" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Footer Note */}
        <View style={styles.footerNote}>
          <Text style={styles.footerNoteText}>
            *Reviewing these requests ensures the iCenter remains adequately staffed during academic peak periods.
          </Text>
        </View>

      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="grid-outline" size={22} color="#1E3A8A" />
          <Text style={styles.navTextActive}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
            style={styles.navItem} 
            onPress={() => router.push('/supRequest')}
            >
            <View style={styles.navIconContainer}>
                <Ionicons name="document-text-outline" size={22} color="#A0AEC0" />
                {/* Notification Badge */}
                <View style={styles.navBadge}>
                <Text style={styles.navBadgeText}>1</Text>
                </View>
            </View>
            <Text style={styles.navText}>Requests</Text>
        </TouchableOpacity>

         <TouchableOpacity 
                 style={styles.navItem} 
                 onPress={() => router.push('/supCal')}
            >
             <Ionicons name="calendar-outline" size={24} color="#6B7280" />
              <Text style={styles.navText}>Calendar</Text>
         </TouchableOpacity>

        <TouchableOpacity 
            style={styles.navItem} 
            onPress={() => router.push('/supReport')}
            >
            <Ionicons name="bar-chart-outline" size={22} color="#A0AEC0" />
            <Text style={styles.navText}>Reports</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#8FB3D9', // Main light blue background
  },
  // --- Header ---
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoContainer: {
    width: 36,
    height: 36,
    backgroundColor: '#1E3A8A',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A202C',
  },
  headerSubtitle: {
    fontSize: 9,
    fontWeight: '600',
    color: '#718096',
    letterSpacing: 1,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 16,
  },
  // --- Content ---
  scrollContent: {
    padding: 20,
    paddingBottom: 100, // Space for the bottom nav bar
  },
  welcomeSection: {
    marginBottom: 24,
  },
  welcomeTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1A202C',
    marginBottom: 6,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: '#4A5568',
    lineHeight: 20,
  },
  // --- Stats Grid ---
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#718096',
    letterSpacing: 0.5,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1A202C',
  },
  // --- Section Header ---
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 16,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionIcon: {
    marginRight: 6,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1E3A8A',
    letterSpacing: 0.5,
  },
  viewAllText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E3A8A',
  },
  // --- List ---
  listContainer: {
    marginBottom: 20,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#6B46C1',
  },
  listItemDetails: {
    flex: 1,
  },
  listItemName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A202C',
    marginBottom: 2,
  },
  listItemReason: {
    fontSize: 12,
    color: '#4A5568',
    marginBottom: 2,
  },
  listItemDate: {
    fontSize: 11,
    color: '#A0AEC0',
  },
  listItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    borderWidth: 1,
    borderColor: '#1E3A8A',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#1E3A8A',
    letterSpacing: 0.5,
  },
  // --- Footer Note ---
  footerNote: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 8,
    padding: 16,
    marginTop: 10,
  },
  footerNoteText: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#2D3748',
    textAlign: 'center',
    lineHeight: 18,
  },
  // --- Bottom Navigation ---
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingVertical: 10,
    paddingBottom: 20, // For safe area on iOS
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIconContainer: {
    position: 'relative',
  },
  navText: {
    fontSize: 10,
    color: '#A0AEC0',
    marginTop: 4,
    fontWeight: '600',
  },
  navTextActive: {
    fontSize: 10,
    color: '#1E3A8A',
    marginTop: 4,
    fontWeight: '700',
  },
  navBadge: {
    position: 'absolute',
    top: -4,
    right: -6,
    backgroundColor: '#E53E3E',
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: 'bold',
  },
});