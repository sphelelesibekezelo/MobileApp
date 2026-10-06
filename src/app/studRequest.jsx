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
  inputBg: '#F9FAFB',
  helperBg: '#F3F4F6',
};

export default function RequestScreen() {
  const [activeTab, setActiveTab] = useState('Leave Request');
  const [activeNav, setActiveNav] = useState('Request');

  // Form State (Leave Request)
  const [absenceCategory, setAbsenceCategory] = useState('Sick Leave');
  const [numberOfDays, setNumberOfDays] = useState('1 day');
  const [dateRange, setDateRange] = useState('');
  const [justification, setJustification] = useState('');

  // Form State (Shift Swapping)
  const [currentShift, setCurrentShift] = useState('Oct 6, 2026 · 12:00 PM – 04:00 PM · Afternoon');
  const [numberOfShifts, setNumberOfShifts] = useState('1 shift');
  const [newShiftDate, setNewShiftDate] = useState('');
  const [swapReason, setSwapReason] = useState('');

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
                <Text style={styles.userName}>Peter Thomas</Text>
                <Text style={styles.userRole}>Student Assist</Text>
              </View>
              <View style={styles.avatarSmall}>
                <Text style={styles.avatarSmallText}>PT</Text>
              </View>
            </View>
          </View>

          {/* --- TITLE SECTION --- */}
          <View style={styles.titleSection}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>STUDENT PORTAL</Text>
            </View>
            <Text style={styles.pageTitle}>
              {activeTab === 'Leave Request' ? 'Submit a Request' : 'Shift Swapping Request'}
            </Text>
            <Text style={styles.pageSubtitle}>
              {activeTab === 'Leave Request' 
                ? 'Please provide the details for your absence or scheduling change. Approved leave dates become unavailable automatically.'
                : 'Choose an upcoming shift, then choose a new working date. The student assistants available on that date will be listed for you to pick from.'}
            </Text>
          </View>

          {/* --- FORM TOGGLE TABS --- */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tabButton, activeTab === 'Leave Request' && styles.tabButtonActive]}
              onPress={() => setActiveTab('Leave Request')}
            >
              <Feather name="file-text" size={14} color={activeTab === 'Leave Request' ? COLORS.primary : COLORS.textMuted} />
              <Text style={[styles.tabText, activeTab === 'Leave Request' && styles.tabTextActive]}>Leave Request</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tabButton, activeTab === 'Shift Swapping' && styles.tabButtonActive]}
              onPress={() => setActiveTab('Shift Swapping')}
            >
              <Feather name="refresh-cw" size={14} color={activeTab === 'Shift Swapping' ? COLORS.primary : COLORS.textMuted} />
              <Text style={[styles.tabText, activeTab === 'Shift Swapping' && styles.tabTextActive]}>Shift Swapping</Text>
            </TouchableOpacity>
          </View>

          {/* ==================== LEAVE REQUEST FORM ==================== */}
          {activeTab === 'Leave Request' && (
            <View style={styles.formCard}>
              <View style={styles.formHeader}>
                <View>
                  <Text style={styles.formTitle}>Request Details</Text>
                  <Text style={styles.formSubtitle}>Select the type of request you wish to submit.</Text>
                </View>
                <TouchableOpacity style={styles.leaveRequestBadge}>
                  <Feather name="briefcase" size={12} color={COLORS.primary} />
                  <Text style={styles.leaveRequestBadgeText}>Leave Request</Text>
                </TouchableOpacity>
              </View>

              {/* Absence Category */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>ABSENCE CATEGORY</Text>
                <TouchableOpacity style={styles.dropdown}>
                  <Text style={styles.dropdownText}>{absenceCategory}</Text>
                  <Feather name="chevron-down" size={16} color={COLORS.textMuted} />
                </TouchableOpacity>
                <Text style={styles.helperText}>Medical or health related absence</Text>
              </View>

              {/* Number of Days */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>NUMBER OF DAYS</Text>
                <TouchableOpacity style={styles.dropdown}>
                  <Text style={styles.dropdownText}>{numberOfDays}</Text>
                  <Feather name="chevron-down" size={16} color={COLORS.textMuted} />
                </TouchableOpacity>
                <Text style={styles.helperText}>Sick Leave is limited to 5 days per request.</Text>
              </View>

              {/* Date Range */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Date Range <Text style={styles.required}>*</Text></Text>
                <TouchableOpacity style={styles.dropdown} onPress={() => setDateRange('Oct 12, 2026 – Oct 13, 2026')}>
                  <Text style={[styles.dropdownText, !dateRange && { color: '#9CA3AF' }]}>
                    {dateRange || 'Select start date'}
                  </Text>
                  <Feather name="calendar" size={16} color={COLORS.textMuted} />
                </TouchableOpacity>
                <Text style={styles.helperText}>
                  Choose how many days you need, then pick your start date. Past dates, Sundays, public holidays, approved leave, approved swaps and institutional closures are skipped.
                </Text>
              </View>

              {/* Justification & Comments */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Justification & Comments</Text>
                <TextInput
                  style={styles.textArea}
                  multiline
                  numberOfLines={4}
                  placeholder="Example: I need leave to attend a scheduled examination / medical appointment."
                  placeholderTextColor="#9CA3AF"
                  value={justification}
                  onChangeText={setJustification}
                />
              </View>

              {/* Suggested Text */}
              <View style={styles.suggestedTextBox}>
                <Text style={styles.suggestedTextLabel}>SUGGESTED TEXT</Text>
                <Text style={styles.suggestedTextContent}>
                  Medical appointment and recovery · Scheduled examination · Family or personal commitment · University-related activity
                </Text>
              </View>

              {/* Attach Document */}
              <View style={styles.inputGroup}>
                <View style={styles.attachHeader}>
                  <Feather name="upload" size={14} color={COLORS.textMain} />
                  <Text style={styles.label}>Attach Supporting Document</Text>
                </View>
                <View style={styles.uploadBox}>
                  <Feather name="upload-cloud" size={28} color={COLORS.textMuted} />
                  <Text style={styles.uploadTitle}>Drop files here</Text>
                  <Text style={styles.uploadSubtitle}>Supported format: PNG, JPG</Text>
                </View>
                <TouchableOpacity style={styles.uploadButton}>
                  <Text style={styles.uploadButtonText}>Upload</Text>
                </TouchableOpacity>
              </View>

              {/* Form Footer */}
              <View style={styles.formFooter}>
                <View style={styles.draftIndicator}>
                  <Feather name="info" size={14} color={COLORS.textMuted} />
                  <Text style={styles.draftText}>Draft is kept while you complete the form.</Text>
                </View>
                <View style={styles.actionRow}>
                  <TouchableOpacity style={styles.cancelButton}>
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.submitButton}>
                    <Text style={styles.submitButtonText}>Submit Leave Request</Text>
                    <Feather name="chevron-right" size={16} color="#FFF" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}

          {/* ==================== SHIFT SWAPPING FORM ==================== */}
          {activeTab === 'Shift Swapping' && (
            <View>
              {/* Approved Shift Swaps Banner */}
              <View style={styles.bannerCard}>
                <Text style={styles.bannerTitle}>Approved shift swaps</Text>
                <Text style={styles.bannerText}>Original shift → Sep 23, 2026</Text>
              </View>

              <View style={styles.formCard}>
                <View style={styles.formHeader}>
                  <View>
                    <Text style={styles.formTitle}>New Swap Request</Text>
                    <Text style={styles.formSubtitle}>Fill in the details for your proposed shift exchange.</Text>
                  </View>
                </View>

                {/* Section 1: Select Current Shift */}
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionNumber}><Text style={styles.sectionNumberText}>1</Text></View>
                  <Text style={styles.sectionTitle}>SELECT YOUR CURRENT SHIFT</Text>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Current shift</Text>
                  <TouchableOpacity style={styles.dropdown}>
                    <Text style={styles.dropdownText}>{currentShift}</Text>
                    <Feather name="chevron-down" size={16} color={COLORS.textMuted} />
                  </TouchableOpacity>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>NUMBER OF SHIFTS</Text>
                  <TouchableOpacity style={styles.dropdown}>
                    <Text style={styles.dropdownText}>{numberOfShifts}</Text>
                    <Feather name="chevron-down" size={16} color={COLORS.textMuted} />
                  </TouchableOpacity>
                  <Text style={styles.helperText}>Shift Swap is limited to 1 current shift and 1 replacement date per request.</Text>
                </View>

                {/* Section 2: New Shift Date */}
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionNumber}><Text style={styles.sectionNumberText}>2</Text></View>
                  <Text style={styles.sectionTitle}>NEW SHIFT DATE</Text>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>New shift date <Text style={styles.required}>*</Text></Text>
                  <TouchableOpacity style={styles.dropdown} onPress={() => setNewShiftDate('Oct 15, 2026')}>
                    <Text style={[styles.dropdownText, !newShiftDate && { color: '#9CA3AF' }]}>
                      {newShiftDate || 'Select a date'}
                    </Text>
                    <Feather name="calendar" size={16} color={COLORS.textMuted} />
                  </TouchableOpacity>
                  <Text style={styles.helperText}>
                    Use the arrows to browse any month of 2026. Past dates, Sundays, holidays, approved leave, approved swaps and your selected current shift are unavailable.
                  </Text>
                </View>

                {/* Section 3: Available Student Assistants */}
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionNumber}><Text style={styles.sectionNumberText}>3</Text></View>
                  <Text style={styles.sectionTitle}>AVAILABLE STUDENT ASSISTANTS</Text>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Student Assistant</Text>
                  <View style={styles.placeholderBox}>
                    <Text style={styles.placeholderText}>Select a new shift date to see which student assistants are available.</Text>
                  </View>
                </View>

                {/* Reason for Swap */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Reason for Swap</Text>
                  <TextInput
                    style={styles.textArea}
                    multiline
                    numberOfLines={4}
                    placeholder="Example: I need to exchange this shift with an available colleague because of a university timetable conflict."
                    placeholderTextColor="#9CA3AF"
                    value={swapReason}
                    onChangeText={setSwapReason}
                  />
                </View>

                {/* Suggested Text */}
                <View style={styles.suggestedTextBox}>
                  <Text style={styles.suggestedTextLabel}>SUGGESTED TEXT</Text>
                  <Text style={styles.suggestedTextContent}>
                    Medical appointment · Family commitment · Academic timetable conflict · Transport or scheduling issue
                  </Text>
                </View>

                {/* Swap Policy Notice */}
                <View style={styles.policyBox}>
                  <Feather name="info" size={14} color={COLORS.primary} />
                  <Text style={styles.policyText}>
                    All swaps are subject to department lead approval. Approved swaps are shown on your schedule and the swapped dates become unavailable for another request.
                  </Text>
                </View>

                {/* Form Footer */}
                <View style={styles.formFooter}>
                  <View style={styles.draftIndicator}>
                    <Feather name="info" size={14} color={COLORS.textMuted} />
                    <Text style={styles.draftText}>Draft is kept while you complete the form.</Text>
                  </View>
                  <View style={styles.actionRow}>
                    <TouchableOpacity style={styles.cancelButton}>
                      <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.submitButton}>
                      <Text style={styles.submitButtonText}>Submit Swap Request</Text>
                      <Feather name="chevron-right" size={16} color="#FFF" />
                    </TouchableOpacity>
                  </View>
                </View>

              </View>
            </View>
          )}

          {/* Padding for bottom nav */}
          <View style={{ height: 100 }} />
        </ScrollView>

        {/* --- BOTTOM NAVIGATION BAR --- */}
        <View style={styles.bottomNav}>
          {[
            { name: 'Dashboard', icon: 'grid' },
            { name: 'Request', icon: 'plus-circle' },
            { name: 'History', icon: 'clock' },
            { name: 'Schedule', icon: 'calendar' },
            { name: 'Profile', icon: 'user' },
          ].map((item) => (
            <TouchableOpacity
              key={item.name}
              style={styles.navItem}
              onPress={() => setActiveNav(item.name)}
            >
              <Feather
                name={item.icon}
                size={20}
                color={activeNav === item.name ? COLORS.primary : COLORS.textMuted}
              />
              <Text
                style={[
                  styles.navText,
                  activeNav === item.name && styles.navTextActive,
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
  tag: { backgroundColor: '#EFF6FF', alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, marginBottom: 8 },
  tagText: { fontSize: 10, fontWeight: 'bold', color: COLORS.primary, letterSpacing: 1 },
  pageTitle: { fontSize: 24, fontWeight: 'bold', color: COLORS.darkBlue, fontFamily: 'serif', marginBottom: 8 },
  pageSubtitle: { fontSize: 13, color: COLORS.textMuted, lineHeight: 18 },

  // Toggle Tabs
  tabContainer: {
    flexDirection: 'row', backgroundColor: '#FFF', borderRadius: 8, padding: 4,
    borderWidth: 1, borderColor: COLORS.border, marginBottom: 16,
  },
  tabButton: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    paddingVertical: 10, borderRadius: 6, gap: 6,
  },
  tabButtonActive: { backgroundColor: COLORS.primary },
  tabText: { fontSize: 12, fontWeight: '600', color: COLORS.textMuted },
  tabTextActive: { color: '#FFF' },

  // Form Card
  formCard: {
    backgroundColor: COLORS.card, borderRadius: 12, padding: 16,
    borderWidth: 1, borderColor: COLORS.border, marginBottom: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05, shadowRadius: 4, elevation: 2,
  },
  formHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
  formTitle: { fontSize: 16, fontWeight: 'bold', color: COLORS.textMain, marginBottom: 4 },
  formSubtitle: { fontSize: 12, color: COLORS.textMuted, maxWidth: '70%' },
  leaveRequestBadge: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#EFF6FF',
    paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, gap: 4,
  },
  leaveRequestBadgeText: { fontSize: 10, fontWeight: 'bold', color: COLORS.primary },

  // Input Groups
  inputGroup: { marginBottom: 16 },
  label: { fontSize: 10, fontWeight: 'bold', color: COLORS.textMain, letterSpacing: 0.5, marginBottom: 6 },
  required: { color: COLORS.danger },
  dropdown: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: COLORS.inputBg, borderWidth: 1, borderColor: COLORS.border,
    borderRadius: 6, paddingHorizontal: 12, paddingVertical: 12,
  },
  dropdownText: { fontSize: 13, color: COLORS.textMain, flex: 1 },
  helperText: { fontSize: 11, color: COLORS.textMuted, marginTop: 4, lineHeight: 16 },
  textArea: {
    backgroundColor: COLORS.inputBg, borderWidth: 1, borderColor: COLORS.border,
    borderRadius: 6, paddingHorizontal: 12, paddingVertical: 12,
    fontSize: 13, color: COLORS.textMain, textAlignVertical: 'top', minHeight: 100,
  },

  // Suggested Text
  suggestedTextBox: {
    backgroundColor: COLORS.helperBg, borderRadius: 6, padding: 12, marginBottom: 16,
  },
  suggestedTextLabel: { fontSize: 9, fontWeight: 'bold', color: COLORS.textMuted, marginBottom: 4, letterSpacing: 0.5 },
  suggestedTextContent: { fontSize: 11, color: COLORS.textMain, lineHeight: 16 },

  // Upload
  attachHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
  uploadBox: {
    borderWidth: 2, borderStyle: 'dashed', borderColor: '#D1D5DB',
    borderRadius: 8, padding: 24, alignItems: 'center', justifyContent: 'center',
    backgroundColor: COLORS.inputBg, marginBottom: 8,
  },
  uploadTitle: { fontSize: 13, fontWeight: 'bold', color: COLORS.textMain, marginTop: 8 },
  uploadSubtitle: { fontSize: 11, color: COLORS.textMuted, marginTop: 2 },
  uploadButton: {
    backgroundColor: COLORS.primary, paddingVertical: 8, paddingHorizontal: 16,
    borderRadius: 4, alignSelf: 'flex-end',
  },
  uploadButtonText: { color: '#FFF', fontSize: 12, fontWeight: 'bold' },

  // Form Footer
  formFooter: { borderTopWidth: 1, borderTopColor: COLORS.border, paddingTop: 16, marginTop: 8 },
  draftIndicator: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 12 },
  draftText: { fontSize: 11, color: COLORS.textMuted },
  actionRow: { flexDirection: 'row', justifyContent: 'flex-end', gap: 8 },
  cancelButton: {
    backgroundColor: COLORS.danger, paddingVertical: 10, paddingHorizontal: 20,
    borderRadius: 6,
  },
  cancelButtonText: { color: '#FFF', fontSize: 13, fontWeight: 'bold' },
  submitButton: {
    backgroundColor: COLORS.primary, flexDirection: 'row', alignItems: 'center',
    paddingVertical: 10, paddingHorizontal: 20, borderRadius: 6, gap: 6,
  },
  submitButtonText: { color: '#FFF', fontSize: 13, fontWeight: 'bold' },

  // Shift Swapping Specific
  bannerCard: {
    backgroundColor: '#F3F4F6', borderRadius: 8, padding: 16, marginBottom: 16,
    borderWidth: 1, borderColor: COLORS.border,
  },
  bannerTitle: { fontSize: 13, fontWeight: 'bold', color: COLORS.textMain, marginBottom: 4 },
  bannerText: { fontSize: 12, color: COLORS.textMuted },
  
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12, marginTop: 8 },
  sectionNumber: {
    width: 20, height: 20, borderRadius: 10, backgroundColor: COLORS.primary,
    justifyContent: 'center', alignItems: 'center',
  },
  sectionNumberText: { color: '#FFF', fontSize: 11, fontWeight: 'bold' },
  sectionTitle: { fontSize: 11, fontWeight: 'bold', color: COLORS.textMain, letterSpacing: 1 },

  placeholderBox: {
    backgroundColor: '#F9FAFB', borderWidth: 1, borderColor: COLORS.border,
    borderRadius: 6, padding: 16, justifyContent: 'center', alignItems: 'center',
  },
  placeholderText: { fontSize: 12, color: COLORS.textMuted, textAlign: 'center' },

  // Policy
  policyBox: {
    flexDirection: 'row', backgroundColor: '#EFF6FF', borderRadius: 6, padding: 12,
    gap: 8, marginBottom: 16,
  },
  policyText: { fontSize: 11, color: COLORS.textMain, flex: 1, lineHeight: 16 },

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