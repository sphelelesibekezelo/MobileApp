// src/app/supervisorDash.jsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Modal, 
  TextInput, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker'; 

// Combined list of assistants
const assistants = [
  { id: 1, name: 'Mathebula Nicholas', initials: 'MN', role: 'Student Assistant', status: 'ACTIVE', color: '#A78BFA' },
  { id: 2, name: 'Jiyane Duduzile', initials: 'JD', role: 'Student Assistant', status: 'ACTIVE', color: '#A78BFA' },
  { id: 3, name: 'Segomotsa Lencwe', initials: 'SM', role: 'Student Assistant', status: 'PENDING', color: '#A78BFA' },
];

const AssistantCard = ({ item }) => (
  <View style={styles.assistantCard}>
    <View style={[styles.avatar, { backgroundColor: item.color }]}>
      <Text style={styles.avatarText}>{item.initials}</Text>
    </View>
    <View style={styles.assistantInfo}>
      <Text style={styles.assistantName}>{item.name}</Text>
      <Text style={styles.assistantRole}>{item.role}</Text>
    </View>
    <View style={[styles.statusBadge, item.status === 'PENDING' && styles.statusBadgePending]}>
      <Text style={[styles.statusText, item.status === 'PENDING' && styles.statusTextPending]}>
        {item.status}
      </Text>
    </View>
  </View>
);

