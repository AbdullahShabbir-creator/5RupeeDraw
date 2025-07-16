import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

import ProfileHeader from '@/components/User/ProfileHeader';
import QuickActions from '@/components/User/QuickActions';
import AnimatedSettingItem from '@/components/User/AnimatedSettingItem';

import { userScreenStyles as styles } from '@/styles/User/UserScreenStyles';

export default function UserScreen() {
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const accountSettings = [
    {
      title: 'Account Information',
      icon: 'person-outline',
      color: '#007BFF',
      subtitle: 'Personal details & verification',
    },
    {
      title: 'Payment Methods',
      icon: 'card-outline',
      color: '#00A650',
      subtitle: 'Cards, bank accounts & more',
    },
    {
      title: 'Transaction History',
      icon: 'time-outline',
      color: '#17A2B8',
      subtitle: 'View all your transactions',
    },
    {
      title: 'Security Settings',
      icon: 'shield-checkmark-outline',
      color: '#FFB800',
      subtitle: 'PIN, biometric & 2FA',
    },
  ];

  const generalSettings = [
    {
      title: 'Notifications',
      icon: 'notifications-outline',
      color: '#007BFF',
      type: 'switch',
      value: notificationsEnabled,
      onToggle: setNotificationsEnabled,
    },
    {
      title: 'Biometric Login',
      icon: 'finger-print-outline',
      color: '#00A650',
      type: 'switch',
      value: biometricEnabled,
      onToggle: setBiometricEnabled,
    },
    {
      title: 'Language',
      icon: 'language-outline',
      color: '#17A2B8',
      subtitle: 'English (US)',
    },
    {
      title: 'Theme',
      icon: 'color-palette-outline',
      color: '#FFB800',
      subtitle: 'Light mode',
    },
  ];

  const supportSettings = [
    {
      title: 'Help & Support',
      icon: 'help-circle-outline',
      color: '#007BFF',
      subtitle: '24/7 customer support',
    },
    {
      title: 'Privacy Policy',
      icon: 'lock-closed-outline',
      color: '#00A650',
      subtitle: 'How we protect your data',
    },
    {
      title: 'Terms & Conditions',
      icon: 'document-text-outline',
      color: '#17A2B8',
      subtitle: 'Legal agreements',
    },
    {
      title: 'About App',
      icon: 'information-circle-outline',
      color: '#FFB800',
      subtitle: 'Version 2.1.0',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.editButton}>
          <Ionicons name="create-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <ProfileHeader />
        <QuickActions />

        {/* Account Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          <View style={styles.settingsList}>
            {accountSettings.map((setting, index) => (
              <AnimatedSettingItem
                key={index}
                item={setting}
                index={index}
                onPress={() => console.log(`${setting.title} pressed`)}
              />
            ))}
          </View>
        </View>

        {/* General Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>General Settings</Text>
          <View style={styles.settingsList}>
            {generalSettings.map((setting, index) => (
              <AnimatedSettingItem
                key={index}
                item={setting}
                index={index}
                onPress={() => console.log(`${setting.title} pressed`)}
              />
            ))}
          </View>
        </View>

        {/* Support Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support & Legal</Text>
          <View style={styles.settingsList}>
            {supportSettings.map((setting, index) => (
              <AnimatedSettingItem
                key={index}
                item={setting}
                index={index}
                onPress={() => console.log(`${setting.title} pressed`)}
                showBadge={setting.title === 'Help & Support'}
                badgeCount={2}
              />
            ))}
          </View>
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton}>
          <LinearGradient
            colors={['#FF4C4C15', '#FF4C4C05']}
            style={styles.logoutGradient}
          >
            <Ionicons name="log-out-outline" size={24} color="#FF4C4C" />
            <Text style={styles.logoutButtonText}>Sign Out</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* App Version */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Lucky Draw App v2.1.0</Text>
          <Text style={styles.versionSubtext}>Built with ❤️ in Pakistan</Text>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}
