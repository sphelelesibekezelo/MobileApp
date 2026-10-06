// src/app/supReport.jsx
import { Ionicons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import * as Print from 'expo-print';
import { useRouter } from 'expo-router';
import * as Sharing from 'expo-sharing';
import { useState } from 'react';
import {
  Alert,
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

import logoImg from "@/assets/images/logo.png";

// ---------------- MONTHLY REPORT DATA ----------------
const monthlyReportData = {
  'Shoba Thabiso': {
    studentId: 'ST-2024-001',
    email: 'shoba.thabiso@university.edu',
    months: [
      { month: 'April 2026', hours: 22, requests: 1, approved: 1, rejected: 0, dayOffs: 0 },
      { month: 'May 2026', hours: 24, requests: 0, approved: 0, rejected: 0, dayOffs: 0 },
      { month: 'June 2026', hours: 18, requests: 2, approved: 1, rejected: 1, dayOffs: 0 },
      { month: 'July 2026', hours: 26, requests: 1, approved: 0, rejected: 1, dayOffs: 0 },
      { month: 'August 2026', hours: 20, requests: 1, approved: 1, rejected: 0, dayOffs: 1 },
      { month: 'September 2026', hours: 24, requests: 0, approved: 0, rejected: 0, dayOffs: 0 },
    ],
  },
  'Mabaso Kganya': {
    studentId: 'MK-2024-015',
    email: 'mabaso.kganya@university.edu',
    months: [
      { month: 'April 2026', hours: 15, requests: 2, approved: 1, rejected: 1, dayOffs: 1 },
      { month: 'May 2026', hours: 28, requests: 0, approved: 0, rejected: 0, dayOffs: 0 },
      { month: 'June 2026', hours: 20, requests: 1, approved: 0, rejected: 1, dayOffs: 0 },
      { month: 'July 2026', hours: 22, requests: 2, approved: 2, rejected: 0, dayOffs: 1 },
      { month: 'August 2026', hours: 23, requests: 3, approved: 2, rejected: 1, dayOffs: 0 },
      { month: 'September 2026', hours: 18, requests: 0, approved: 0, rejected: 0, dayOffs: 0 },
    ],
  },
  'Mawelela Sibusiso': {
    studentId: 'MS-2024-032',
    email: 'mawelela.sibusiso@university.edu',
    months: [
      { month: 'April 2026', hours: 20, requests: 1, approved: 1, rejected: 0, dayOffs: 0 },
      { month: 'May 2026', hours: 22, requests: 0, approved: 0, rejected: 0, dayOffs: 0 },
      { month: 'June 2026', hours: 21, requests: 1, approved: 1, rejected: 0, dayOffs: 0 },
      { month: 'July 2026', hours: 19, requests: 2, approved: 1, rejected: 1, dayOffs: 1 },
      { month: 'August 2026', hours: 19.2, requests: 3, approved: 2, rejected: 1, dayOffs: 0 },
      { month: 'September 2026', hours: 24, requests: 0, approved: 0, rejected: 0, dayOffs: 0 },
    ],
  },
};

// Get all available months from the data for the selector
const availableMonths = monthlyReportData['Shoba Thabiso'].months.map(m => m.month);

// Available Leave Types for Filtering
const LEAVE_TYPES = ['All', 'Sick Leave', 'Personal Issues', 'Exam Leave', 'Day Off', 'Shift Swap'];

// ---------------- Reusable Components ----------------
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

const StaffCard = ({ item }) => (
  <View style={styles.staffCard}>
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
      <View style={styles.staffMetric} />
    </View>

    {/* Display Leave Types */}
    <View style={styles.leaveTypesContainer}>
      {item.leaveTypes.map((type, index) => (
        <View key={index} style={styles.leaveTypeBadge}>
          <Text style={styles.leaveTypeText}>{type}</Text>
        </View>
      ))}
    </View>

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

// ---------------- MAIN COMPONENT ----------------
export default function SupervisorReports() {
  const router = useRouter();

  const [isDownloadModalVisible, setIsDownloadModalVisible] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(availableMonths[availableMonths.length - 1]); // Default to latest month
  
  // Filtering State
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [selectedLeaveType, setSelectedLeaveType] = useState('All');

  // Enhanced Staff Data with Leave Types
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
      leaveTypes: ['Sick Leave', 'Day Off'],
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
      leaveTypes: ['Exam Leave', 'Shift Swap', 'Personal Issues'],
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
      leaveTypes: ['Shift Swap', 'Day Off'],
    },
  ];

  // Filter Logic
  const filteredStaffData = selectedLeaveType === 'All'
    ? staffData
    : staffData.filter(staff => staff.leaveTypes.includes(selectedLeaveType));

  // ---------------- Generate & Share PDF Report ----------------
  const handleStaffSelect = async (staffName) => {
    setIsDownloadModalVisible(false);

    const report = monthlyReportData[staffName];
    if (!report) {
      Alert.alert('Error', 'No report data found for this assistant.');
      return;
    }

    const monthData = report.months.find(m => m.month === selectedMonth);

    if (!monthData) {
      Alert.alert('Error', `No data available for ${selectedMonth}.`);
      return;
    }

    const htmlContent = `
      <html>
        <head>
          <style>
            body { font-family: Helvetica, Arial, sans-serif; padding: 30px; color: #1A202C; }
            h1 { color: #1E3A8A; margin-bottom: 4px; }
            h2 { color: #1E3A8A; margin-top: 30px; font-size: 16px; border-bottom: 2px solid #E2E8F0; padding-bottom: 6px; }
            .subtitle { color: #718096; font-size: 14px; margin-bottom: 20px; font-weight: bold; }
            .info-box { background: #F7FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 16px; margin-bottom: 20px; }
            .info-box p { margin: 4px 0; font-size: 13px; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th { background: #1E3A8A; color: #FFFFFF; padding: 12px; text-align: left; font-size: 12px; }
            td { padding: 12px; border-bottom: 1px solid #E2E8F0; font-size: 12px; }
            tr:nth-child(even) { background: #F7FAFC; }
            .summary { display: flex; justify-content: space-between; margin-top: 15px; }
            .summary-item { flex: 1; background: #EFF6FF; border: 1px solid #BFDBFE; border-radius: 8px; padding: 20px; margin-right: 10px; text-align: center; }
            .summary-item:last-child { margin-right: 0; }
            .summary-label { font-size: 10px; color: #1E3A8A; letter-spacing: 1px; font-weight: bold; }
            .summary-value { font-size: 26px; font-weight: bold; color: #1A202C; margin-top: 6px; }
            .footer { margin-top: 40px; font-size: 10px; color: #A0AEC0; text-align: center; }
          </style>
        </head>
        <body>
          <h1>Monthly Performance Report</h1>
          <p class="subtitle">Period: ${selectedMonth}</p>

          <div class="info-box">
            <p><strong>Student Name:</strong> ${staffName}</p>
            <p><strong>Student ID:</strong> ${report.studentId}</p>
            <p><strong>Email:</strong> ${report.email}</p>
            <p><strong>Report Generated:</strong> ${new Date().toLocaleString()}</p>
          </div>

          <h2>Summary Statistics for ${selectedMonth}</h2>
          <div class="summary">
            <div class="summary-item">
              <div class="summary-label">HOURS WORKED</div>
              <div class="summary-value">${monthData.hours}h</div>
            </div>
            <div class="summary-item">
              <div class="summary-label">TOTAL REQUESTS</div>
              <div class="summary-value">${monthData.requests}</div>
            </div>
          </div>
          <div class="summary" style="margin-top: 10px;">
            <div class="summary-item">
              <div class="summary-label">APPROVED</div>
              <div class="summary-value" style="color: #16A34A;">${monthData.approved}</div>
            </div>
            <div class="summary-item">
              <div class="summary-label">REJECTED</div>
              <div class="summary-value" style="color: #DC2626;">${monthData.rejected}</div>
            </div>
            <div class="summary-item">
              <div class="summary-label">DAY OFFS</div>
              <div class="summary-value" style="color: #2563EB;">${monthData.dayOffs}</div>
            </div>
          </div>

          <h2>Detailed Breakdown</h2>
          <table>
            <tr>
              <th>Month</th>
              <th>Hours</th>
              <th>Requests</th>
              <th>Approved</th>
              <th>Rejected</th>
              <th>Day Offs</th>
            </tr>
            <tr>
              <td>${monthData.month}</td>
              <td>${monthData.hours}h</td>
              <td>${monthData.requests}</td>
              <td style="color: #16A34A; font-weight: bold;">${monthData.approved}</td>
              <td style="color: #DC2626; font-weight: bold;">${monthData.rejected}</td>
              <td style="color: #2563EB; font-weight: bold;">${monthData.dayOffs}</td>
            </tr>
          </table>

          <div class="footer">
            This report was automatically generated by StudentAssist. For any discrepancies, contact your supervisor.
          </div>
        </body>
      </html>
    `;

    try {
      if (Platform.OS === 'web') {
        const iframe = document.createElement('iframe');
        iframe.style.position = 'absolute';
        iframe.style.width = '0';
        iframe.style.height = '0';
        iframe.style.border = 'none';
        document.body.appendChild(iframe);

        const doc = iframe.contentWindow.document;
        doc.open();
        doc.write(htmlContent);
        doc.close();

        iframe.contentWindow.onload = () => {
          iframe.contentWindow.focus();
          iframe.contentWindow.print();
          
          setTimeout(() => {
            document.body.removeChild(iframe);
          }, 1000);
        };
      } else {
        const { uri } = await Print.printToFileAsync({ html: htmlContent });

        const folderName = 'myFile';
        const fileName = `Report_${staffName.replace(/\s+/g, '_')}_${selectedMonth.replace(/\s+/g, '_')}.pdf`;
        // eslint-disable-next-line import/namespace
        const folderPath = `${FileSystem.documentDirectory}${folderName}/`;
        const newUri = `${folderPath}${fileName}`;

        const folderInfo = await FileSystem.getInfoAsync(folderPath);
        if (!folderInfo.exists) {
          await FileSystem.makeDirectoryAsync(folderPath, { intermediates: true });
        }

        await FileSystem.moveAsync({
          from: uri,
          to: newUri,
        });

        Alert.alert(
          'Report Generated Successfully!',
          `The ${selectedMonth} report for ${staffName} has been saved to the app's internal "${folderName}" folder.\n\nTo save it to your device's Downloads, please tap "Save to Files" or "Save to Downloads" on the next screen.`,
          [{ text: 'OK' }]
        );

        if (await Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(newUri, {
            mimeType: 'application/pdf',
            dialogTitle: `${staffName} - ${selectedMonth} Report`,
            UTI: 'com.adobe.pdf',
          });
        } else {
          Alert.alert('Success', `Report generated!\n\nFile saved at: ${newUri}`);
        }
      }
    } catch (error) {
      console.error('PDF generation error:', error);
      Alert.alert('Error', 'Failed to generate and save the PDF report. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      
      {/* Top Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image source={logoImg} style={styles.iconContainer} resizeMode="contain" />
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
        
        {/* Title Section */}
        <View style={styles.titleSection}>
          <View>
            <Text style={styles.pageTitle}>Performance Reports</Text>
            <Text style={styles.pageSubtitle}>
              Review and analyze student activity and work efficiency metrics for the current period.
            </Text>
          </View>
        </View>

        {/* Metrics Cards Row */}
        <View style={styles.metricsRow}>
          <MetricCard icon="time-outline" change="+12%" label="TOTAL HOURS" value="1,248h" isPositive={true} />
          <MetricCard icon="document-text-outline" change="+8%" label="REQUESTS" value="4,832" isPositive={true} />
          <MetricCard icon="pie-chart-outline" change="" label="ACTIVE REPORTS" value="8" isPositive={true} />
        </View>

        {/* Generate Report Button -> Opens Staff Selection Modal */}
        <TouchableOpacity 
          style={styles.generateButton} 
          onPress={() => setIsDownloadModalVisible(true)}
        >
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
          <TouchableOpacity 
            style={[styles.filterButton, selectedLeaveType !== 'All' && styles.filterButtonActive]} 
            onPress={() => setIsFilterModalVisible(true)}
          >
            <Ionicons name="filter-outline" size={16} color={selectedLeaveType !== 'All' ? '#FFFFFF' : '#4A5568'} style={{ marginRight: 6 }} />
            <Text style={[styles.filterText, selectedLeaveType !== 'All' && styles.filterTextActive]}>
              {selectedLeaveType === 'All' ? 'Filters' : selectedLeaveType}
            </Text>
            {selectedLeaveType !== 'All' && (
              <View style={styles.filterBadgeActive}>
                <Text style={styles.filterBadgeTextActive}>1</Text>
              </View>
            )}
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

        {/* Staff List (Filtered) */}
        {filteredStaffData.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="people-outline" size={48} color="#A0AEC0" />
            <Text style={styles.emptyStateText}>No staff found for this filter</Text>
          </View>
        ) : (
          filteredStaffData.map((item) => (
            <StaffCard key={item.id} item={item} />
          ))
        )}

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
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/supervisorDash')}>
          <Ionicons name="grid-outline" size={24} color="#6B7280" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/supRequest')}>
          <View style={styles.navIconContainer}>
            <Ionicons name="document-text-outline" size={24} color="#6B7280" />
            <View style={styles.navBadge}>
              <Text style={styles.navBadgeText}>1</Text>
            </View>
          </View>
          <Text style={styles.navText}>Requests</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/supCal')}>
          <Ionicons name="calendar-outline" size={24} color="#6B7280" />
          <Text style={styles.navText}>Calendar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="bar-chart" size={24} color="#2563EB" />
          <Text style={[styles.navText, styles.navTextActive]}>Reports</Text>
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

      {/* --- STAFF PICKER MODAL (Shows the list of students) --- */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isDownloadModalVisible}
        onRequestClose={() => setIsDownloadModalVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setIsDownloadModalVisible(false)}
        >
          <TouchableOpacity 
            style={styles.pickerModalContent} 
            activeOpacity={1} 
            onPress={(e) => e.stopPropagation()}
          >
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>Generate Monthly Report</Text>
                <Text style={styles.modalSubtitle}>Select a month and a student assistant</Text>
              </View>
              <TouchableOpacity onPress={() => setIsDownloadModalVisible(false)}>
                <Ionicons name="close-circle" size={28} color="#A0AEC0" />
              </TouchableOpacity>
            </View>

            {/* Month Selector */}
            <Text style={styles.modalSectionTitle}>1. Select Month</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.monthScroll} contentContainerStyle={styles.monthScrollContent}>
              {availableMonths.map((month) => (
                <TouchableOpacity
                  key={month}
                  style={[styles.monthPill, selectedMonth === month && styles.monthPillActive]}
                  onPress={() => setSelectedMonth(month)}
                >
                  <Text style={[styles.monthPillText, selectedMonth === month && styles.monthPillTextActive]}>
                    {month}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text style={styles.modalSectionTitle}>2. Select Student Assistant</Text>

            <ScrollView showsVerticalScrollIndicator={false}>
              {staffData.map((staff) => (
                <TouchableOpacity 
                  key={staff.id} 
                  style={styles.staffPickerItem}
                  onPress={() => handleStaffSelect(staff.name)}
                  activeOpacity={0.7}
                >
                  <View style={styles.pickerAvatar}>
                    <Text style={styles.pickerAvatarText}>{staff.initials}</Text>
                  </View>
                  <View style={styles.pickerInfo}>
                    <Text style={styles.pickerName}>{staff.name}</Text>
                    <Text style={styles.pickerRole}>{staff.role}</Text>
                  </View>
                  <Ionicons name="download-outline" size={20} color="#1E3A8A" />
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
  safeArea: { flex: 1, backgroundColor: '#8FB3D9' },

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
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  iconContainer: { width: 40, height: 40, marginRight: 10 },
  headerTextContainer: { justifyContent: 'center' },
  headerTitle: { fontSize: 16, fontWeight: '700', color: '#1A202C' },
  headerSubtitle: { fontSize: 9, fontWeight: '600', color: '#718096', letterSpacing: 1, marginTop: 2 },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  iconButton: { marginLeft: 16 },

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

  generateButton: { backgroundColor: '#2563EB', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 16, borderRadius: 8, marginBottom: 20 },
  generateButtonText: { color: '#FFFFFF', fontSize: 14, fontWeight: '700', letterSpacing: 0.5 },

  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 10, paddingHorizontal: 16, height: 50, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, fontSize: 15, color: '#1A202C' },

  filtersRow: { flexDirection: 'row', marginBottom: 24 },
  filterButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 8, paddingHorizontal: 16, paddingVertical: 10, marginRight: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 },
  filterButtonActive: { backgroundColor: '#2563EB' },
  filterText: { fontSize: 13, fontWeight: '600', color: '#4A5568' },
  filterTextActive: { color: '#FFFFFF' },
  filterBadge: { backgroundColor: '#1E3A8A', borderRadius: 8, width: 16, height: 16, justifyContent: 'center', alignItems: 'center', marginLeft: 6 },
  filterBadgeActive: { backgroundColor: '#FFFFFF', borderRadius: 8, width: 16, height: 16, justifyContent: 'center', alignItems: 'center', marginLeft: 6 },
  filterBadgeText: { color: '#FFFFFF', fontSize: 9, fontWeight: 'bold' },
  filterBadgeTextActive: { color: '#2563EB', fontSize: 9, fontWeight: 'bold' },

  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { fontSize: 12, fontWeight: '800', color: '#1E3A8A', letterSpacing: 0.5 },

  staffCard: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  staffHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  staffHeaderLeft: { flexDirection: 'row', alignItems: 'center' },
  staffAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#8B5CF6', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  staffAvatarText: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' },
  staffName: { fontSize: 15, fontWeight: '700', color: '#1A202C' },
  staffRole: { fontSize: 10, fontWeight: '600', color: '#718096', letterSpacing: 0.5, marginTop: 2 },
  divider: { height: 1, backgroundColor: '#E2E8F0', marginBottom: 12 },

  staffMetricsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  staffMetric: { flex: 1 },
  staffMetricLabel: { fontSize: 10, fontWeight: '700', color: '#718096', letterSpacing: 0.5, marginBottom: 4 },
  staffMetricValue: { fontSize: 16, fontWeight: '700', color: '#1A202C' },

  // Leave Types inside Staff Card
  leaveTypesContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 12 },
  leaveTypeBadge: { backgroundColor: '#F1F5F9', borderRadius: 12, paddingHorizontal: 8, paddingVertical: 4, marginRight: 6, marginBottom: 6, borderWidth: 1, borderColor: '#E2E8F0' },
  leaveTypeText: { fontSize: 10, fontWeight: '600', color: '#64748B' },

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

  emptyState: { alignItems: 'center', justifyContent: 'center', paddingVertical: 40 },
  emptyStateText: { fontSize: 14, color: '#A0AEC0', marginTop: 10, fontWeight: '600' },

  viewAllButton: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 16, marginBottom: 10 },
  viewAllText: { fontSize: 13, fontWeight: '700', color: '#1E3A8A', letterSpacing: 0.5 },

  footerNote: { flexDirection: 'row', paddingHorizontal: 20, paddingBottom: 20, alignItems: 'flex-start' },
  footerNoteText: { flex: 1, fontSize: 11, color: '#718096', lineHeight: 16 },

  bottomNav: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: '#E5E7EB', paddingVertical: 10, paddingBottom: Platform.OS === 'ios' ? 25 : 10, justifyContent: 'space-around', alignItems: 'center' },
  navItem: { alignItems: 'center', justifyContent: 'center' },
  navIconContainer: { position: 'relative' },
  navBadge: { position: 'absolute', top: -4, right: -6, backgroundColor: '#EF4444', borderRadius: 8, width: 16, height: 16, justifyContent: 'center', alignItems: 'center' },
  navBadgeText: { color: '#FFFFFF', fontSize: 10, fontWeight: 'bold' },
  navText: { fontSize: 12, color: '#6B7280', marginTop: 4, fontWeight: '500' },
  navTextActive: { color: '#2563EB', fontWeight: '700' },

  // --- Shared Modal Styles ---
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1A202C',
  },
  modalSubtitle: {
    fontSize: 12,
    color: '#718096',
    marginTop: 4,
    maxWidth: '85%',
  },
  modalSectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#4A5568',
    marginBottom: 10,
  },

  // --- Filter Modal Styles ---
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

  // --- Staff Picker Modal Styles ---
  pickerModalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    maxWidth: 400,
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  monthScroll: {
    marginBottom: 20,
    maxHeight: 40,
  },
  monthScrollContent: {
    alignItems: 'center',
  },
  monthPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  monthPillActive: {
    backgroundColor: '#DBEAFE',
    borderColor: '#2563EB',
  },
  monthPillText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  monthPillTextActive: {
    color: '#1E3A8A',
    fontWeight: '800',
  },
  staffPickerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7FAFC',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  pickerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  pickerAvatarText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  pickerInfo: {
    flex: 1,
  },
  pickerName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A202C',
    marginBottom: 2,
  },
  pickerRole: {
    fontSize: 10,
    fontWeight: '600',
    color: '#718096',
    letterSpacing: 0.5,
  },
});
