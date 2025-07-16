import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { winnerStyles as styles } from '@/styles/PrizeDetail/WinnerAnnouncements';

const WinnerAnnouncement = () => {
  return (
    <View style={styles.announcementSection}>
      <View style={styles.announcementCard}>
        <Ionicons name="calendar" size={24} color="#007BFF" />
        <View style={styles.announcementContent}>
          <Text style={styles.announcementTitle}>Winner Announcement</Text>
          <Text style={styles.announcementDate}>July 17, 2025 at 12:00 PM</Text>
          <Text style={styles.announcementNote}>
            Live draw will be conducted transparently
          </Text>
        </View>
      </View>
    </View>
  );
};

export default WinnerAnnouncement;
