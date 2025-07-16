import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  ScrollView,
  Platform,
  Dimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

import HeroSection from '@/components/PrizeList/HeroSection';
import PrizesList from '@/components/PrizeList/PrizeList';
import HowItWorksSection from '@/components/PrizeList/HowItWorksSection';
import styles from '@/styles/PrizeList/PrizeScreenStyles';

const { width } = Dimensions.get('window');

const prizes = [
  {
    id: '1',
    name: 'Samsung Galaxy A34',
    image: 'https://api.a0.dev/assets/image?text=Samsung%20Galaxy%20A34&aspect=1:1&seed=123',
    price: 'Rs.115,000',
    participants: 139429,
    badge: 'TRENDING',
    badgeColor: '#FF6B6B',
    specs: {
      body: '161.3 x 78.1 x 8.2 mm',
      display: 'Super AMOLED, 120Hz, 1000 nits (HBM)',
      camera: '48 MP, f/1.8, 26mm, PDAF, OIS',
    },
  },
    {
    id: '2',
    name: 'Samsung Galaxy A34',
    image: 'https://api.a0.dev/assets/image?text=Samsung%20Galaxy%20A34&aspect=1:1&seed=123',
    price: 'Rs.115,000',
    participants: 139429,
    badge: 'TRENDING',
    badgeColor: '#FF6B6B',
    specs: {
      body: '161.3 x 78.1 x 8.2 mm',
      display: 'Super AMOLED, 120Hz, 1000 nits (HBM)',
      camera: '48 MP, f/1.8, 26mm, PDAF, OIS',
    },
  },
    {
    id: '3',
    name: 'Samsung Galaxy A34',
    image: 'https://api.a0.dev/assets/image?text=Samsung%20Galaxy%20A34&aspect=1:1&seed=123',
    price: 'Rs.115,000',
    participants: 139429,
    badge: 'TRENDING',
    badgeColor: '#FF6B6B',
    specs: {
      body: '161.3 x 78.1 x 8.2 mm',
      display: 'Super AMOLED, 120Hz, 1000 nits (HBM)',
      camera: '48 MP, f/1.8, 26mm, PDAF, OIS',
    },
  },
    {
    id: '4',
    name: 'Samsung Galaxy A34',
    image: 'https://api.a0.dev/assets/image?text=Samsung%20Galaxy%20A34&aspect=1:1&seed=123',
    price: 'Rs.115,000',
    participants: 139429,
    badge: 'TRENDING',
    badgeColor: '#FF6B6B',
    specs: {
      body: '161.3 x 78.1 x 8.2 mm',
      display: 'Super AMOLED, 120Hz, 1000 nits (HBM)',
      camera: '48 MP, f/1.8, 26mm, PDAF, OIS',
    },
  },
    {
    id: '5',
    name: 'Samsung Galaxy A34',
    image: 'https://api.a0.dev/assets/image?text=Samsung%20Galaxy%20A34&aspect=1:1&seed=123',
    price: 'Rs.115,000',
    participants: 139429,
    badge: 'TRENDING',
    badgeColor: '#FF6B6B',
    specs: {
      body: '161.3 x 78.1 x 8.2 mm',
      display: 'Super AMOLED, 120Hz, 1000 nits (HBM)',
      camera: '48 MP, f/1.8, 26mm, PDAF, OIS',
    },
  },
  // Add more prizes...
];


const FloatingParticles = () => {
  const [particles] = useState(() =>
    Array.from({ length: 6 }, (_, i) => ({
      id: i,
      animatedValue: new Animated.Value(0),
      x: Math.random() * width,
      delay: Math.random() * 2000,
    }))
  );

  useEffect(() => {
    particles.forEach((particle) => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(particle.delay),
          Animated.timing(particle.animatedValue, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
          }),
          Animated.timing(particle.animatedValue, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      ).start();
    });
  }, []);

  return (
    <View style={styles.particlesContainer}>
      {particles.map((particle) => (
        <Animated.View
          key={particle.id}
          style={[
            styles.particle,
            {
              left: particle.x,
              transform: [
                {
                  translateY: particle.animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [600, -100],
                  }),
                },
              ],
              opacity: particle.animatedValue.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [0, 1, 0],
              }),
            },
          ]}
        />
      ))}
    </View>
  );
};

export default function PrizesScreen() {
  const [headerOpacity] = useState(new Animated.Value(0));
  const insets = useSafeAreaInsets();

  useEffect(() => {
    Animated.timing(headerOpacity, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}> {/* NOT SafeAreaView */}
      <StatusBar style="light" backgroundColor="#007BFF" />

      <FloatingParticles />

      <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
        <LinearGradient
          colors={['#007BFF', '#0056D6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.headerGradient, { paddingTop: insets.top }]} // ✅ ONLY INSIDE GRADIENT
        >
          <TouchableOpacity style={styles.backButton}>
            <Text><Ionicons name="chevron-back" size={24} color="#FFFFFF" /></Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Lucky Draw</Text>
          <TouchableOpacity style={styles.infoButton}>
           <Text><Ionicons name="information-circle-outline" size={24} color="#FFFFFF" /></Text> 
          </TouchableOpacity>
        </LinearGradient>
      </Animated.View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <HeroSection />
        <PrizesList prizes={prizes} />
        <HowItWorksSection />
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}
