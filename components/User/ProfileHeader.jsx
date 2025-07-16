import React, { useEffect, useState } from 'react';
import { View, Text, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { profileHeaderStyles as styles } from '@/styles/User/ProfileHeader';

export default function ProfileHeader() {
  const [headerAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(headerAnimation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.profileHeader,
        {
          opacity: headerAnimation,
          transform: [
            {
              translateY: headerAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [-30, 0],
              }),
            },
          ],
        },
      ]}
    >
      <LinearGradient
        colors={['#007BFF', '#002B5B']}
        style={styles.profileGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.profileContent}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>A</Text>
            </View>
            <View style={styles.statusIndicator} />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>User name</Text>
            <Text style={styles.profilePhone}>+92 343 406 4793</Text>
            <View style={styles.verificationBadge}>
              <Ionicons name="checkmark-circle" size={16} color="#00A650" />
              <Text style={styles.verificationText}>Verified</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </Animated.View>
  );
}
