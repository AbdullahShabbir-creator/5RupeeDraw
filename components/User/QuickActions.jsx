import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { quickActionsStyles as styles } from '@/styles/User/QuickActionsStyles';

export default function QuickActions() {
  const quickActions = [
    { id: 1, icon: 'wallet-outline', title: 'Wallet', color: '#00A650' },
   
    { id: 3, icon: 'bar-chart-outline', title: 'Stats', color: '#FFB800' },
    { id: 4, icon: 'gift-outline', title: 'Rewards', color: '#17A2B8' },
  ];

  return (
    <View style={styles.quickActionsContainer}>
      <Text style={styles.quickActionsTitle}>Quick Actions</Text>
      <View style={styles.quickActionsList}>
        {quickActions.map((action) => (
          <TouchableOpacity key={action.id} style={styles.quickActionItem}>
            <View
              style={[
                styles.quickActionIcon,
                { backgroundColor: action.color + '15' },
              ]}
            >
              <Ionicons name={action.icon} size={24} color={action.color} />
            </View>
            <Text style={styles.quickActionText}>{action.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
