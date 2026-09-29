// src/app/supReport.jsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import logoImg from "@/assets/images/logo.png"; // Same path as supervisorDash.jsx

// Reusable Metric Card Component
const MetricCard = ({ icon, change, label, value, isPositive }) => (
  <View style={styles.metricCard}>
    <View style={styles.metricTopRow}>
      <View style={styles.metricIconContainer}>
        <Ionicons name={icon} size={16} color="#1E3A8A" />
      </View>
      <View style={styles.metricChangeContainer}>
        <Ionicons 
          name={isPositive ? "trending-up" : "trending-down"} 
          size={12} 
          color={isPositive ? "#16A34A" : "#DC2626"} 
        />
        <Text style={[styles.metricChangeText, { color: isPositive ? "#16A34A" : "#DC2626" }]}>
          {change}
        </Text>
      </View>
    </View>
    <Text style={styles.metricLabel}>{label}</Text>
    <Text style={styles.metricValue}>{value}</Text>
  </View>
);

// Reusable Staff Card Component
const StaffCard = ({ item }) => (
  <View style={styles.staffCard}>
    {/* Header Row */}
    <View style={styles.staffHeader}>
      <View style={styles.staffHeaderLeft}>
        <View style={styles.staffAvatar}>
          <Text style={styles.staffAvatarText}>{item.initials}</Text>
        </View>
        <View>
          <Text style={styles.staffName}>{item.name}</Text>
          <Text style={styles.staffRole}>{item.role}</Text>
        </View>
      </View>
      <TouchableOpacity>
        <Ionicons name="ellipsis-vertical" size={18} color="#A0AEC0" />
      </TouchableOpacity>
    </View>

    <View style={styles.divider} />

    {/* Metrics Row */}
    <View style={styles.staffMetricsRow}>
      <View style={styles.staffMetric}>
        <Text style={styles.staffMetricLabel}>HOURS WORKED</Text>
        <Text style={styles.staffMetricValue}>{item.hoursWorked}</Text>
      </View>
      <View style={styles.staffMetric}>
        <Text style={styles.staffMetricLabel}>TOTAL REQUESTS</Text>
        <Text style={styles.staffMetricValue}>{item.totalRequests}</Text>
      </View>
    </View>

    <View style={styles.staffMetricsRow}>
      <View style={styles.staffMetric}>
        <Text style={styles.staffMetricLabel}>ICENTER</Text>
        <Text style={styles.staffMetricValue}>{item.days} days</Text>
      </View>
      <View style={styles.staffMetric}>
        {/* Empty view to align with the right side */}
      </View>
    </View>

    {/* Footer Row */}
    <View style={styles.staffFooter}>
      <View style={[
        styles.statusBadge, 
        item.status === 'Exceeding' && styles.statusExceeding,
        item.status === 'Needs Review' && styles.statusNeedsReview,
        item.status === 'On Track' && styles.statusOnTrack,
      ]}>
        <Text style={[
          styles.statusBadgeText,
          item.status === 'Exceeding' && styles.statusTextExceeding,
          item.status === 'Needs Review' && styles.statusTextNeedsReview,
          item.status === 'On Track' && styles.statusTextOnTrack,
        ]}>
          {item.status}
        </Text>
      </View>
      <View style={styles.timeAgoContainer}>
        <Ionicons name="time-outline" size={14} color="#718096" style={{ marginRight: 4 }} />
        <Text style={styles.timeAgoText}>{item.timeAgo}</Text>
      </View>
    </View>
  </View>
);

