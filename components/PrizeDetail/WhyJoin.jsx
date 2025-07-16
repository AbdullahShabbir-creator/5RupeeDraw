import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { whyJoinStyles as styles } from '@/styles/PrizeDetail/WhyJoin';

const WhyJoin = () => {
  return (
    <View style={styles.featuresSection}>
      <Text style={styles.sectionTitle}>Why Join This Draw?</Text>
      <View style={styles.featuresGrid}>
        <View style={styles.featureCard}>
          <Ionicons name="flash" size={24} color="#FFD700" />
          <Text style={styles.featureTitle}>Instant Entry</Text>
          <Text style={styles.featureText}>Join in seconds</Text>
        </View>
        <View style={styles.featureCard}>
          <Ionicons name="shield-checkmark" size={24} color="#00A650" />
          <Text style={styles.featureTitle}>100% Safe</Text>
          <Text style={styles.featureText}>Secure payments</Text>
        </View>
        <View style={styles.featureCard}>
          <Ionicons name="trophy" size={24} color="#007BFF" />
          <Text style={styles.featureTitle}>Fair Draw</Text>
          <Text style={styles.featureText}>Transparent process</Text>
        </View>
        <View style={styles.featureCard}>
          <Ionicons name="card" size={24} color="#FF6B6B" />
          <Text style={styles.featureTitle}>Refund Policy</Text>
          <Text style={styles.featureText}>Money back guarantee</Text>
        </View>
      </View>
    </View>
  );
};

export default WhyJoin;
