import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Enhanced Tab Bar Icon Component
const TabBarIcon = ({ name, color, focused, label }) => {
  return (
    <View style={styles.tabIconContainer}>
      {focused && (
        <View style={styles.activeIndicator}>
          <LinearGradient
            colors={['#007BFF', '#0056D6']}
            style={styles.activeBackground}
          />
        </View>
      )}
      <View style={[styles.iconWrapper, focused && styles.iconWrapperActive]}>
        <Ionicons 
          name={focused ? name : `${name}-outline`} 
          size={focused ? 26 : 24} 
          color={color} 
        />
      </View>
      
      {focused && <View style={styles.activeDot} />}
    </View>
  );
};

// Enhanced Tab Bar Background Component
const EnhancedTabBarBackground = () => {
  return (
    <View style={styles.tabBarBackground}>
      <LinearGradient
        colors={['rgba(255,255,255,0.95)', 'rgba(255,255,255,0.98)']}
        style={styles.tabBarGradient}
      />
      <View style={styles.tabBarBorder} />
      <View style={styles.tabBarGlow} />
    </View>
  );
};

export default function TabLayout() {
  const colorScheme = useColorScheme();
    const insets = useSafeAreaInsets(); 

  return (
   <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#007BFF',
        tabBarInactiveTintColor: '#6C757D',
        headerShown: false,
        tabBarShowLabel: false,
        tabBarButton: HapticTab,
        tabBarBackground: EnhancedTabBarBackground,
        tabBarStyle: {
          position: 'absolute',
          left: 16,
          right: 16,
          height: Platform.OS === 'ios' ? 85 : 75 + insets.bottom, // 👈 Adjust for bottom space
          backgroundColor: 'transparent',
          borderRadius: 25,
          borderTopWidth: 0,
          paddingBottom: Platform.OS === 'ios' ? 25 : 15 + insets.bottom, // 👈 Space above nav buttons
          paddingTop: 15,
          paddingHorizontal: 10,
          ...Platform.select({
            ios: {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.15,
              shadowRadius: 20,
            },
            android: {
              elevation: 15,
            },
          }),
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon 
              name="home" 
              color={color} 
              focused={focused} 
              label="Home"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="prizes"
        options={{
          title: 'Prizes',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon 
              name="gift" 
              color={color} 
              focused={focused} 
              label="Prizes"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="rewards"
        options={{
          title: 'Rewards',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon 
              name="trophy" 
              color={color} 
              focused={focused} 
              label="Rewards"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="user"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon 
              name="person" 
              color={color} 
              focused={focused} 
              label="Profile"
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  // Tab Bar Background Styles
  tabBarBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 25,
    overflow: 'hidden',
  },
  tabBarGradient: {
    flex: 1,
    borderRadius: 25,
  },
  tabBarBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(0,123,255,0.1)',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  tabBarGlow: {
    position: 'absolute',
    top: -10,
    left: -10,
    right: -10,
    bottom: -10,
    borderRadius: 35,
    backgroundColor: 'rgba(0,123,255,0.05)',
    zIndex: -1,
  },
  
  // Tab Icon Styles
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    position: 'relative',
  },
  activeIndicator: {
    position: 'absolute',
    top: -5,
    left: -5,
    right: -5,
    bottom: -5,
    borderRadius: 20,
    overflow: 'hidden',
  },
  activeBackground: {
    flex: 1,
    opacity: 0.1,
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: 'transparent',
    transition: 'all 0.3s ease',
  },
  iconWrapperActive: {
    backgroundColor: 'rgba(0,123,255,0.08)',
    transform: [{ scale: 1.1 }],
  },
  labelContainer: {
    position: 'absolute',
    bottom: -18,
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  activeDot: {
    position: 'absolute',
    top: -8,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#007BFF',
  },
});