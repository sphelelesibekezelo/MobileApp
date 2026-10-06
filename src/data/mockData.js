export const studentProfile = {
  name: 'Nicholas Mathebula',
  initials: 'NM',
  role: 'Student Assist',
  email: 'nicholas.mathebula@university.edu',
  studentNumber: '202100123',
};

export const studentDashboardData = {
  recentRequests: [
    {
      id: '1',
      code: 'REQ-001',
      type: 'Medical Leave',
      status: 'Approved',
      avatar: 'NM',
    },
    {
      id: '2',
      code: 'REQ-001',
      type: 'Medical Leave',
      status: 'Approved',
      avatar: 'NM',
    },
    {
      id: '3',
      code: 'REQ-003',
      type: 'Sick Leave',
      status: 'Pending',
      avatar: 'NM',
    },
  ],
};

export const studentHistoryData = {
  requests: [
    { id: 'REQ-003', type: 'Exam Leave', status: 'Approved' },
    { id: 'REQ-001', type: 'Sick Leave', status: 'Rejected' },
    { id: 'REQ-002', type: 'Shift Swap – Simphiwe Masanabo', status: 'Approved' },
  ],
  statusStyles: {
    Approved: { bg: '#DCFCE7', color: '#16A34A' },
    Rejected: { bg: '#FEE2E2', color: '#DC2626' },
    Pending: { bg: '#FEF3C7', color: '#D97706' },
  },
};

export const studentNotificationsData = [
  {
    id: 'n1',
    date: '29 September 2026',
    time: '9:30 AM',
    title: 'Strike Alert',
    message:
      'Library services will be affected by a strike. Please check your scheduled shifts.',
    icon: 'warning-outline',
    iconColor: '#C98A1B',
    iconBackground: '#FFF4DD',
  },
  {
    id: 'n2',
    date: '29 September 2026',
    time: '8:15 AM',
    title: 'Leave Request Approved',
    message: 'Your leave request for 7 October has been approved.',
    icon: 'checkmark-circle-outline',
    iconColor: '#2E9B57',
    iconBackground: '#E7F7EC',
  },
  {
    id: 'n3',
    date: '29 September 2026',
    time: '7:45 AM',
    title: 'Leave Request Rejected',
    message:
      'Your leave request for 10 October has been rejected. Please check the request details for more information.',
    icon: 'close-circle-outline',
    iconColor: '#D64545',
    iconBackground: '#FDEAEA',
  },
  {
    id: 'n4',
    date: '28 September 2026',
    time: '4:30 PM',
    title: 'Shift Swap Approved',
    message: 'Your shift swap request has been approved.',
    icon: 'swap-horizontal-outline',
    iconColor: '#3B6FE0',
    iconBackground: '#EAF3FD',
  },
  {
    id: 'n5',
    date: '28 September 2026',
    time: '2:10 PM',
    title: 'Shift Swap Rejected',
    message: 'Your shift swap request has been rejected. Please check the request details.',
    icon: 'close-circle-outline',
    iconColor: '#D64545',
    iconBackground: '#FDEAEA',
  },
];

export const supervisorDashboardData = {
  initialRequests: [
    {
      id: 1,
      name: 'Nkululeko Buthelezi',
      initials: 'NN',
      studentId: '222301042',
      email: 'nkululeko@tut4life.ac.za',
      reason: 'Academic Commitment',
      type: 'LEAVE',
      date: '25 AUG 2026',
      period: '25 Aug - 28 Aug 2026',
      duration: '4 days',
      color: '#E9D8FD',
      avatarColor: '#8B5CF6',
      description:
        'Requesting leave for the upcoming academic commitment. I have an exam scheduled and a workshop that overlaps with my regular shift hours. Please approve to allow adequate preparation time.',
      status: 'PENDING',
    },
    {
      id: 2,
      name: 'Sibekezelo Mnguni',
      initials: 'SS',
      studentId: '223301240',
      email: '223301240@tut4life.ac.za',
      reason: 'Exam Period',
      type: 'SHIFT SWAP',
      date: '20 AUG 2026',
      period: '20 Aug - 21 Aug 2026',
      duration: '1 days',
      color: '#E9D8FD',
      avatarColor: '#8B5CF6',
      description:
        'Requesting shift swap for the exam period. I have three consecutive exams and need the time to prepare. I have already found a colleague to cover my shifts.',
      status: 'PENDING',
    },
    {
      id: 3,
      name: 'Judith Zondo',
      initials: 'JD',
      studentId: '242201240',
      email: 'Judith@tut4life.ac.za',
      reason: 'Medical Leave',
      type: 'LEAVE',
      date: '18 AUG 2026',
      period: '18 Aug - 20 Aug 2026',
      duration: '2 days',
      color: '#E9D8FD',
      avatarColor: '#8B5CF6',
      description:
        'Requesting medical leave due to a recent procedure. Medical certificate will be uploaded to the portal. I will keep my supervisor updated on my recovery status.',
      status: 'PENDING',
    },
  ],
};

