// src/app/supRequest.jsx
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Image,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import logoImg from "@/assets/images/logo.png"; // Same logo path as supervisorDash.jsx

// Available Leave Types for Filtering
const LEAVE_TYPES = ['All', 'Sick Leave', 'Personal Issues', 'Exam Leave', 'Day Off', 'Shift Swap'];

// Reusable Submission Card Component
const SubmissionCard = ({ item, onApprove, onReject }) => (
  <View style={styles.card}>
    {/* Header Row */}
    <View style={styles.cardHeader}>
      <View style={styles.cardHeaderLeft}>
        <View style={[styles.avatar, { backgroundColor: item.avatarColor }]}>
          <Text style={styles.avatarText}>{item.initials}</Text>
        </View>
        <Text style={styles.studentName}>{item.name}</Text>
      </View>
      <View style={styles.typeBadge}>
        <Text style={styles.typeBadgeText}>{item.type}</Text>
      </View>
    </View>

    <View style={styles.divider} />

    {/* Body */}
    <View style={styles.cardBody}>
      <Text style={styles.requestText}>{item.reason}</Text>
    </View>

    {/* Meta Row */}
    <View style={styles.metaRow}>
      <View style={styles.dateContainer}>
        <Ionicons name="calendar-outline" size={16} color="#718096" style={styles.metaIcon} />
        <Text style={styles.dateText}>{item.date}</Text>
      </View>
      <View style={[
        styles.statusBadge, 
        item.status === 'APPROVED' && styles.statusApproved,
        item.status === 'REJECTED' && styles.statusRejected,
        item.status === 'PENDING' && styles.statusPending,
      ]}>
        <Ionicons 
          name={item.status === 'PENDING' ? 'time-outline' : item.status === 'APPROVED' ? 'checkmark-circle-outline' : 'close-circle-outline'} 
          size={12} 
          color={item.status === 'APPROVED' ? '#16A34A' : item.status === 'REJECTED' ? '#DC2626' : '#B45309'} 
          style={{ marginRight: 4 }}
        />
        <Text style={[
          styles.statusText,
          item.status === 'APPROVED' && styles.statusTextApproved,
          item.status === 'REJECTED' && styles.statusTextRejected,
          item.status === 'PENDING' && styles.statusTextPending,
        ]}>
          {item.status}
        </Text>
      </View>
    </View>

    {/* Action Buttons */}
    {item.status === 'PENDING' && (
      <View style={styles.actionRow}>
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={() => onReject(item.id)}
        >
          <Ionicons name="close-circle-outline" size={20} color="#DC2626" style={{ marginRight: 6 }} />
          <Text style={styles.rejectText}>REJECT</Text>
        </TouchableOpacity>
        
        <View style={styles.actionDivider} />
        
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={() => onApprove(item.id)}
        >
          <Ionicons name="checkmark-circle-outline" size={20} color="#16A34A" style={{ marginRight: 6 }} />
          <Text style={styles.approveText}>APPROVE</Text>
        </TouchableOpacity>
      </View>
    )}
  </View>
);

