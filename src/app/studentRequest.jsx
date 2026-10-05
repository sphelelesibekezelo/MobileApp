// src/app/studentRequest.jsx

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

// ---------------------------------------------------------------------------
// Mock data (replace with real data from your backend later)
// ---------------------------------------------------------------------------
const ABSENCE_CATEGORIES = [
  {
    id: 'dayoff',
    title: 'Day-off Request',
    subtitle: 'Standard scheduled time away',
    icon: 'calendar-outline',
    color: '#2563EB',
    bg: '#EEF2FF',
  },
  {
    id: 'sick',
    title: 'Sick Leave',
    subtitle: 'Medical or health related absence',
    icon: 'medkit-outline',
    color: '#DC2626',
    bg: '#FDEAEA',
  },
  {
    id: 'exam',
    title: 'Exam Leave',
    subtitle: 'Absence for scheduled examinations',
    icon: 'book-outline',
    color: '#7C3AED',
    bg: '#EDE9FE',
  },
  {
    id: 'personal',
    title: 'Personal Issues',
    subtitle: 'Urgent family or personal matters',
    icon: 'person-outline',
    color: '#4B5563',
    bg: '#F3F4F6',
  },
];

const MY_SHIFTS = [
  { id: 's1', tag: 'REGULAR SHIFT', date: 'Oct 15, 2026', time: '08:00 AM - 04:00 PM' },
  { id: 's2', tag: 'EVENING COVERAGE', date: 'Oct 17, 2026', time: '10:00 AM - 06:00 PM' },
];

const serifFont = Platform.select({ ios: 'Georgia', android: 'serif', default: 'serif' });

// ---------------------------------------------------------------------------
// Calendar helpers
// ---------------------------------------------------------------------------
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const MONTH_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

const CAL_DAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const dayOnly = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

const startOfMonth = (d) => new Date(d.getFullYear(), d.getMonth(), 1);

const addMonths = (d, n) => new Date(d.getFullYear(), d.getMonth() + n, 1);

const sameDay = (a, b) =>
  !!a && !!b &&
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const dayCount = (start, end) => Math.round((end - start) / 86400000) + 1;

const formatShort = (d) => `${MONTH_SHORT[d.getMonth()]} ${d.getDate()}`;

// "Oct 12, 2026" or "Oct 12 - Oct 14, 2026" (adds years if the range crosses years)
const formatRange = (start, end) => {
  if (sameDay(start, end)) {
    return `${formatShort(start)}, ${start.getFullYear()}`;
  }
  if (start.getFullYear() === end.getFullYear()) {
    return `${formatShort(start)} - ${formatShort(end)}, ${end.getFullYear()}`;
  }
  return `${formatShort(start)}, ${start.getFullYear()} - ${formatShort(end)}, ${end.getFullYear()}`;
};