export const supervisorRequestData = {
  leaveTypes: ['All', 'Sick Leave', 'Personal Issues', 'Exam Leave', 'Day Off', 'Shift Swap'],
  submissions: [
    {
      id: 1,
      name: 'Nkululeko Buthelezi',
      initials: 'NN',
      avatarColor: '#A78BFA',
      type: 'Shift Swap',
      reason:
        'Requesting to swap Friday Evening (6PM) shift with Saturday Morning (8AM) due to academic exam preparation.',
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
  ],
};

export const supervisorNotificationsData = [
  {
    id: 1,
    name: 'Nkululeko Buthelezi',
    initials: 'NN',
    avatarColor: '#A78BFA',
    type: 'SHIFT SWAP',
    reason:
      'Requesting to swap Friday Evening (6PM) shift with Saturday Morning (8AM) due to academic exam preparation.',
    date: 'Oct 27 - Oct 28',
  },
  {
    id: 2,
    name: 'Judith Zondo',
    initials: 'JD',
    avatarColor: '#3B82F6',
    type: 'LEAVE',
    reason: 'Emergency family leave requested for three days. Documents will be uploaded to the portal by end of week.',
    date: 'Oct 30 - Nov 02',
  },
  {
    id: 3,
    name: 'Sibekezelo Mnguni',
    initials: 'SS',
    avatarColor: '#3B82F6',
    type: 'LEAVE',
    reason: 'Emergency family leave requested for three days. Documents will be uploaded to the portal by end of week.',
    date: 'Oct 30 - Nov 02',
  },
];

export const reportData = {
  defaultStudent: 'Shoba Thabiso',
  leaveTypes: ['All', 'Sick Leave', 'Personal Issues', 'Exam Leave', 'Day Off', 'Shift Swap'],
  monthlyReportData: {
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
  },
  staffData: [
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
  ],
};

export const calendarData = {
  assistants: [
    { id: 1, name: 'Nkululeko Buthelezi', initials: 'NN', role: 'Student Assistant', status: 'ACTIVE', color: '#A78BFA' },
    { id: 2, name: 'Mnguni Sibekezelo', initials: 'SS', role: 'Student Assistant', status: 'ACTIVE', color: '#A78BFA' },
    { id: 3, name: 'Judith Zondo', initials: 'JD', role: 'Student Assistant', status: 'PENDING', color: '#A78BFA' },
  ],
  initialShiftRecords: {
    '2026-08-05': [
      { id: 1, assistant: 'Nkululeko Buthelezi', initials: 'NN', position: 'Icenter', time: '08:00 - 12:00', hours: '4h', color: '#A78BFA' },
      { id: 2, assistant: 'Mnguni Sibekezelo', initials: 'SS', position: 'Help desk', time: '12:00 - 16:00', hours: '4h', color: '#A78BFA' },
      { id: 3, assistant: 'Judith Zondo', initials: 'JD', position: 'Icenter', time: '16:00 - 18:00', hours: '2h', color: '#A78BFA' },
    ],
    '2026-08-06': [
      { id: 1, assistant: 'Nkululeko Buthelezi', initials: 'NN', position: 'Icenter', time: '09:00 - 13:00', hours: '4h', color: '#A78BFA' },
    ],
    '2026-08-07': [
      { id: 1, assistant: 'Nkululeko Buthelezi', initials: 'NN', position: 'Icenter', time: '10:00 - 14:00', hours: '4h', color: '#A78BFA' },
      { id: 2, assistant: 'Mnguni Sibekezelo', initials: 'SS', position: 'Icenter', time: '14:00 - 18:00', hours: '4h', color: '#A78BFA' },
    ],
  },
  monthNames: [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ],
  today: new Date(2026, 7, 9),
};

export const studentRequestData = {
  absenceCategories: [
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
  ],
  myShifts: [
    { id: 's1', tag: 'REGULAR SHIFT', date: 'Oct 15, 2026', time: '08:00 AM - 04:00 PM' },
    { id: 's2', tag: 'EVENING COVERAGE', date: 'Oct 17, 2026', time: '10:00 AM - 06:00 PM' },
  ],
};

export const studentScheduleData = {
  shiftRules: {
    1: { time: '09:00 AM – 12:30 PM', location: 'Central Library – Level 2', hours: '3.5h' },
    2: { time: '09:00 AM – 12:30 PM', location: 'Central Library – Level 2', hours: '3.5h' },
    3: { time: '10:00 AM – 01:00 PM', location: 'Central Library – Level 1', hours: '3h' },
    4: { time: '09:00 AM – 12:30 PM', location: 'Central Library – Level 2', hours: '3.5h' },
    5: { time: '08:00 AM – 11:00 AM', location: 'Central Library – Level 2', hours: '3h' },
  },
  guidelines: [
    { id: 'g1', icon: 'time-outline', color: '#16A34A', text: 'Max 19 hours per week cumulative.' },
    { id: 'g2', icon: 'shield-checkmark-outline', color: '#16A34A', text: 'Shifts must be under 4 hours per day.' },
    { id: 'g3', icon: 'shirt-outline', color: '#16A34A', text: 'Wear your Student Assistant vest & ID.' },
    { id: 'g4', icon: 'person-outline', color: '#F59E0B', text: 'Report to Lead Librarian at start.' },
  ],
  weekdayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  monthNames: [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ],
  dayLabels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
};
