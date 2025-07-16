import React, { useEffect, useState } from 'react';
import { View, Text, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { pulseStyles as styles } from '@/styles/PrizeDetail/ParticipantPulse';

const ParticipantsPulse = ({ participants }) => {
  const [pulseAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View style={[styles.participantsBadge, { transform: [{ scale: pulseAnim }] }]}>
      <View style={styles.participantsContent}>
        <Ionicons name="people" size={16} color="#00A650" />
        <Text style={styles.participantsText}>
          {participants.toLocaleString()} joined
        </Text>
      </View>
      <View style={styles.liveIndicator}>
        <View style={styles.liveDot} />
        <Text style={styles.liveText}>LIVE</Text>
      </View>
    </Animated.View>
  );
};

export default ParticipantsPulse;