export default function StudentRequest() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState('leave'); // 'leave' | 'swap'

  // Leave request state
  const [category, setCategory] = useState('dayoff');
  const [dateRange, setDateRange] = useState('');
  const [comments, setComments] = useState('');
  const [attachment, setAttachment] = useState(null); // { name, uri }
  const [rangeStart, setRangeStart] = useState(null); // Date | null
  const [rangeEnd, setRangeEnd] = useState(null); // Date | null
  const [showCalendar, setShowCalendar] = useState(false);

  // In-app message popup (works on phone AND web, unlike Alert.alert)
  const [notice, setNotice] = useState(null); // { type, title, message }
  const showNotice = (type, title, message) => setNotice({ type, title, message });

  // Shift swap state
  const [currentShift, setCurrentShift] = useState(null);
  const [colleague, setColleague] = useState('');
  const [newShift, setNewShift] = useState('');
  const [swapReason, setSwapReason] = useState('');

  // ------------------------------- Handlers --------------------------------
  const pickAttachment = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['image/png', 'image/jpeg'],
        copyToCacheDirectory: true,
      });

      if (result.canceled) return;

      const file = result.assets && result.assets[0];
      if (file) setAttachment({ name: file.name, uri: file.uri });
    } catch (error) {
      showNotice('error', 'Upload failed', 'Could not select the file. Please try again.');
    }
  };

  const applyRange = (start, end) => {
    setRangeStart(start);
    setRangeEnd(end);
    setDateRange(formatRange(start, end));
    setShowCalendar(false);
  };

  const clearRange = () => {
    setRangeStart(null);
    setRangeEnd(null);
    setDateRange('');
    setShowCalendar(false);
  };

  const resetLeaveForm = () => {
    setCategory('dayoff');
    setDateRange('');
    setRangeStart(null);
    setRangeEnd(null);
    setComments('');
    setAttachment(null);
  };

  const resetSwapForm = () => {
    setCurrentShift(null);
    setColleague('');
    setNewShift('');
    setSwapReason('');
  };

  const submitLeave = () => {
    if (!category) {
      showNotice('error', 'Missing information', 'Please select an absence category.');
      return;
    }
    if (!dateRange.trim()) {
      showNotice('error', 'Missing information', 'Please enter your date range.');
      return;
    }
    if (!comments.trim()) {
      showNotice('error', 'Missing information', 'Please provide a brief explanation for your request.');
      return;
    }

    // TODO: send { category, dateRange, comments, attachment } to your backend
    showNotice('success', 'Request submitted', 'Your leave request has been sent for approval.');
    resetLeaveForm();
  };

  const submitSwap = () => {
    if (!currentShift) {
      showNotice('error', 'Missing information', 'Please select your current shift.');
      return;
    }
    if (!colleague.trim()) {
      showNotice('error', 'Missing information', 'Please enter the target colleague.');
      return;
    }
    if (!newShift.trim()) {
      showNotice('error', 'Missing information', 'Please enter the target date / shift.');
      return;
    }
    if (!swapReason.trim()) {
      showNotice('error', 'Missing information', 'Please explain why this swap is necessary.');
      return;
    }

    // TODO: send { currentShift, colleague, newShift, swapReason } to your backend
    showNotice('success', 'Swap request submitted', 'Your shift swap request has been sent for approval.');
    resetSwapForm();
  };

  // --------------------------------- UI ------------------------------------
  return (
    <SafeAreaView style={styles.safeArea}>

      {/* Top Header Bar */}
      <View style={styles.headerBar}>
        <View style={styles.headerLeft}>
          <View style={styles.logoContainer}>
            <Ionicons name="school" size={16} color="#FFFFFF" />
          </View>
          <Text style={styles.headerTitle}>StudentAssistant</Text>
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

      <View style={styles.userRow}>
        <Text style={styles.userName}>Nicholas Mathebula</Text>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >

          {/* ============================ LEAVE REQUEST ============================ */}
          {activeTab === 'leave' ? (
            <>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>SCHEDULING MANAGEMENT</Text>
              </View>

              <Text style={styles.pageTitle}>Submit a request</Text>

              <Toggle activeTab={activeTab} onChange={setActiveTab} />

              {/* Absence category */}
              <View style={styles.sectionRow}>
                <Text style={styles.sectionLabel}>ABSENCE CATEGORY</Text>
                <View style={styles.selectOnePill}>
                  <Text style={styles.selectOneText}>Select one</Text>
                </View>
              </View>

              {ABSENCE_CATEGORIES.map((item) => {
                const selected = category === item.id;

                return (
                  <TouchableOpacity
                    key={item.id}
                    style={[styles.categoryCard, selected && styles.categoryCardSelected]}
                    onPress={() => setCategory(item.id)}
                    activeOpacity={0.8}
                  >
                    <View style={[styles.categoryIcon, { backgroundColor: item.bg }]}>
                      <Ionicons name={item.icon} size={18} color={item.color} />
                    </View>

                    <View style={styles.categoryInfo}>
                      <Text style={styles.categoryTitle}>{item.title}</Text>
                      <Text style={styles.categorySubtitle}>{item.subtitle}</Text>
                    </View>

                    {selected ? (
                      <View style={styles.checkCircle}>
                        <Ionicons name="chevron-forward" size={12} color="#FFFFFF" />
                      </View>
                    ) : null}
                  </TouchableOpacity>
                );
              })}

              {/* Date range */}
              <Text style={[styles.sectionLabel, styles.sectionSpacing]}>DATE RANGE</Text>
              <TouchableOpacity
                style={styles.inputRow}
                onPress={() => setShowCalendar(true)}
                activeOpacity={0.8}
              >
                <Ionicons name="calendar-outline" size={16} color="#4B5563" />
                <Text style={[styles.inputText, !dateRange && styles.placeholderText]}>
                  {dateRange || 'Select dates (e.g., Oct 12 - Oct 14)'}
                </Text>
                <Ionicons name="chevron-down" size={16} color="#6B7280" />
              </TouchableOpacity>

              {/* Justification */}
              <Text style={[styles.sectionLabel, styles.sectionSpacing]}>
                JUSTIFICATION & COMMENTS
              </Text>
              <View style={[styles.inputRow, styles.textAreaRow]}>
                <Ionicons
                  name="chatbox-outline"
                  size={16}
                  color="#4B5563"
                  style={{ marginTop: 2 }}
                />
                <TextInput
                  style={[styles.inputText, styles.textArea]}
                  placeholder="Please provide a brief explanation for your request..."
                  placeholderTextColor="#6B7280"
                  value={comments}
                  onChangeText={setComments}
                  multiline
                  textAlignVertical="top"
                />
              </View>

              <Text style={styles.attachNote}>Attach supporting documents in the next step</Text>

              {/* Upload files */}
              <View style={styles.uploadCard}>
                <Text style={styles.uploadHeading}>Upload files</Text>

                <TouchableOpacity
                  style={styles.dropZone}
                  onPress={pickAttachment}
                  activeOpacity={0.8}
                >
                  <Ionicons name="cloud-upload-outline" size={22} color="#4B5563" />
                  <Text style={styles.dropText} numberOfLines={1}>
                    {attachment ? attachment.name : 'Drop files here'}
                  </Text>
                  <Text style={styles.dropFormat}>SUPPORTED FORMAT: PNG, JPG</Text>
                </TouchableOpacity>

                <View style={styles.uploadActions}>
                  <TouchableOpacity onPress={() => setAttachment(null)}>
                    <Text style={styles.uploadCancel}>Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.uploadButton} onPress={pickAttachment}>
                    <Text style={styles.uploadButtonText}>Upload</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity style={styles.submitButton} onPress={submitLeave}>
                <Text style={styles.submitText}>Submit Request</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.cancelLink} onPress={resetLeaveForm}>
                <Text style={styles.cancelLinkText}>Cancel Request</Text>
              </TouchableOpacity>
            </>
          ) : (
            /* =========================== SHIFT SWAPPING ========================== */
            <>
              <View style={styles.swapTopRow}>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>SCHEDULING MANAGEMENT</Text>
                </View>

                <TouchableOpacity>
                  <Text style={styles.staffingLink}>View Staffing Report</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.pageTitle}>Shift Swapping{'\n'}Request</Text>

              <Text style={styles.pageSubtitle}>
                Need to change your schedule? Use this form to request a shift swap with
                another eligible team member.
              </Text>

              <Toggle activeTab={activeTab} onChange={setActiveTab} />

              {/* New swap request info card */}
              <View style={styles.infoCard}>
                <View style={styles.infoCardIcon}>
                  <Ionicons name="sync-outline" size={20} color="#2563EB" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.infoCardTitle}>New Swap Request</Text>
                  <Text style={styles.infoCardText}>
                    Fill in the details for your proposed exchange.
                  </Text>
                </View>
              </View>

              {/* 1. Select current shift */}
              <View style={styles.stepRow}>
                <View style={styles.stepBar} />
                <Text style={styles.stepTitle}>1. SELECT YOUR CURRENT SHIFT</Text>
              </View>

              {MY_SHIFTS.map((shift) => {
                const selected = currentShift === shift.id;

                return (
                  <TouchableOpacity
                    key={shift.id}
                    style={[styles.shiftCard, selected && styles.shiftCardSelected]}
                    onPress={() => setCurrentShift(shift.id)}
                    activeOpacity={0.8}
                  >
                    <View style={styles.shiftTag}>
                      <Text style={styles.shiftTagText}>{shift.tag}</Text>
                    </View>

                    <View style={styles.shiftLine}>
                      <Ionicons name="calendar-outline" size={16} color="#111827" />
                      <Text style={styles.shiftDate}>{shift.date}</Text>
                    </View>

                    <View style={styles.shiftLine}>
                      <Ionicons name="time-outline" size={12} color="#6B7280" />
                      <Text style={styles.shiftTime}>{shift.time}</Text>
                    </View>

                    <View style={styles.radioWrap}>
                      <Ionicons
                        name={selected ? 'checkmark-circle' : 'ellipse-outline'}
                        size={20}
                        color={selected ? '#2563EB' : '#9CA3AF'}
                      />
                    </View>
                  </TouchableOpacity>
                );
              })}

              {/* 2. Proposed swap details */}
              <View style={[styles.stepRow, { marginTop: 18 }]}>
                <View style={styles.stepBar} />
                <Text style={styles.stepTitle}>2. PROPOSED SWAP DETAILS</Text>
              </View>

              <View style={styles.fieldLabelRow}>
                <Ionicons name="person-outline" size={11} color="#374151" />
                <Text style={styles.fieldLabel}>TARGET COLLEAGUE</Text>
              </View>
              <View style={styles.inputRow}>
                <TextInput
                  style={[styles.inputText, { marginLeft: 0 }]}
                  placeholder="Search by name or ID..."
                  placeholderTextColor="#6B7280"
                  value={colleague}
                  onChangeText={setColleague}
                />
                <Ionicons name="chevron-forward" size={16} color="#111827" />
              </View>

              <View style={styles.fieldLabelRow}>
                <Ionicons name="calendar-outline" size={11} color="#374151" />
                <Text style={styles.fieldLabel}>NEW DATE / SHIFT</Text>
              </View>
              <View style={styles.inputRow}>
                <TextInput
                  style={[styles.inputText, { marginLeft: 0 }]}
                  placeholder="Select the target shift..."
                  placeholderTextColor="#6B7280"
                  value={newShift}
                  onChangeText={setNewShift}
                />
                <Ionicons name="calendar-outline" size={16} color="#111827" />
              </View>

              <View style={styles.fieldLabelRow}>
                <Ionicons name="chatbox-outline" size={11} color="#374151" />
                <Text style={styles.fieldLabel}>REASON FOR SWAP</Text>
              </View>
              <View style={[styles.inputRow, styles.reasonRow]}>
                <TextInput
                  style={[styles.inputText, styles.reasonInput, { marginLeft: 0 }]}
                  placeholder="Briefly explain why this swap is necessary (e.g., family commitment, medical appointment)..."
                  placeholderTextColor="#6B7280"
                  value={swapReason}
                  onChangeText={setSwapReason}
                  multiline
                  textAlignVertical="top"
                />
              </View>

              {/* Policy notice */}
              <View style={styles.policyCard}>
                <Ionicons name="information-circle" size={18} color="#7C3AED" />
                <View style={{ flex: 1, marginLeft: 8 }}>
                  <Text style={styles.policyTitle}>Swap Policy Notice</Text>
                  <Text style={styles.policyText}>
                    Both parties must agree to the swap via the portal before final
                    administrative approval. Swaps must be requested at least 24 hours in
                    advance.
                  </Text>
                </View>
              </View>

              <TouchableOpacity style={styles.submitButton} onPress={submitSwap}>
                <Text style={styles.submitText}>Submit Swap Request</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.cancelLink} onPress={resetSwapForm}>
                <Text style={styles.cancelLinkText}>Cancel Request</Text>
              </TouchableOpacity>
            </>
          )}

        </ScrollView>
      </KeyboardAvoidingView>

      {/* Success / error message popup */}
      <NoticeModal notice={notice} onClose={() => setNotice(null)} />

      {/* Date range calendar popup */}
      <DateRangeModal
        visible={showCalendar}
        initialStart={rangeStart}
        initialEnd={rangeEnd}
        onClose={() => setShowCalendar(false)}
        onApply={applyRange}
        onClear={clearRange}
      />

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

        {/* REQUESTS (active on this screen) */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.replace('/studentRequest')}
        >
          <View style={styles.navIconContainer}>
            <Ionicons name="clipboard" size={24} color="#2563EB" />
            <View style={styles.navRedDot} />
          </View>

          <Text style={[styles.navText, styles.navTextActive]}>Requests</Text>
        </TouchableOpacity>

        {/* HISTORY */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push('/studentHistory')}
        >
          <MaterialCommunityIcons name="history" size={24} color="#6B7280" />
          <Text style={styles.navText}>History</Text>
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

