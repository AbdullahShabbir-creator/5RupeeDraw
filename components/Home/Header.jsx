import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { headerStyles } from '@/styles/Home/HeaderStyles';

export default function Header() {
  return (
    <LinearGradient
      colors={['#002B5B', '#007BFF']}
      style={headerStyles.headerGradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <View style={headerStyles.headerContent}>
        <View style={headerStyles.headerLeft}>
          <Text style={headerStyles.headerTitle}>LuckyDraw</Text>
          <View style={headerStyles.purpleDot} />
        </View>
        <View style={headerStyles.headerRight}>
          <TouchableOpacity style={headerStyles.notificationButton}>
            <Ionicons name="notifications" size={24} color="white" />
            <View style={headerStyles.notificationBadge}>
              <Text style={headerStyles.notificationBadgeText}>3</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}