export default function SupervisorReports() {
  const router = useRouter();

  const staffData = [
    {
      id: 1,
      name: 'Shoba Thabiso',
      initials: 'ST',
      role: 'STUDENT ASSISTANT',
      hoursWorked: '20h',
      totalRequests: '1',
      days: '6',
      status: 'Exceeding',
      timeAgo: '2 hours ago',
    },
    {
      id: 2,
      name: 'Mabaso Kganya',
      initials: 'MK',
      role: 'STUDENT ASSISTANT',
      hoursWorked: '23h',
      totalRequests: '3',
      days: '5',
      status: 'Needs Review',
      timeAgo: '15 mins ago',
    },
    {
      id: 3,
      name: 'Mawelela Sibusiso',
      initials: 'MS',
      role: 'STUDENT ASSISTANT',
      hoursWorked: '19.2h',
      totalRequests: '3',
      days: '6',
      status: 'On Track',
      timeAgo: '5 hours ago',
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      
      {/* Top Header (UPDATED to match supervisorDash.jsx) */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            source={logoImg}
            style={styles.iconContainer}
            resizeMode="contain" 
          />
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>StudentAssistance</Text>
            <Text style={styles.headerSubtitle}>ABSENCE TRACKER</Text>
          </View>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={22} color="#1E3A8A" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/logOut')}>
            <Ionicons name="log-out-outline" size={22} color="#1E3A8A" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Title Section */}
        <View style={styles.titleSection}>
          <View>
            <Text style={styles.pageTitle}>Performance Reports</Text>
            <Text style={styles.pageSubtitle}>
              Review and analyze student activity and work efficiency metrics for the current period.
            </Text>
          </View>
          <TouchableOpacity style={styles.downloadButton}>
            <Ionicons name="download-outline" size={20} color="#4A5568" />
          </TouchableOpacity>
        </View>

        {/* Metrics Cards Row */}
        <View style={styles.metricsRow}>
          <MetricCard 
            icon="time-outline" 
            change="+12%" 
            label="TOTAL HOURS" 
            value="1,248h" 
            isPositive={true} 
          />
          <MetricCard 
            icon="document-text-outline" 
            change="+8%" 
            label="REQUESTS" 
            value="4,832" 
            isPositive={true} 
          />
          <MetricCard 
            icon="pie-chart-outline" 
            change="" 
            label="ACTIVE REPORTS" 
            value="8" 
            isPositive={true} 
          />
        </View>

        {/* Generate Report Button */}
        <TouchableOpacity style={styles.generateButton}>
          <Ionicons name="add" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
          <Text style={styles.generateButtonText}>GENERATE NEW REPORT</Text>
        </TouchableOpacity>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#A0AEC0" style={styles.searchIcon} />
          <TextInput 
            style={styles.searchInput}
            placeholder="Search by student name..."
            placeholderTextColor="#A0AEC0"
          />
        </View>

        {/* Filters Row */}
        <View style={styles.filtersRow}>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="filter-outline" size={16} color="#4A5568" style={{ marginRight: 6 }} />
            <Text style={styles.filterText}>Filters</Text>
            <View style={styles.filterBadge}>
              <Text style={styles.filterBadgeText}>2</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="calendar-outline" size={16} color="#4A5568" style={{ marginRight: 6 }} />
            <Text style={styles.filterText}>Last 7 Days</Text>
          </TouchableOpacity>
        </View>

        {/* Section Title */}
        <View style={styles.sectionHeader}>
          <Ionicons name="trending-up" size={18} color="#1E3A8A" style={{ marginRight: 6 }} />
          <Text style={styles.sectionTitle}>STAFF INDIVIDUAL METRICS</Text>
        </View>

        {/* Staff List */}
        {staffData.map((item) => (
          <StaffCard key={item.id} item={item} />
        ))}

        {/* View Complete Directory */}
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>VIEW COMPLETE DIRECTORY</Text>
          <Ionicons name="chevron-forward" size={16} color="#1E3A8A" style={{ marginLeft: 4 }} />
        </TouchableOpacity>

      </ScrollView>

      {/* Footer Note */}
      <View style={styles.footerNote}>
        <Ionicons name="information-circle-outline" size={16} color="#A0AEC0" style={{ marginRight: 8, marginTop: 2 }} />
        <Text style={styles.footerNoteText}>
          Performance data is recalculated every 15 minutes. Report exports include student ID and institutional compliance timestamps.
        </Text>
      </View>

      {/* --- BOTTOM NAVIGATION --- */}
      <View style={styles.bottomNav}>
        {/* Home Tab */}
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => router.push('/supervisorDash')}
        >
          <Ionicons name="grid-outline" size={24} color="#6B7280" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        
        {/* Requests Tab */}
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => router.push('/supRequest')}
        >
          <View style={styles.navIconContainer}>
            <Ionicons name="document-text-outline" size={24} color="#6B7280" />
            <View style={styles.navBadge}>
              <Text style={styles.navBadgeText}>1</Text>
            </View>
          </View>
          <Text style={styles.navText}>Requests</Text>
        </TouchableOpacity>

        {/* Calendar Tab */}
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => router.push('/supCal')}
        >
          <Ionicons name="calendar-outline" size={24} color="#6B7280" />
          <Text style={styles.navText}>Calendar</Text>
        </TouchableOpacity>

        {/* Reports Tab (Active) */}
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="bar-chart" size={24} color="#2563EB" />
          <Text style={[styles.navText, styles.navTextActive]}>Reports</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#8FB3D9' },
  
  // --- Header (updated to match supervisorDash.jsx) ---
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
  iconContainer: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  headerTextContainer: {
    justifyContent: 'center',
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
    marginTop: 2,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 16,
  },

  scrollContent: { padding: 20, paddingBottom: 100 },
  
  // Title Section
  titleSection: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 },
  pageTitle: { fontSize: 26, fontWeight: '800', color: '#1A202C', marginBottom: 6 },
  pageSubtitle: { fontSize: 13, color: '#4A5568', lineHeight: 18, maxWidth: '85%' },
  downloadButton: { backgroundColor: '#FFFFFF', padding: 10, borderRadius: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 2 },

  // Metrics Cards
  metricsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  metricCard: { flex: 1, backgroundColor: '#FFFFFF', borderRadius: 12, padding: 12, marginHorizontal: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 2 },
  metricTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  metricIconContainer: { backgroundColor: '#DBEAFE', padding: 6, borderRadius: 6 },
  metricChangeContainer: { flexDirection: 'row', alignItems: 'center' },
  metricChangeText: { fontSize: 10, fontWeight: '700', marginLeft: 2 },
  metricLabel: { fontSize: 9, fontWeight: '700', color: '#718096', letterSpacing: 0.5, marginBottom: 4 },
  metricValue: { fontSize: 18, fontWeight: '800', color: '#1A202C' },

  // Generate Button
  generateButton: { backgroundColor: '#2563EB', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 16, borderRadius: 8, marginBottom: 20 },
  generateButtonText: { color: '#FFFFFF', fontSize: 14, fontWeight: '700', letterSpacing: 0.5 },

  // Search
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 10, paddingHorizontal: 16, height: 50, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, fontSize: 15, color: '#1A202C' },

  // Filters
  filtersRow: { flexDirection: 'row', marginBottom: 24 },
  filterButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 8, paddingHorizontal: 16, paddingVertical: 10, marginRight: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 },
  filterText: { fontSize: 13, fontWeight: '600', color: '#4A5568' },
  filterBadge: { backgroundColor: '#1E3A8A', borderRadius: 8, width: 16, height: 16, justifyContent: 'center', alignItems: 'center', marginLeft: 6 },
  filterBadgeText: { color: '#FFFFFF', fontSize: 9, fontWeight: 'bold' },

  // Section Title
  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { fontSize: 12, fontWeight: '800', color: '#1E3A8A', letterSpacing: 0.5 },

  // Staff Card
  staffCard: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  staffHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  staffHeaderLeft: { flexDirection: 'row', alignItems: 'center' },
  staffAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#8B5CF6', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  staffAvatarText: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' },
  staffName: { fontSize: 15, fontWeight: '700', color: '#1A202C' },
  staffRole: { fontSize: 10, fontWeight: '600', color: '#718096', letterSpacing: 0.5, marginTop: 2 },
  divider: { height: 1, backgroundColor: '#E2E8F0', marginBottom: 12 },
  
  // Staff Metrics
  staffMetricsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  staffMetric: { flex: 1 },
  staffMetricLabel: { fontSize: 10, fontWeight: '700', color: '#718096', letterSpacing: 0.5, marginBottom: 4 },
  staffMetricValue: { fontSize: 16, fontWeight: '700', color: '#1A202C' },

  // Staff Footer
  staffFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 },
  statusBadge: { borderRadius: 12, paddingHorizontal: 10, paddingVertical: 4 },
  statusExceeding: { backgroundColor: '#DCFCE7' },
  statusNeedsReview: { backgroundColor: '#FEE2E2' },
  statusOnTrack: { backgroundColor: '#DBEAFE' },
  statusBadgeText: { fontSize: 10, fontWeight: '700' },
  statusTextExceeding: { color: '#16A34A' },
  statusTextNeedsReview: { color: '#DC2626' },
  statusTextOnTrack: { color: '#2563EB' },
  timeAgoContainer: { flexDirection: 'row', alignItems: 'center' },
  timeAgoText: { fontSize: 11, color: '#718096' },

  // View All
  viewAllButton: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 16, marginBottom: 10 },
  viewAllText: { fontSize: 13, fontWeight: '700', color: '#1E3A8A', letterSpacing: 0.5 },

  // Footer Note
  footerNote: { flexDirection: 'row', paddingHorizontal: 20, paddingBottom: 20, alignItems: 'flex-start' },
  footerNoteText: { flex: 1, fontSize: 11, color: '#718096', lineHeight: 16 },

  // Bottom Navigation
  bottomNav: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: '#E5E7EB', paddingVertical: 10, paddingBottom: Platform.OS === 'ios' ? 25 : 10, justifyContent: 'space-around', alignItems: 'center' },
  navItem: { alignItems: 'center', justifyContent: 'center' },
  navIconContainer: { position: 'relative' },
  navBadge: { position: 'absolute', top: -4, right: -6, backgroundColor: '#EF4444', borderRadius: 8, width: 16, height: 16, justifyContent: 'center', alignItems: 'center' },
  navBadgeText: { color: '#FFFFFF', fontSize: 10, fontWeight: 'bold' },
  navText: { fontSize: 12, color: '#6B7280', marginTop: 4, fontWeight: '500' },
  navTextActive: { color: '#2563EB', fontWeight: '700' },
});