// ---------------------------------------------------------------------------
// Message popup shown after Submit (success) or when something is missing (error)
// ---------------------------------------------------------------------------
function NoticeModal({ notice, onClose }) {
  const isSuccess = notice && notice.type === 'success';

  return (
    <Modal visible={!!notice} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.calOverlay}>
        <View style={styles.noticeCard}>
          <View
            style={[
              styles.noticeIcon,
              { backgroundColor: isSuccess ? '#DCFCE7' : '#FEE2E2' },
            ]}
          >
            <Ionicons
              name={isSuccess ? 'checkmark-circle' : 'alert-circle'}
              size={34}
              color={isSuccess ? '#16A34A' : '#DC2626'}
            />
          </View>

          <Text style={styles.noticeTitle}>{notice ? notice.title : ''}</Text>
          <Text style={styles.noticeMessage}>{notice ? notice.message : ''}</Text>

          <TouchableOpacity
            style={[
              styles.noticeButton,
              { backgroundColor: isSuccess ? '#16A34A' : '#2563EB' },
            ]}
            onPress={onClose}
          >
            <Text style={styles.noticeButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

// ---------------------------------------------------------------------------
// Calendar popup: pick a start date and an end date, move between any months
// ---------------------------------------------------------------------------
function DateRangeModal({ visible, initialStart, initialEnd, onClose, onApply, onClear }) {
  const [viewMonth, setViewMonth] = useState(() => startOfMonth(initialStart || new Date()));
  const [start, setStart] = useState(initialStart);
  const [end, setEnd] = useState(initialEnd);

  // Re-sync with the saved range every time the popup opens
  useEffect(() => {
    if (visible) {
      setStart(initialStart);
      setEnd(initialEnd);
      setViewMonth(startOfMonth(initialStart || new Date()));
    }
  }, [visible]);

  const today = dayOnly(new Date());

  // Build the grid of days for the visible month
  const year = viewMonth.getFullYear();
  const month = viewMonth.getMonth();
  const firstWeekday = viewMonth.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < firstWeekday; i += 1) cells.push(null);
  for (let d = 1; d <= daysInMonth; d += 1) cells.push(new Date(year, month, d));
  while (cells.length % 7 !== 0) cells.push(null);

  const onDayPress = (date) => {
    if (!start || (start && end)) {
      // Start a new range
      setStart(date);
      setEnd(null);
    } else if (date < start) {
      // Tapped before the start -> move the start earlier
      setStart(date);
    } else {
      // Tapped on/after the start -> this is the end (same day = single day)
      setEnd(date);
    }
  };

  const inRange = (date) => !!start && !!end && date > start && date < end;

  let summary = 'Select a start date';
  if (start && end) {
    const n = dayCount(start, end);
    summary = `${formatRange(start, end)}  •  ${n} day${n === 1 ? '' : 's'}`;
  } else if (start) {
    summary = `${formatShort(start)}  –  now select an end date`;
  }

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.calOverlay}>
        <View style={styles.calCard}>

          {/* Month header with back / forward arrows */}
          <View style={styles.calHeader}>
            <TouchableOpacity
              style={styles.calNavButton}
              onPress={() => setViewMonth((m) => addMonths(m, -1))}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="chevron-back" size={18} color="#1E4E8C" />
            </TouchableOpacity>

            <Text style={styles.calMonthTitle}>
              {MONTH_NAMES[month]} {year}
            </Text>

            <TouchableOpacity
              style={styles.calNavButton}
              onPress={() => setViewMonth((m) => addMonths(m, 1))}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="chevron-forward" size={18} color="#1E4E8C" />
            </TouchableOpacity>
          </View>

          {/* Weekday labels */}
          <View style={styles.calWeekRow}>
            {CAL_DAY_LABELS.map((label, index) => (
              <Text key={`${label}-${index}`} style={styles.calWeekLabel}>
                {label}
              </Text>
            ))}
          </View>

          {/* Days */}
          <View style={styles.calGrid}>
            {cells.map((date, index) => {
              if (!date) {
                return <View key={`empty-${index}`} style={styles.calCell} />;
              }

              const isStart = sameDay(date, start);
              const isEnd = sameDay(date, end);
              const isEdge = isStart || isEnd;
              const isToday = sameDay(date, today);

              return (
                <TouchableOpacity
                  key={date.toISOString()}
                  style={[styles.calCell, inRange(date) && styles.calCellInRange]}
                  onPress={() => onDayPress(date)}
                  activeOpacity={0.7}
                >
                  <View
                    style={[
                      styles.calDay,
                      isToday && !isEdge && styles.calDayToday,
                      isEdge && styles.calDayEdge,
                    ]}
                  >
                    <Text style={[styles.calDayText, isEdge && styles.calDayTextEdge]}>
                      {date.getDate()}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={styles.calSummary}>{summary}</Text>

          {/* Actions */}
          <View style={styles.calActions}>
            <TouchableOpacity onPress={onClear}>
              <Text style={styles.calClear}>Clear</Text>
            </TouchableOpacity>

            <View style={styles.calActionsRight}>
              <TouchableOpacity onPress={onClose} style={styles.calCancelButton}>
                <Text style={styles.calCancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.calApplyButton, !start && styles.calApplyDisabled]}
                disabled={!start}
                onPress={() => onApply(start, end || start)}
              >
                <Text style={styles.calApplyText}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>
      </View>
    </Modal>
  );
}

// ---------------------------------------------------------------------------
// Segmented toggle: Leave Request | Shift Swapping
// ---------------------------------------------------------------------------
function Toggle({ activeTab, onChange }) {
  return (
    <View style={styles.toggleWrap}>
      <TouchableOpacity
        style={[styles.toggleItem, activeTab === 'leave' && styles.toggleItemActive]}
        onPress={() => onChange('leave')}
        activeOpacity={0.8}
      >
        <Ionicons
          name="document-text-outline"
          size={14}
          color={activeTab === 'leave' ? '#111827' : '#6B7280'}
        />
        <Text style={[styles.toggleText, activeTab === 'leave' && styles.toggleTextActive]}>
          Leave Request
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.toggleItem, activeTab === 'swap' && styles.toggleItemActive]}
        onPress={() => onChange('swap')}
        activeOpacity={0.8}
      >
        <Ionicons
          name="swap-horizontal-outline"
          size={14}
          color={activeTab === 'swap' ? '#111827' : '#6B7280'}
        />
        <Text style={[styles.toggleText, activeTab === 'swap' && styles.toggleTextActive]}>
          Shift Swapping
        </Text>
      </TouchableOpacity>
    </View>
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
    paddingBottom: 4,
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
    fontWeight: '700',
    color: '#111827',
  },

  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  headerIcon: {
    marginLeft: 14,
  },

  userRow: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingBottom: 8,
    alignItems: 'flex-end',
  },

  userName: {
    fontSize: 11,
    fontWeight: '700',
    color: '#111827',
  },

  scrollContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 30,
  },

  // --- Page heading ---
  badge: {
    alignSelf: 'flex-start',
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

  pageTitle: {
    fontFamily: serifFont,
    fontSize: 26,
    fontWeight: '700',
    color: '#111827',
    marginTop: 10,
    marginBottom: 12,
  },

  pageSubtitle: {
    fontSize: 12,
    lineHeight: 18,
    color: '#1F2937',
    marginBottom: 14,
  },

  swapTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  staffingLink: {
    fontSize: 10,
    fontWeight: '700',
    color: '#2563EB',
  },

  // --- Toggle ---
  toggleWrap: {
    flexDirection: 'row',
    backgroundColor: '#E5E7EB',
    borderRadius: 10,
    padding: 3,
    marginBottom: 16,
  },

  toggleItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9,
    borderRadius: 8,
  },

  toggleItemActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },

  toggleText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    marginLeft: 6,
  },

  toggleTextActive: {
    color: '#111827',
    fontWeight: '700',
  },

  // --- Section labels ---
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  sectionLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#374151',
    letterSpacing: 0.8,
  },

  sectionSpacing: {
    marginTop: 18,
    marginBottom: 8,
  },

  selectOnePill: {
    backgroundColor: '#DBEAFE',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },

  selectOneText: {
    fontSize: 8,
    fontWeight: '700',
    color: '#2563EB',
  },

  // --- Category cards ---
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },

  categoryCardSelected: {
    borderColor: '#2563EB',
  },

  categoryIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  categoryInfo: {
    flex: 1,
  },

  categoryTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#111827',
  },

  categorySubtitle: {
    fontSize: 9,
    color: '#6B7280',
    marginTop: 2,
  },

  checkCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // --- Inputs ---
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 4,
  },

  inputText: {
    flex: 1,
    fontSize: 12,
    color: '#111827',
    marginLeft: 8,
    paddingVertical: 2,
  },

  textAreaRow: {
    alignItems: 'flex-start',
  },

  textArea: {
    minHeight: 50,
  },

  attachNote: {
    fontSize: 9,
    color: '#374151',
    marginTop: 12,
    marginBottom: 6,
  },

  // --- Upload card ---
  uploadCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginTop: 4,
  },

  uploadHeading: {
    fontSize: 11,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },

  dropZone: {
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#93C5FD',
    backgroundColor: '#EFF6FF',
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 10,
    alignItems: 'center',
  },

  dropText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#374151',
    marginTop: 4,
  },

  dropFormat: {
    fontSize: 8,
    fontWeight: '700',
    color: '#6B7280',
    marginTop: 4,
  },

  uploadActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingHorizontal: 4,
  },

  uploadCancel: {
    fontSize: 10,
    color: '#6B7280',
    fontWeight: '600',
  },

  uploadButton: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    paddingHorizontal: 22,
    paddingVertical: 4,
  },

  uploadButtonText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },

  // --- Submit ---
  submitButton: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 24,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },

  submitText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },

  cancelLink: {
    alignItems: 'center',
    paddingVertical: 14,
  },

  cancelLinkText: {
    fontSize: 10,
    color: '#374151',
    fontWeight: '600',
  },

  // --- Shift swap ---
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 18,
  },

  infoCardIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  infoCardTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#111827',
  },

  infoCardText: {
    fontSize: 10,
    color: '#6B7280',
    marginTop: 2,
  },

  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  stepBar: {
    width: 3,
    height: 14,
    backgroundColor: '#2563EB',
    marginRight: 8,
  },

  stepTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: '#111827',
    letterSpacing: 0.5,
  },

  shiftCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },

  shiftCardSelected: {
    borderColor: '#2563EB',
  },

  shiftTag: {
    alignSelf: 'flex-start',
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginBottom: 8,
  },

  shiftTagText: {
    fontSize: 7,
    fontWeight: '800',
    color: '#4B5563',
    letterSpacing: 0.5,
  },

  shiftLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },

  shiftDate: {
    fontSize: 15,
    fontWeight: '800',
    color: '#111827',
    marginLeft: 8,
  },

  shiftTime: {
    fontSize: 9,
    color: '#6B7280',
    marginLeft: 8,
  },

  radioWrap: {
    position: 'absolute',
    top: 12,
    right: 12,
  },

  fieldLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 6,
  },

  fieldLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: '#374151',
    letterSpacing: 0.5,
    marginLeft: 5,
  },

  reasonRow: {
    alignItems: 'flex-start',
  },

  reasonInput: {
    minHeight: 90,
  },

  policyCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#EDE9FE',
    borderRadius: 12,
    padding: 12,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#DDD6FE',
  },

  policyTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: '#6D28D9',
  },

  policyText: {
    fontSize: 9,
    lineHeight: 13,
    color: '#4B5563',
    marginTop: 2,
  },

  placeholderText: {
    color: '#6B7280',
  },

  // --- Success / error notice popup ---
  noticeCard: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 22,
    alignItems: 'center',
  },

  noticeIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },

  noticeTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111827',
    textAlign: 'center',
  },

  noticeMessage: {
    fontSize: 12,
    lineHeight: 18,
    color: '#4B5563',
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 18,
  },

  noticeButton: {
    borderRadius: 10,
    paddingHorizontal: 40,
    paddingVertical: 10,
  },

  noticeButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },

  // --- Date range calendar popup ---
  calOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  calCard: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
  },

  calHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  calNavButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  calMonthTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#111827',
  },

  calWeekRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },

  calWeekLabel: {
    width: `${100 / 7}%`,
    textAlign: 'center',
    fontSize: 10,
    fontWeight: '700',
    color: '#6B7280',
  },

  calGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  calCell: {
    width: `${100 / 7}%`,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  calCellInRange: {
    backgroundColor: '#DBEAFE',
  },

  calDay: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },

  calDayToday: {
    borderWidth: 1.5,
    borderColor: '#2563EB',
  },

  calDayEdge: {
    backgroundColor: '#2563EB',
  },

  calDayText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#111827',
  },

  calDayTextEdge: {
    color: '#FFFFFF',
    fontWeight: '800',
  },

  calSummary: {
    fontSize: 11,
    fontWeight: '600',
    color: '#374151',
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 12,
  },

  calActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  calActionsRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  calClear: {
    fontSize: 12,
    fontWeight: '700',
    color: '#DC2626',
  },

  calCancelButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
  },

  calCancelText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6B7280',
  },

  calApplyButton: {
    backgroundColor: '#2563EB',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },

  calApplyDisabled: {
    backgroundColor: '#93C5FD',
  },

  calApplyText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
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
