// src/app/studentSchedule.jsx

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { studentProfile, studentScheduleData } from '../data/mockData';

const DAY_LABELS = studentScheduleData.dayLabels;
const MONTH_NAMES = studentScheduleData.monthNames;
const WEEKDAY_NAMES = studentScheduleData.weekdayNames;

const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

const addDays = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);

const startOfWeek = (d) => addDays(d, -d.getDay()); // week starts on Sunday

const sameDay = (a, b) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const dateKey = (d) => `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;

const formatFullDate = (d) =>
  `${WEEKDAY_NAMES[d.getDay()]}, ${MONTH_NAMES[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;

const SHIFT_RULES = studentScheduleData.shiftRules;
const GUIDELINES = studentScheduleData.guidelines;

export default function StudentSchedule() {
  const router = useRouter();

  const today = useMemo(() => startOfDay(new Date()), []);
  const [selectedDate, setSelectedDate] = useState(today);
  const [confirmedMap, setConfirmedMap] = useState({}); // { 'YYYY-M-D': true }
  const [timetable, setTimetable] = useState(null); // { name, size, uri }

  // Open the device file picker so the student can upload their timetable
  const pickTimetable = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          'application/pdf',
          'image/*',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ],
        copyToCacheDirectory: true,
      });

      if (result.canceled) return;

      const file = result.assets && result.assets[0];
      if (file) {
        setTimetable({ name: file.name, size: file.size, uri: file.uri });
      }
    } catch (_error) {
      Alert.alert('Upload failed', 'Could not select the file. Please try again.');
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes && bytes !== 0) return '';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  // Move the calendar forward/backward by whole weeks (works across any month/year)
  const shiftWeek = (direction) => {
    setSelectedDate((current) => addDays(current, direction * 7));
  };

  // Build the 7 days shown in the strip
  const weekStart = startOfWeek(selectedDate);
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(weekStart, i);
    const rule = SHIFT_RULES[date.getDay()];
    return { date, rule };
  });

  // Selected day details
  const selectedRule = SHIFT_RULES[selectedDate.getDay()];
  const isPast = selectedDate < today;
  const selectedKey = dateKey(selectedDate);
  const confirmed = !!confirmedMap[selectedKey];

  const monthTitle = `${MONTH_NAMES[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`;

  const shift = selectedRule
    ? {
        status: isPast ? 'Completed' : 'Upcoming',
        time: selectedRule.time,
        location: selectedRule.location,
        completed: isPast,
      }
    : null;

  return (
    <SafeAreaView style={styles.safeArea}>

      {/* Top Header Bar */}
      <View style={styles.headerBar}>
        <Text style={styles.headerTitle}>StudentSync Calender</Text>

        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerIcon} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={18} color="#2563EB" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.headerIcon}
            onPress={() => router.push('/studentNotifications')}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            activeOpacity={0.6}
          >
            <Ionicons name="notifications-outline" size={22} color="#2563EB" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.headerIcon} onPress={() => router.replace('/')}>
            <Ionicons name="log-out-outline" size={18} color="#2563EB" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.userRow}>
        <Text style={styles.userName}>{studentProfile.name}</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >

        {/* Hero Banner */}
        <View style={styles.heroBanner}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1000&auto=format&fit=crop',
            }}
            style={styles.heroImage}
          />
          <View style={styles.heroOverlay} />

          <View style={styles.heroContent}>
            <View style={styles.heroBadge}>
              <Text style={styles.heroBadgeText}>LIBRARY STAFF</Text>
            </View>

            <Text style={styles.heroTitle}>Library Assistant</Text>

            <Text style={styles.heroSubtitle}>
              Track your weekly hours and manage your library service shifts efficiently.
            </Text>
          </View>
        </View>

        <View style={styles.body}>

          {/* Month Header */}
          <View style={styles.monthRow}>
            <View>
              <Text style={styles.monthTitle}>{monthTitle}</Text>
              <Text style={styles.monthSub}>Showing shifts for this period</Text>
            </View>

            <View style={styles.monthControls}>
              <TouchableOpacity style={styles.circleButton} onPress={() => shiftWeek(-1)}>
                <Ionicons name="chevron-back" size={14} color="#1E4E8C" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.todayButton}
                onPress={() => setSelectedDate(today)}
              >
                <Text style={styles.todayText}>Today</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.circleButton} onPress={() => shiftWeek(1)}>
                <Ionicons name="chevron-forward" size={14} color="#1E4E8C" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Week Strip (tap a day, use the arrows, or swipe left/right) */}
          <View style={styles.weekRow}>
            {weekDays.map(({ date, rule }, index) => {
              const isSelected = sameDay(date, selectedDate);
              const isToday = sameDay(date, today);
              const inOtherMonth = date.getMonth() !== selectedDate.getMonth();

              return (
                <View key={dateKey(date)} style={styles.weekCol}>
                  <Text style={styles.weekLabel}>{DAY_LABELS[index]}</Text>

                  <TouchableOpacity
                    style={[
                      styles.dateCell,
                      isToday && !isSelected && styles.dateCellToday,
                      isSelected && styles.dateCellSelected,
                    ]}
                    onPress={() => setSelectedDate(date)}
                  >
                    <Text
                      style={[
                        styles.dateText,
                        inOtherMonth && styles.dateTextOtherMonth,
                        isSelected && styles.dateTextSelected,
                      ]}
                    >
                      {date.getDate()}
                    </Text>

                    {rule ? (
                      <Text style={[styles.dateHours, isSelected && styles.dateTextSelected]}>
                        {rule.hours}
                      </Text>
                    ) : null}
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>

          {/* Shift Windows */}
          <View style={styles.windowRow}>
            <View style={styles.windowCard}>
              <View style={styles.windowHeader}>
                <View style={[styles.windowDot, { backgroundColor: '#7C3AED' }]} />
                <Text style={styles.windowTitle}>Mon-Thu Window</Text>
              </View>
              <Text style={styles.windowTime}>08:00 AM - 05:00 PM</Text>
            </View>

            <View style={styles.windowCard}>
              <View style={styles.windowHeader}>
                <View style={[styles.windowDot, { backgroundColor: '#F59E0B' }]} />
                <Text style={styles.windowTitle}>Friday Window</Text>
              </View>
              <Text style={styles.windowTime}>08:00 AM - 02:00 PM</Text>
            </View>
          </View>

          {/* Daily Activity */}
          <View style={styles.activityHeader}>
            <Ionicons name="calendar-outline" size={18} color="#2563EB" />
            <Text style={styles.activityTitle}>Daily Activity</Text>
          </View>

          <View style={styles.activityCard}>
            {shift ? (
              <>
                <View style={styles.cardTopRow}>
                  <View
                    style={[
                      styles.statusPill,
                      shift.completed ? styles.statusPillDone : styles.statusPillUpcoming,
                    ]}
                  >
                    <Ionicons
                      name={shift.completed ? 'checkmark-circle' : 'time'}
                      size={10}
                      color={shift.completed ? '#16A34A' : '#2563EB'}
                    />
                    <Text
                      style={[
                        styles.statusPillText,
                        { color: shift.completed ? '#16A34A' : '#2563EB' },
                      ]}
                    >
                      {confirmed ? 'Confirmed' : shift.status}
                    </Text>
                  </View>

                  <View style={styles.menuBar} />
                </View>

                <Text style={styles.shiftTitle}>Library Student Assistant</Text>
                <Text style={styles.shiftDate}>{formatFullDate(selectedDate)}</Text>

                <View style={styles.underHoursPill}>
                  <Ionicons name="flash-outline" size={9} color="#D97706" />
                  <Text style={styles.underHoursText}>Under 19-Shift</Text>
                </View>

                {/* Time Window */}
                <View style={styles.infoBox}>
                  <View style={styles.infoIcon}>
                    <Ionicons name="time-outline" size={14} color="#2563EB" />
                  </View>
                  <View>
                    <Text style={styles.infoLabel}>TIME WINDOW</Text>
                    <Text style={styles.infoValue}>{shift.time}</Text>
                  </View>
                </View>

                {/* Location */}
                <View style={styles.infoBox}>
                  <View style={styles.infoIcon}>
                    <Ionicons name="location-outline" size={14} color="#2563EB" />
                  </View>
                  <View>
                    <Text style={styles.infoLabel}>LOCATION</Text>
                    <Text style={styles.infoValue}>{shift.location}</Text>
                  </View>
                </View>

                {/* Guidelines */}
                <Text style={styles.guidelinesTitle}>Assistant Guidelines</Text>

                {GUIDELINES.map((g) => (
                  <View key={g.id} style={styles.guidelineRow}>
                    <Ionicons name={g.icon} size={14} color={g.color} />
                    <Text style={styles.guidelineText}>{g.text}</Text>
                  </View>
                ))}

                {/* Timetable Upload */}
                <Text style={styles.guidelinesTitle}>Student Assistant Timetable</Text>

                {timetable ? (
                  <View style={styles.fileRow}>
                    <View style={styles.fileIcon}>
                      <Ionicons name="document-text-outline" size={18} color="#4F46E5" />
                    </View>

                    <View style={styles.fileInfo}>
                      <Text style={styles.fileName} numberOfLines={1}>
                        {timetable.name}
                      </Text>
                      <Text style={styles.fileMeta}>
                        {formatFileSize(timetable.size)}
                        {timetable.size != null ? '  •  ' : ''}Uploaded
                      </Text>
                    </View>

                    <TouchableOpacity onPress={pickTimetable} style={styles.fileAction}>
                      <Ionicons name="swap-horizontal-outline" size={16} color="#4B5563" />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => setTimetable(null)}
                      style={styles.fileAction}
                    >
                      <Ionicons name="close-circle-outline" size={18} color="#EF4444" />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity style={styles.uploadBox} onPress={pickTimetable}>
                    <Ionicons name="cloud-upload-outline" size={26} color="#4F46E5" />
                    <Text style={styles.uploadTitle}>Tap to upload your timetable</Text>
                    <Text style={styles.uploadHint}>PDF, image or Word document</Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  style={[
                    styles.confirmButton,
                    !timetable && !confirmed && styles.confirmButtonDisabled,
                    confirmed && styles.confirmButtonDone,
                  ]}
                  onPress={() =>
                    setConfirmedMap((prev) => ({ ...prev, [selectedKey]: true }))
                  }
                  disabled={confirmed || !timetable}
                >
                  <Text style={styles.confirmText}>
                    {confirmed ? 'Attendance Confirmed' : 'Confirm Attendance'}
                  </Text>
                </TouchableOpacity>

                {!timetable && !confirmed ? (
                  <Text style={styles.uploadRequired}>
                    Upload your timetable to confirm attendance.
                  </Text>
                ) : null}
              </>
            ) : (
              <View style={styles.emptyState}>
                <Ionicons name="calendar-clear-outline" size={32} color="#9CA3AF" />
                <Text style={styles.emptyTitle}>No shift scheduled</Text>
                <Text style={styles.shiftDate}>{formatFullDate(selectedDate)}</Text>
              </View>
            )}
          </View>

          {/* Reminder */}
          <View style={styles.reminderCard}>
            <Ionicons name="information-circle-outline" size={18} color="#2563EB" />
            <Text style={styles.reminderText}>
              <Text style={styles.reminderBold}>Reminder: </Text>
              Student Assistants are limited to 19 working hours per week. Shifts are
              automatically validated for the 4-hour daily maximum.
            </Text>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <View style={styles.footerBrand}>
              <View style={styles.footerLogo}>
                <Text style={styles.footerLogoText}>S</Text>
              </View>
              <Text style={styles.footerBrandText}>StudentSync Calendar</Text>
            </View>

            <View style={styles.footerLinks}>
              <Text style={styles.footerLink}>Documentation</Text>
              <Text style={styles.footerLink}>Privacy Policy</Text>
              <Text style={styles.footerLink}>Support Desk</Text>
            </View>

            <Text style={styles.footerCopy}>
              © 2021 Academic Management Systems. All rights reserved.
            </Text>
          </View>

        </View>
      </ScrollView>

      {/* Bottom Tab Navigation (same on every screen: Home, Requests, History, Schedule) */}
      <View style={styles.bottomNav}>

        {/* HOME */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.replace('/studentDash')}
        >
          <Ionicons
            name="grid-outline"
            size={24}
            color="#6B7280"
          />

          <Text style={styles.navText}>
            Home
          </Text>
        </TouchableOpacity>


        {/* REQUESTS */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push('/studentRequest')}
        >
          <View style={styles.navIconContainer}>
            <Ionicons
              name="clipboard-outline"
              size={24}
              color="#6B7280"
            />

            <View style={styles.navRedDot} />
          </View>

          <Text style={styles.navText}>
            Requests
          </Text>
        </TouchableOpacity>


        {/* HISTORY */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push('/studentHistory')}
        >
          <MaterialCommunityIcons
            name="history"
            size={24}
            color="#6B7280"
          />

          <Text style={styles.navText}>
            History
          </Text>
        </TouchableOpacity>


        {/* SCHEDULE (active on this screen) */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.replace('/studentSchedule')}
        >
          <Ionicons
            name="calendar"
            size={24}
            color="#2563EB"
          />

          <Text
            style={[
              styles.navText,
              styles.navTextActive,
            ]}
          >
            Schedule
          </Text>
        </TouchableOpacity>

      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#9DBBD9',
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
    paddingBottom: 20,
  },

  // --- Hero ---
  heroBanner: {
    height: 150,
    justifyContent: 'flex-end',
    overflow: 'hidden',
    backgroundColor: '#1E293B',
  },

  heroImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },

  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 23, 42, 0.55)',
  },

  heroContent: {
    padding: 16,
  },

  heroBadge: {
    backgroundColor: '#4F46E5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },

  heroBadgeText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 0.5,
  },

  heroTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
  },

  heroSubtitle: {
    color: '#E5E7EB',
    fontSize: 10,
    marginTop: 4,
  },

  body: {
    paddingHorizontal: 12,
    paddingTop: 16,
  },

  // --- Month ---
  monthRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  monthTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#111827',
  },

  monthSub: {
    fontSize: 9,
    color: '#4B5563',
    marginTop: 2,
  },

  monthControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  circleButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  todayButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
    marginHorizontal: 6,
  },

  todayText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#1E4E8C',
  },

  // --- Week strip ---
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
  },

  weekCol: {
    flex: 1,
    alignItems: 'center',
  },

  weekLabel: {
    fontSize: 8,
    fontWeight: '700',
    color: '#4B5563',
    marginBottom: 4,
  },

  dateCell: {
    width: 38,
    height: 44,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  dateCellToday: {
    borderWidth: 1.5,
    borderColor: '#2563EB',
  },

  dateCellSelected: {
    backgroundColor: '#6B8FD6',
    borderWidth: 1.5,
    borderColor: '#2563EB',
  },

  dateText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#111827',
  },

  dateTextOtherMonth: {
    color: '#6B7280',
  },

  dateTextSelected: {
    color: '#FFFFFF',
  },

  dateHours: {
    fontSize: 7,
    color: '#4B5563',
    marginTop: 2,
  },

  // --- Windows ---
  windowRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },

  windowCard: {
    flex: 0.49,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 10,
  },

  windowHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },

  windowDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },

  windowTitle: {
    fontSize: 9,
    fontWeight: '700',
    color: '#111827',
  },

  windowTime: {
    fontSize: 8,
    color: '#6B7280',
  },

  // --- Daily Activity ---
  activityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 10,
  },

  activityTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#111827',
    marginLeft: 8,
  },

  activityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },

  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },

  statusPillDone: {
    backgroundColor: '#DCFCE7',
  },

  statusPillUpcoming: {
    backgroundColor: '#DBEAFE',
  },

  statusPillText: {
    fontSize: 8,
    fontWeight: '700',
    marginLeft: 3,
  },

  menuBar: {
    width: 12,
    height: 2,
    borderRadius: 1,
    backgroundColor: '#9CA3AF',
  },

  shiftTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#111827',
  },

  shiftDate: {
    fontSize: 9,
    color: '#6B7280',
    marginTop: 2,
  },

  underHoursPill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginTop: 6,
    marginBottom: 10,
  },

  underHoursText: {
    fontSize: 7,
    fontWeight: '700',
    color: '#D97706',
    marginLeft: 3,
  },

  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },

  infoIcon: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },

  infoLabel: {
    fontSize: 7,
    fontWeight: '700',
    color: '#6B7280',
    letterSpacing: 0.5,
  },

  infoValue: {
    fontSize: 11,
    fontWeight: '700',
    color: '#111827',
    marginTop: 2,
  },

  guidelinesTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#111827',
    marginTop: 8,
    marginBottom: 8,
  },

  guidelineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 7,
  },

  guidelineText: {
    fontSize: 9,
    color: '#374151',
    marginLeft: 8,
  },

  confirmButton: {
    backgroundColor: '#4F46E5',
    borderRadius: 8,
    paddingVertical: 11,
    alignItems: 'center',
    marginTop: 10,
  },

  confirmButtonDone: {
    backgroundColor: '#16A34A',
  },

  confirmButtonDisabled: {
    backgroundColor: '#A5B4FC',
  },

  // --- Timetable upload ---
  uploadBox: {
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#A5B4FC',
    backgroundColor: '#EEF2FF',
    borderRadius: 10,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },

  uploadTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#3730A3',
    marginTop: 6,
  },

  uploadHint: {
    fontSize: 8,
    color: '#6B7280',
    marginTop: 2,
  },

  fileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    padding: 10,
  },

  fileIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },

  fileInfo: {
    flex: 1,
  },

  fileName: {
    fontSize: 11,
    fontWeight: '700',
    color: '#111827',
  },

  fileMeta: {
    fontSize: 8,
    color: '#16A34A',
    marginTop: 2,
  },

  fileAction: {
    padding: 6,
    marginLeft: 2,
  },

  uploadRequired: {
    fontSize: 8,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 6,
  },

  confirmText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },

  emptyState: {
    alignItems: 'center',
    paddingVertical: 24,
  },

  emptyTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    marginTop: 8,
  },

  // --- Reminder ---
  reminderCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 12,
    marginTop: 14,
  },

  reminderText: {
    flex: 1,
    fontSize: 9,
    color: '#374151',
    lineHeight: 14,
    marginLeft: 8,
  },

  reminderBold: {
    fontWeight: '800',
    color: '#111827',
  },

  // --- Footer ---
  footer: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginTop: 18,
    marginHorizontal: -12,
    paddingVertical: 18,
  },

  footerBrand: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  footerLogo: {
    width: 20,
    height: 20,
    borderRadius: 4,
    backgroundColor: '#111827',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },

  footerLogoText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },

  footerBrandText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#111827',
  },

  footerLinks: {
    flexDirection: 'row',
    marginTop: 10,
  },

  footerLink: {
    fontSize: 8,
    color: '#4B5563',
    marginHorizontal: 8,
  },

  footerCopy: {
    fontSize: 7,
    color: '#9CA3AF',
    marginTop: 10,
  },

  // --- Bottom Navigation (identical to home.jsx) ---
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
