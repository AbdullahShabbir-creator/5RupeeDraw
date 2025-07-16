import React from 'react';
import { Text, View, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../../styles/PrizeList/HeroSectionStyles';

export default function HeroSection() {
  return (
    <LinearGradient
      colors={['#007BFF', '#0056D6', '#002B5B']}
      style={styles.heroSection}
    >
      <ImageBackground
        source={{ uri: 'https://api.a0.dev/assets/image?text=Lucky%20Pattern&aspect=16:9&seed=pattern' }}
        style={styles.heroBackground}
        imageStyle={{ opacity: 0.1 }}
      >
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>Win Amazing Prizes</Text>
          <Text style={styles.heroSubtitle}>
            Get premium items worth thousands for just ₹1! 
            Join millions of lucky winners today.
          </Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Ionicons name="trophy" size={20} color="#FFD700" />
              <Text style={styles.statText}>139K+ Winners</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="flash" size={20} color="#00A650" />
              <Text style={styles.statText}>Live Draws</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="shield-checkmark" size={20} color="#FFFFFF" />
              <Text style={styles.statText}>100% Safe</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </LinearGradient>
  );
}
