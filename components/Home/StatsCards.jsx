import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { statsCardStyles as styles } from '@/styles/Home/StatsCardStyles';

export default function StatsCards() {
  return (
    <View style={styles.statsContainer}>
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <LinearGradient colors={['#00A650', '#00D665']} style={styles.statGradient}>
            <Ionicons name="trophy" size={24} color="white" />
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Wins This Month</Text>
          </LinearGradient>
        </View>
        <View style={styles.statCard}>
          <LinearGradient colors={['#FF4C4C', '#FF6B6B']} style={styles.statGradient}>
            <Ionicons name="flash" size={24} color="white" />
            <Text style={styles.statValue}>47</Text>
            <Text style={styles.statLabel}>Active Entries</Text>
          </LinearGradient>
        </View>
      </View>
    </View>
  );
}