export default function SupervisorDashboard() {
  const router = useRouter();
  
  // State for the calendar
  const [currentDate, setCurrentDate] = useState(new Date(2026, 7, 5)); 

  // State for the "Add Event" Modal
  const [isEventModalVisible, setIsEventModalVisible] = useState(false);
  const [eventDate, setEventDate] = useState('');
  const [eventType, setEventType] = useState('Strike');
  const [eventTime, setEventTime] = useState('');

  // State for the "Assign Shift" Modal
  const [isAssignModalVisible, setIsAssignModalVisible] = useState(false);
  const [selectedAssistant, setSelectedAssistant] = useState(assistants[0]?.name || '');
  const [selectedPosition, setSelectedPosition] = useState('Icenter');
  const [shiftDate, setShiftDate] = useState('');
  const [shiftTime, setShiftTime] = useState('');
  const [shiftDuration, setShiftDuration] = useState('');

  const monthNames = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0-11

  // Logic to generate the calendar grid
  const getDaysInMonth = (y, m) => new Date(y, m + 1, 0).getDate();
  const getFirstDayOfMonth = (y, m) => new Date(y, m, 1).getDay(); // 0 is Sunday

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push('');
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  // Navigation logic for 12 months
  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const isToday = (day) => {
    const today = new Date(2026, 7, 5); 
    return day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
  };

  // Handle Add Event Submission
  const handleAddEvent = () => {
    if (!eventDate || !eventTime) {
      alert("Please fill in the date and time of the event.");
      return;
    }
    alert(`Event Added!\nDate: ${eventDate}\nType: ${eventType}\nTime: ${eventTime}`);
    
    // Reset form and close modal
    setEventDate('');
    setEventType('Strike');
    setEventTime('');
    setIsEventModalVisible(false);
  };

  // Handle Assign Shift Submission
  const handleAssignShift = () => {
    if (!shiftDate || !shiftTime || !shiftDuration) {
      alert("Please fill in all fields including the date.");
      return;
    }
    alert(`Shift Assigned!\nAssistant: ${selectedAssistant}\nPosition: ${selectedPosition}\nDate: ${shiftDate}\nTime: ${shiftTime}\nDuration: ${shiftDuration} hours`);
    
    // Reset form and close modal
    setSelectedPosition('Icenter');
    setShiftDate('');
    setShiftTime('');
    setShiftDuration('');
    setIsAssignModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      
      {/* Top Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="chevron-back-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>Supervisor Dashboard</Text>
            <Text style={styles.headerSubtitle}>ABSENCE TRACKER</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={22} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={() => router.replace('/logIn')}>
            <Ionicons name="log-out-outline" size={22} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Portal Title */}
        <View style={styles.portalHeader}>
          <Ionicons name="desktop-outline" size={16} color="#1E3A8A" style={styles.portalIcon} />
          <Text style={styles.portalTitle}>SUPERVISOR PORTAL</Text>
        </View>
        <Text style={styles.pageTitle}>{monthNames[month]} Schedule</Text>
        <Text style={styles.pageSubtitle}>
          Manage student shifts and academic closures for the current term.
        </Text>

        {/* Calendar Card */}
        <View style={styles.calendarCard}>
          <View style={styles.calendarHeader}>
            <View>
              <Text style={styles.calendarMonth}>{monthNames[month]} {year}</Text>
              <Text style={styles.calendarSubtext}>12 ACTIVE SHIFTS</Text>
            </View>
            <View style={styles.calendarNav}>
              <TouchableOpacity style={styles.navArrow} onPress={handlePrevMonth}>
                <Ionicons name="chevron-back" size={16} color="#1E3A8A" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.navArrow} onPress={handleNextMonth}>
                <Ionicons name="chevron-forward" size={16} color="#1E3A8A" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.daysRow}>
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day, index) => (
              <Text key={index} style={styles.dayLabel}>{day}</Text>
            ))}
          </View>

          <View style={styles.calendarGrid}>
            {calendarDays.map((day, index) => (
              <View key={index} style={styles.calendarCell}>
                {day !== '' && (
                  <View style={[styles.dateCircle, isToday(day) && styles.activeDate]}>
                    <Text style={[styles.dateText, isToday(day) && styles.activeDateText]}>
                      {day}
                    </Text>
                  </View>
                )}
                {isToday(day) && <Text style={styles.todayLabel}>TODAY</Text>}
              </View>
            ))}
          </View>

          <View style={styles.legendRow}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#DC2626' }]} />
              <Text style={styles.legendText}>Library Closures</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#1A202C' }]} />
              <Text style={styles.legendText}>Holiday</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#2563EB' }]} />
              <Text style={styles.legendText}>Daily Shift</Text>
            </View>
          </View>
        </View>

        {/* Assignments Section */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <Ionicons name="people-outline" size={18} color="#1E3A8A" style={styles.sectionIcon} />
            <Text style={styles.sectionTitle}>Student Assistant Assignments</Text>
          </View>
          <View style={styles.assignedBadge}>
            <Text style={styles.assignedBadgeText}>3 Assigned</Text>
          </View>
        </View>

        {assistants.map((item) => (
          <AssistantCard key={item.id} item={item} />
        ))}

        {/* Total Scheduled Card */}
        <View style={styles.scheduledCard}>
          <View style={styles.scheduledIconContainer}>
            <Ionicons name="time-outline" size={20} color="#1E3A8A" />
          </View>
          <Text style={styles.scheduledText}>TOTAL SCHEDULED</Text>
          <Text style={styles.scheduledValue}>h</Text>
        </View>

        {/* August 5 Details Card */}
        <View style={styles.detailsCard}>
          <View style={styles.detailsHeader}>
            <View style={styles.detailsIconContainer}>
              <Ionicons name="calendar" size={20} color="#FFFFFF" />
            </View>
            <View style={styles.eventBadge}>
              <Text style={styles.eventBadgeText}>Event</Text>
            </View>
          </View>
          
          <Text style={styles.detailsTitle}>August 5 Details</Text>
          <Text style={styles.detailsSubtitle}>Jordan Workshop</Text>
          
          <Text style={styles.detailsDescription}>
            Standard operation hours. Use the actions below to assign staff or record absence.
          </Text>

          <View style={styles.actionButtonsRow}>
            {/* Assign Button triggers Assign Modal */}
            <TouchableOpacity 
              style={styles.assignButton} 
              onPress={() => setIsAssignModalVisible(true)}
            >
              <Ionicons name="person-add-outline" size={18} color="#1E3A8A" style={{ marginRight: 6 }} />
              <Text style={styles.assignButtonText}>Assign</Text>
            </TouchableOpacity>
            
            {/* Add Event Button triggers Event Modal */}
            <TouchableOpacity 
              style={styles.addEventButton} 
              onPress={() => setIsEventModalVisible(true)}
            >
              <Ionicons name="add-outline" size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
              <Text style={styles.addEventButtonText}>Add Event</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>

      {/* --- UPDATED BOTTOM NAVIGATION --- */}
      <View style={styles.bottomNav}>
        {/* Home Tab (Active) */}
       <TouchableOpacity 
            style={styles.navItem} 
            onPress={() => router.push('/supervisorDash')}
          >
            <Ionicons name="grid-outline" size={24} color="#6B7280" />
            <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        
        {/* Requests Tab */}
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/supRequest')}>
          <View style={styles.navIconContainer}>
            <Ionicons name="document-text-outline" size={24} color="#6B7280" />
            <View style={styles.navBadge}>
              <Text style={styles.navBadgeText}>1</Text>
            </View>
          </View>
          <Text style={styles.navText}>Requests</Text>
        </TouchableOpacity>

        {/* Calendar Tab */}
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="calendar-outline" size={24} color="#6B7280" />
          <Text style={styles.navText}>Calendar</Text>
        </TouchableOpacity>

        {/* Reports Tab */}
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/supReport')}>
          <Ionicons name="bar-chart-outline" size={24} color="#6B7280" />
          <Text style={styles.navText}>Reports</Text>
        </TouchableOpacity>
      </View>

      {/* --- ADD EVENT MODAL --- */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isEventModalVisible}
        onRequestClose={() => setIsEventModalVisible(false)}
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Event</Text>
              <TouchableOpacity onPress={() => setIsEventModalVisible(false)}>
                <Ionicons name="close-circle" size={28} color="#A0AEC0" />
              </TouchableOpacity>
            </View>

            <Text style={styles.inputLabel}>Date of Event</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="calendar-outline" size={18} color="#A0AEC0" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="e.g. Aug 05, 2026"
                placeholderTextColor="#A0AEC0"
                value={eventDate}
                onChangeText={setEventDate}
              />
            </View>

            <Text style={styles.inputLabel}>Event Type</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={eventType}
                onValueChange={(itemValue) => setEventType(itemValue)}
                style={styles.picker}
                dropdownIconColor="#1E3A8A"
              >
                <Picker.Item label="Strike" value="Strike" />
                <Picker.Item label="Library Closure" value="Library Closure" />
              </Picker>
            </View>

            <Text style={styles.inputLabel}>Time of Event</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="time-outline" size={18} color="#A0AEC0" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="e.g. 14:00 - 16:00"
                placeholderTextColor="#A0AEC0"
                value={eventTime}
                onChangeText={setEventTime}
              />
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setIsEventModalVisible(false)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={handleAddEvent}>
                <Text style={styles.saveButtonText}>Add Event</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* --- ASSIGN SHIFT MODAL --- */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isAssignModalVisible}
        onRequestClose={() => setIsAssignModalVisible(false)}
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Assign Shift</Text>
              <TouchableOpacity onPress={() => setIsAssignModalVisible(false)}>
                <Ionicons name="close-circle" size={28} color="#A0AEC0" />
              </TouchableOpacity>
            </View>

            <Text style={styles.inputLabel}>Student Assistant</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={selectedAssistant}
                onValueChange={(itemValue) => setSelectedAssistant(itemValue)}
                style={styles.picker}
                dropdownIconColor="#1E3A8A"
              >
                {assistants.map((assistant) => (
                  <Picker.Item key={assistant.id} label={assistant.name} value={assistant.name} />
                ))}
              </Picker>
            </View>

            <Text style={styles.inputLabel}>Position</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={selectedPosition}
                onValueChange={(itemValue) => setSelectedPosition(itemValue)}
                style={styles.picker}
                dropdownIconColor="#1E3A8A"
              >
                <Picker.Item label="Icenter" value="Icenter" />
                <Picker.Item label="Help desk" value="Help desk" />
              </Picker>
            </View>

            <Text style={styles.inputLabel}>Date of Shift</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="calendar-outline" size={18} color="#A0AEC0" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="e.g. Aug 05, 2026"
                placeholderTextColor="#A0AEC0"
                value={shiftDate}
                onChangeText={setShiftDate}
              />
            </View>

            <Text style={styles.inputLabel}>Shift Time</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="time-outline" size={18} color="#A0AEC0" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="e.g. 14:00 - 16:00"
                placeholderTextColor="#A0AEC0"
                value={shiftTime}
                onChangeText={setShiftTime}
              />
            </View>

            <Text style={styles.inputLabel}>Duration (Hours)</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="hourglass-outline" size={18} color="#A0AEC0" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="e.g. 2"
                placeholderTextColor="#A0AEC0"
                keyboardType="numeric"
                value={shiftDuration}
                onChangeText={setShiftDuration}
              />
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setIsAssignModalVisible(false)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={handleAssignShift}>
                <Text style={styles.saveButtonText}>Assign</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#8FB3D9' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 12, backgroundColor: '#1E3A8A' },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  backButton: { marginRight: 10 },
  headerTitle: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
  headerSubtitle: { fontSize: 9, fontWeight: '600', color: '#A0C1DD', letterSpacing: 1 },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  iconButton: { marginLeft: 16 },
  scrollContent: { padding: 20, paddingBottom: 100 },
  portalHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  portalIcon: { marginRight: 6 },
  portalTitle: { fontSize: 11, fontWeight: '800', color: '#1E3A8A', letterSpacing: 0.5 },
  pageTitle: { fontSize: 26, fontWeight: '800', color: '#1A202C', marginBottom: 6 },
  pageSubtitle: { fontSize: 14, color: '#4A5568', marginBottom: 20 },
  calendarCard: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, marginBottom: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  calendarHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  calendarMonth: { fontSize: 18, fontWeight: '700', color: '#1A202C' },
  calendarSubtext: { fontSize: 11, fontWeight: '600', color: '#718096', marginTop: 2 },
  calendarNav: { flexDirection: 'row' },
  navArrow: { padding: 8, backgroundColor: '#EDF2F7', borderRadius: 6, marginLeft: 8 },
  daysRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  dayLabel: { width: '14%', textAlign: 'center', fontSize: 12, fontWeight: '600', color: '#718096' },
  calendarGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  calendarCell: { width: '14%', alignItems: 'center', marginBottom: 12, height: 40, justifyContent: 'center' },
  dateCircle: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  activeDate: { backgroundColor: '#1E3A8A' },
  dateText: { fontSize: 13, fontWeight: '600', color: '#1A202C' },
  activeDateText: { color: '#FFFFFF' },
  todayLabel: { fontSize: 8, fontWeight: '800', color: '#1E3A8A', position: 'absolute', bottom: -6 },
  legendRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, borderTopWidth: 1, borderTopColor: '#E2E8F0', paddingTop: 16 },
  legendItem: { flexDirection: 'row', alignItems: 'center' },
  legendDot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
  legendText: { fontSize: 10, color: '#4A5568', fontWeight: '500' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sectionTitleContainer: { flexDirection: 'row', alignItems: 'center' },
  sectionIcon: { marginRight: 6 },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: '#1E3A8A' },
  assignedBadge: { backgroundColor: '#FFFFFF', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  assignedBadgeText: { fontSize: 11, fontWeight: '700', color: '#1E3A8A' },
  assistantCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, marginBottom: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 2 },
  avatar: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  avatarText: { fontSize: 16, fontWeight: '700', color: '#6B46C1' },
  assistantInfo: { flex: 1 },
  assistantName: { fontSize: 15, fontWeight: '700', color: '#1A202C', marginBottom: 2 },
  assistantRole: { fontSize: 12, color: '#718096' },
  statusBadge: { borderWidth: 1, borderColor: '#1E3A8A', borderRadius: 12, paddingHorizontal: 8, paddingVertical: 4 },
  statusBadgePending: { borderColor: '#A0AEC0' },
  statusText: { fontSize: 9, fontWeight: '700', color: '#1E3A8A', letterSpacing: 0.5 },
  statusTextPending: { color: '#A0AEC0' },
  scheduledCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.4)', borderRadius: 12, padding: 16, marginTop: 6, marginBottom: 16, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.6)' },
  scheduledIconContainer: { marginRight: 12 },
  scheduledText: { flex: 1, fontSize: 12, fontWeight: '800', color: '#1E3A8A', letterSpacing: 0.5 },
  scheduledValue: { fontSize: 20, fontWeight: '800', color: '#1E3A8A' },
  detailsCard: { backgroundColor: '#1E3A8A', borderRadius: 12, padding: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 4, marginBottom: 20 },
  detailsHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
  detailsIconContainer: { width: 40, height: 40, borderRadius: 8, backgroundColor: 'rgba(255, 255, 255, 0.2)', justifyContent: 'center', alignItems: 'center' },
  eventBadge: { backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 4 },
  eventBadgeText: { fontSize: 10, fontWeight: '700', color: '#FFFFFF' },
  detailsTitle: { fontSize: 20, fontWeight: '800', color: '#FFFFFF', marginBottom: 4 },
  detailsSubtitle: { fontSize: 14, color: '#A0C1DD', marginBottom: 16 },
  detailsDescription: { fontSize: 13, color: '#E2E8F0', lineHeight: 20, marginBottom: 20 },
  actionButtonsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  assignButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF', borderRadius: 8, paddingVertical: 14, marginRight: 8 },
  assignButtonText: { fontSize: 14, fontWeight: '700', color: '#1E3A8A' },
  addEventButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', borderWidth: 1, borderColor: '#FFFFFF', borderRadius: 8, paddingVertical: 14, marginLeft: 8 },
  addEventButtonText: { fontSize: 14, fontWeight: '700', color: '#FFFFFF' },
  
  // --- UPDATED BOTTOM NAVIGATION STYLES ---
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
    alignItems: 'center' 
  },
  navItem: { 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  navIconContainer: { 
    position: 'relative' 
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
    alignItems: 'center' 
  },
  navBadgeText: { 
    color: '#FFFFFF', 
    fontSize: 10, 
    fontWeight: 'bold' 
  },
  navText: { 
    fontSize: 12, 
    color: '#6B7280', 
    marginTop: 4, 
    fontWeight: '500' 
  },
  navTextActive: { 
    color: '#2563EB', 
    fontWeight: '700' 
  },

  // --- Modal Styles (Shared for both modals) ---
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    maxWidth: 400,
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
    fontSize: 20,
    fontWeight: '800',
    color: '#1A202C',
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A5568',
    marginBottom: 8,
  },
  pickerWrapper: {
    backgroundColor: '#F7FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    marginBottom: 20,
    overflow: 'hidden',
  },
  picker: {
    width: '100%',
    height: 50,
    color: '#1A202C',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 50,
    marginBottom: 24,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#1A202C',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#EDF2F7',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginRight: 8,
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#4A5568',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#1E3A8A',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginLeft: 8,
  },
  saveButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});