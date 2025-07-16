import React from 'react';
import { View, Text, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { heroStyles as styles } from '@/styles/PrizeDetail/Hero';

const HeroSection = ({ image, price }) => {
  return (
    <LinearGradient
      colors={['#007BFF', '#0056D6', '#002B5B']}
      style={styles.heroGradient}
    >
      <View style={styles.heroImageContainer}>
        <Image source={{ uri: image }} style={styles.heroImage} />
        <View style={styles.imageGlow} />
      </View>

      <View style={styles.priceContainer}>
        <Text style={styles.originalPrice}>{price}</Text>
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>99.9% OFF</Text>
        </View>
      </View>
    </LinearGradient>
  );
};

export default HeroSection;
