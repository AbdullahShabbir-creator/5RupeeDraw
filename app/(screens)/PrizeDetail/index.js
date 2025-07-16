import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  ScrollView
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { styles } from '@/styles/PrizeDetail/PrizeDetailScreen';

import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';

// Import modular components
import HeroSection from '@/components/PrizeDetail/Hero';
import ParticipantsPulse from '@/components/PrizeDetail/ParticipantPulse';
import CountdownTimer from '@/components/PrizeDetail/CountdownTimer';
import SpecItem from '@/components/PrizeDetail/SpecItem';
import WhyJoin from '@/components/PrizeDetail/WhyJoin';
import WinnerAnnouncement from '@/components/PrizeDetail/WinnerAnnouncement';

export default function PrizeDetailScreen() {
  const router = useRouter();
  const { id, name, image, price, participants, body, display, camera } = useLocalSearchParams();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [headerOpacity] = useState(new Animated.Value(0));
  const [imageScale] = useState(new Animated.Value(1));

  const prize = {
    id,
    name,
    image,
    price,
    participants: parseInt(participants),
    specs: { body, display, camera },
  };

  const specs = [
    { label: 'Body', value: prize.specs.body, icon: 'phone-portrait-outline' },
    { label: 'Display', value: prize.specs.display, icon: 'tv-outline' },
    { label: 'Camera', value: prize.specs.camera, icon: 'camera-outline' },
  ];

  useEffect(() => {
    Animated.timing(headerOpacity, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleBuyNow = () => {
    Animated.sequence([
      Animated.timing(imageScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(imageScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    router.push({
      pathname: '/Purchase',
      params: { id: prize.id, name: prize.name, price: prize.price },
    });
  };

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, -100],
    extrapolate: 'clamp',
  });

  const imageTranslateY = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, -50],
    extrapolate: 'clamp',
  });

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [1, 0.8],
    extrapolate: 'clamp',
  });
console.log('Specs:', specs);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {/* Animated Header */}
      <Animated.View
        style={[
          styles.header,
          { opacity: headerOpacity, transform: [{ translateY: headerTranslateY }] },
        ]}
      >
        <LinearGradient
          colors={['rgba(0,123,255,0.95)', 'rgba(0,86,214,0.95)']}
          style={styles.headerGradient}
        >
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Prize Details</Text>
          <TouchableOpacity style={styles.shareButton}>
            <Ionicons name="share-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </LinearGradient>
      </Animated.View>

      {/* Scrollable Content */}
      <Animated.ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {/* Hero Section */}
        <Animated.View
          style={[
            styles.heroSection,
            {
              transform: [
                { translateY: imageTranslateY },
                { scale: imageScale },
              ],
              opacity: imageOpacity,
            },
          ]}
        >
          <HeroSection image={prize.image} price={prize.price} />
        </Animated.View>

        {/* Participants */}
        <View style={styles.participantsBadgeContainer}>
          <ParticipantsPulse participants={prize.participants} />
        </View>

        {/* Product Name & Rating */}
        <View style={styles.productSection}>
          <Text style={styles.productName}>{prize.name}</Text>
          <View style={styles.productMeta}>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingText}>4.8 (2.1k reviews)</Text>
            </View>
            <View style={styles.verifiedBadge}>
              <Ionicons name="shield-checkmark" size={16} color="#00A650" />
              <Text style={styles.verifiedText}>Verified</Text>
            </View>
          </View>
        </View>

        {/* Countdown */}
        <CountdownTimer targetDate="2025-07-17T12:00:00" />

        {/* Tech Specs */}
        <View style={styles.specsSection}>
  <Text style={styles.sectionTitle}>Tech Specifications</Text>
  <View style={styles.specsContainer}>
    {specs.map((spec, index) => (
      <SpecItem
        key={spec.label}
        label={spec.label}
        value={spec.value}
        icon={spec.icon}
        index={index}
      />
    ))}
  </View>
</View>

        {/* Why Join */}
<View style={{ paddingHorizontal: 16 }}>
  <WhyJoin />
</View>

       

        {/* Winner Announcement */}
        <WinnerAnnouncement />
      </Animated.ScrollView>

      {/* Sticky Footer */}
      <View style={styles.footer}>
        <LinearGradient
          colors={['rgba(248,249,250,0.95)', '#F8F9FA']}
          style={styles.footerGradient}
        >
          <View style={styles.footerContent}>
            <View style={styles.priceDisplay}>
              <Text style={styles.footerPriceLabel}>Pay only</Text>
              <Text style={styles.footerPrice}>Rs1</Text>
            </View>
            <TouchableOpacity style={styles.buyButton} onPress={handleBuyNow}>
              <LinearGradient
                colors={['#00A650', '#00D665']}
                style={styles.buyButtonGradient}
              >
                <Ionicons name="flash" size={20} color="#FFFFFF" />
                <Text style={styles.buyButtonText}>Join Draw</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <Text style={styles.refundNote}>
            <Ionicons name="shield-checkmark" size={12} color="#00A650" /> Full refund if you don't win • Safe & Secure
          </Text>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
}
