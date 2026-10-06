// src/app/studentNotifications.jsx

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { studentNotificationsData } from '../data/mockData';

const COLORS = {
  page: '#8FB2DA',
  white: '#FFFFFF',
  text: '#1B1B1F',
  muted: '#5F6470',
  border: '#E4E6EB',
  primary: '#5B5BEA',

  warningBg: '#FFF4DD',
  warning: '#C98A1B',

  successBg: '#E7F7EC',
  success: '#2E9B57',

  dangerBg: '#FDEAEA',
  danger: '#D64545',

  blueBg: '#EAF3FD',
  blue: '#3B6FE0',
};

const NOTIFICATIONS = studentNotificationsData.map((notification) => ({
  ...notification,
  iconColor: notification.iconColor || COLORS.warning,
  iconBackground: notification.iconBackground || COLORS.warningBg,
}));

/* -------------------------------------------------------------------------- */
/* SCREEN                                                                     */
/* -------------------------------------------------------------------------- */

export default function StudentNotifications() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <Ionicons
            name="chevron-back"
            size={24}
            color={COLORS.text}
          />
        </TouchableOpacity>

        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>
            Notifications
          </Text>

          <Text style={styles.headerSubtitle}>
            StudentSync
          </Text>
        </View>

        <View style={styles.headerIcon}>
          <Ionicons
            name="notifications-outline"
            size={24}
            color={COLORS.primary}
          />
        </View>
      </View>

      {/* NOTIFICATIONS */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.pageTitle}>
          Recent Notifications
        </Text>

        <Text style={styles.pageSubtitle}>
          Stay updated about your shifts, leave requests and library services.
        </Text>

        {NOTIFICATIONS.map((notification) => (
          <View
            key={notification.id}
            style={styles.notificationCard}
          >
            {/* ICON */}
            <View
              style={[
                styles.notificationIcon,
                {
                  backgroundColor:
                    notification.iconBackground,
                },
              ]}
            >
              <Ionicons
                name={notification.icon}
                size={24}
                color={notification.iconColor}
              />
            </View>

            {/* CONTENT */}
            <View style={styles.notificationContent}>
              <View style={styles.notificationTopRow}>
                <Text style={styles.notificationTitle}>
                  {notification.title}
                </Text>

                <Text style={styles.notificationTime}>
                  {notification.time}
                </Text>
              </View>

              <Text style={styles.notificationDate}>
                {notification.date}
              </Text>

              <Text style={styles.notificationMessage}>
                {notification.message}
              </Text>
            </View>
          </View>
        ))}

        {/* FOOTER */}
        <View style={styles.footer}>
          <Ionicons
            name="checkmark-done-outline"
            size={20}
            color={COLORS.muted}
          />

          <Text style={styles.footerText}>
            You&apos;re all caught up
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* -------------------------------------------------------------------------- */
/* STYLES                                                                     */
/* -------------------------------------------------------------------------- */

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.page,
  },

  /* HEADER */

  header: {
    backgroundColor: COLORS.white,
    minHeight: 75,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerTitleContainer: {
    flex: 1,
    marginLeft: 5,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.text,
  },

  headerSubtitle: {
    marginTop: 2,
    fontSize: 12,
    color: COLORS.muted,
  },

  headerIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#ECECFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* CONTENT */

  scroll: {
    flex: 1,
  },

  content: {
    width: '100%',
    maxWidth: 900,
    alignSelf: 'center',
    padding: 20,
    paddingBottom: 40,
  },

  pageTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.text,
  },

  pageSubtitle: {
    marginTop: 5,
    marginBottom: 20,
    fontSize: 13,
    lineHeight: 19,
    color: COLORS.muted,
  },

  /* NOTIFICATION CARD */

  notificationCard: {
    backgroundColor: COLORS.white,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
  },

  notificationIcon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  notificationContent: {
    flex: 1,
  },

  notificationTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },

  notificationTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.text,
    paddingRight: 8,
  },

  notificationTime: {
    fontSize: 11,
    color: COLORS.muted,
    fontWeight: '600',
  },

  notificationDate: {
    marginTop: 3,
    fontSize: 11,
    color: COLORS.muted,
  },

  notificationMessage: {
    marginTop: 8,
    fontSize: 13,
    lineHeight: 19,
    color: COLORS.muted,
  },

  /* FOOTER */

  footer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 25,
  },

  footerText: {
    marginTop: 5,
    fontSize: 12,
    color: COLORS.muted,
  },
});
