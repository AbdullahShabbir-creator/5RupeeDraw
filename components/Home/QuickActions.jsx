import React from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { quickActionsStyles as styles } from '@/styles/Home/QuickActionStyles';

export default function QuickActions({ quickActions, actionsAnim }) {
  return (
    <View style={styles.quickActionsContainer}>
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.quickActions}>
        {quickActions.map((action, index) => (
          <Animated.View
            key={index}
            style={[
              styles.actionButton,
              {
                transform: [
                  {
                    translateY: actionsAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [50, 0],
                    }),
                  },
                ],
                opacity: actionsAnim,
              },
            ]}
          >
            <TouchableOpacity activeOpacity={0.8}>
              <LinearGradient
                colors={action.gradient}
                style={styles.actionIcon}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons name={action.icon} size={24} color="white" />
              </LinearGradient>
              <Text style={styles.actionText}>{action.name}</Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>
    </View>
  );
}