export default function SupervisorRequests() {
  const router = useRouter();

  // Search and Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [selectedLeaveType, setSelectedLeaveType] = useState('All');

  // Initial State for Submissions (Updated with specific leave types)
  const [submissions, setSubmissions] = useState([
    {
      id: 1,
      name: 'Nkululeko Buthelezi',
      initials: 'NN',
      avatarColor: '#A78BFA',
      type: 'Shift Swap',
      reason: 'Requesting to swap Friday Evening (6PM) shift with Saturday Morning (8AM) due to academic exam preparation.',
      date: 'Oct 27 - Oct 28',
      status: 'PENDING',
    },
    {
      id: 2,
      name: 'Judith Zondo',
      initials: 'JD',
      avatarColor: '#3B82F6',
      type: 'Sick Leave',
      reason: 'Medical certificate attached. Requesting sick leave for three days due to flu.',
      date: 'Oct 30 - Nov 02',
      status: 'PENDING',
    },
    {
      id: 3,
      name: 'Sibekezelo Mnguni',
      initials: 'SS',
      avatarColor: '#3B82F6',
      type: 'Exam Leave',
      reason: 'Requesting exam leave for upcoming final examinations. Timetable attached.',
      date: 'Nov 05 - Nov 10',
      status: 'PENDING',
    },
    {
      id: 4,
      name: 'Nkosi Nkosi',
      initials: 'NK',
      avatarColor: '#8B5CF6',
      type: 'Personal Issues',
      reason: 'Urgent family emergency requiring travel out of town.',
      date: 'Nov 12 - Nov 15',
      status: 'PENDING',
    },
    {
      id: 5,
      name: 'Thabo Mokoena',
      initials: 'TM',
      avatarColor: '#F59E0B',
      type: 'Day Off',
      reason: 'Requesting a standard day off for personal wellness.',
      date: 'Nov 20',
      status: 'PENDING',
    },
  ]);

  // Handle Approve/Reject Actions
  const handleAction = (id, newStatus) => {
    setSubmissions(prev => 
      prev.map(item => 
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
  };

  // Filter Logic
  const filteredSubmissions = submissions.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedLeaveType === 'All' || item.type === selectedLeaveType;
    return matchesSearch && matchesFilter;
  });

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      
      {/* Top Header */}
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
          <TouchableOpacity
              style={styles.iconButton}
              onPress={() => router.push('/supNotification')}
          >
              <Ionicons name="notifications-outline" size={22} color="#1E3A8A" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/logOut')}>
            <Ionicons name="log-out-outline" size={22} color="#1E3A8A" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Approval Rate Card */}
        <View style={styles.approvalCard}>
          <View style={styles.approvalIconContainer}>
            <Ionicons name="pie-chart-outline" size={20} color="#1E3A8A" />
          </View>
          <View style={styles.approvalTextContainer}>
            <Text style={styles.approvalLabel}>APPROVAL RATE</Text>
            <Text style={styles.approvalValue}>82.5%</Text>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#A0AEC0" style={styles.searchIcon} />
          <TextInput 
            style={styles.searchInput}
            placeholder="Search by student name..."
            placeholderTextColor="#A0AEC0"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery !== '' && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#A0AEC0" />
            </TouchableOpacity>
          )}
        </View>

        {/* Filters */}
        <View style={styles.filtersRow}>
          <TouchableOpacity 
            style={[styles.filterButton, selectedLeaveType !== 'All' && styles.filterButtonActive]} 
            onPress={() => setIsFilterModalVisible(true)}
          >
            <Ionicons 
              name="filter-outline" 
              size={16} 
              color={selectedLeaveType !== 'All' ? '#FFFFFF' : '#4A5568'} 
              style={{ marginRight: 6 }} 
            />
            <Text style={[styles.filterText, selectedLeaveType !== 'All' && styles.filterTextActive]}>
              {selectedLeaveType === 'All' ? 'Filter Type' : selectedLeaveType}
            </Text>
            {selectedLeaveType !== 'All' && (
              <View style={styles.filterBadgeActive}>
                <Text style={styles.filterBadgeTextActive}>1</Text>
              </View>
            )}
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="calendar-outline" size={16} color="#4A5568" style={{ marginRight: 6 }} />
            <Text style={styles.filterText}>This Month</Text>
          </TouchableOpacity>
        </View>

        {/* Section Title */}
        <View style={styles.sectionHeader}>
          <Ionicons name="swap-horizontal-outline" size={18} color="#1E3A8A" style={{ marginRight: 6 }} />
          <Text style={styles.sectionTitle}>RECENT SUBMISSIONS</Text>
        </View>

        {/* Submissions List (Filtered) */}
        {filteredSubmissions.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="document-text-outline" size={48} color="#A0AEC0" />
            <Text style={styles.emptyStateText}>No submissions found</Text>
          </View>
        ) : (
          filteredSubmissions.map((item) => (
            <SubmissionCard 
              key={item.id} 
              item={item} 
              onApprove={(id) => handleAction(id, 'APPROVED')}
              onReject={(id) => handleAction(id, 'REJECTED')}
            />
          ))
        )}

        {/* View All History Link */}
        <TouchableOpacity
          style={styles.viewAllButton}
          onPress={() => router.push({
            pathname: '/supReqHistory',
            params: { submissions: JSON.stringify(submissions) },
          })}
        >
          <Text style={styles.viewAllText}>VIEW ALL HISTORY</Text>
          <Ionicons name="chevron-forward" size={16} color="#1E3A8A" style={{ marginLeft: 4 }} />
        </TouchableOpacity>

        {/* Footer Note */}
        <View style={styles.footerNote}>
          <Ionicons name="information-circle-outline" size={18} color="#4A5568" style={{ marginRight: 10, marginTop: 2 }} />
          <Text style={styles.footerNoteText}>
            All changes are logged for institutional audit compliance. Decisions made here are final and notified to students immediately.
          </Text>
        </View>

      </ScrollView>

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
        
        {/* Requests Tab (Active) */}
        <TouchableOpacity style={styles.navItem}>
          <View style={styles.navIconContainer}>
            <Ionicons name="document-text" size={24} color="#2563EB" />
            <View style={styles.navBadge}>
              <Text style={styles.navBadgeText}>1</Text>
            </View>
          </View>
          <Text style={[styles.navText, styles.navTextActive]}>Requests</Text>
        </TouchableOpacity>

        {/* Calendar Tab */}
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => router.push('/supCal')}
        >
          <Ionicons name="calendar-outline" size={24} color="#6B7280" />
          <Text style={styles.navText}>Calendar</Text>
        </TouchableOpacity>

        {/* Reports Tab */}
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => router.push('/supReport')}
        >
          <Ionicons name="bar-chart-outline" size={24} color="#6B7280" />
          <Text style={styles.navText}>Reports</Text>
        </TouchableOpacity>
      </View>

      {/* --- FILTER MODAL --- */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isFilterModalVisible}
        onRequestClose={() => setIsFilterModalVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setIsFilterModalVisible(false)}
        >
          <TouchableOpacity 
            style={styles.filterModalContent} 
            activeOpacity={1} 
            onPress={(e) => e.stopPropagation()}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filter by Leave Type</Text>
              <TouchableOpacity onPress={() => setIsFilterModalVisible(false)}>
                <Ionicons name="close-circle" size={28} color="#A0AEC0" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {LEAVE_TYPES.map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.filterOption,
                    selectedLeaveType === type && styles.filterOptionActive
                  ]}
                  onPress={() => {
                    setSelectedLeaveType(type);
                    setIsFilterModalVisible(false);
                  }}
                >
                  <Text style={[
                    styles.filterOptionText,
                    selectedLeaveType === type && styles.filterOptionTextActive
                  ]}>
                    {type}
                  </Text>
                  {selectedLeaveType === type && (
                    <Ionicons name="checkmark-circle" size={20} color="#2563EB" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#8FB3D9', 
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
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  approvalCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    width: '55%',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  approvalIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#DBEAFE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  approvalTextContainer: {
    flex: 1,
  },
  approvalLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#718096',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  approvalValue: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1A202C',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 16,
    height: 50,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#1A202C',
  },
  filtersRow: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  filterButtonActive: {
    backgroundColor: '#2563EB',
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4A5568',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  filterBadgeActive: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
  },
  filterBadgeTextActive: {
    color: '#2563EB',
    fontSize: 9,
    fontWeight: 'bold',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1E3A8A',
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  studentName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A202C',
  },
  typeBadge: {
    backgroundColor: '#EDF2F7',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  typeBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#4A5568',
    letterSpacing: 0.5,
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginHorizontal: 16,
  },
  cardBody: {
    padding: 16,
  },
  requestText: {
    fontSize: 14,
    color: '#4A5568',
    lineHeight: 20,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaIcon: {
    marginRight: 6,
  },
  dateText: {
    fontSize: 13,
    color: '#718096',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
  },
  statusPending: {
    backgroundColor: '#FEF3C7',
    borderColor: '#F59E0B',
  },
  statusApproved: {
    backgroundColor: '#DCFCE7',
    borderColor: '#16A34A',
  },
  statusRejected: {
    backgroundColor: '#FEE2E2',
    borderColor: '#DC2626',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
  },
  statusTextPending: { color: '#B45309' },
  statusTextApproved: { color: '#16A34A' },
  statusTextRejected: { color: '#DC2626' },
  actionRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
  },
  actionDivider: {
    width: 1,
    backgroundColor: '#E2E8F0',
  },
  rejectText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#DC2626',
  },
  approveText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#16A34A',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#A0AEC0',
    marginTop: 10,
    fontWeight: '600',
  },
  viewAllButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    marginBottom: 10,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E3A8A',
    letterSpacing: 0.5,
  },
  footerNote: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 8,
    padding: 16,
    alignItems: 'flex-start',
  },
  footerNoteText: {
    flex: 1,
    fontSize: 12,
    color: '#2D3748',
    lineHeight: 18,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingVertical: 10,
    paddingBottom: Platform.OS === 'ios' ? 25 : 10,
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
  navBadge: {
    position: 'absolute',
    top: -4,
    right: -6,
    backgroundColor: '#EF4444',
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  navText: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
    fontWeight: '500',
  },
  navTextActive: {
    color: '#2563EB',
    fontWeight: '700',
  },
  
  // --- Filter Modal Styles ---
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  filterModalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    maxWidth: 400,
    maxHeight: '70%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1A202C',
  },
  filterOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: '#F7FAFC',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  filterOptionActive: {
    backgroundColor: '#DBEAFE',
    borderColor: '#2563EB',
  },
  filterOptionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A5568',
  },
  filterOptionTextActive: {
    color: '#1E3A8A',
    fontWeight: '800',
  },
});
