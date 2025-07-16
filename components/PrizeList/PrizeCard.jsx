import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import styles from '../../styles/PrizeList/PrizeCardStyles';

export default function PrizeCard({ prize, index }) {
  const [animatedValue] = useState(new Animated.Value(0));
  const [scaleValue] = useState(new Animated.Value(0));
  const router = useRouter();

  useEffect(() => {
    Animated.sequence([
      Animated.delay(index * 150),
      Animated.parallel([
        Animated.spring(animatedValue, {
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.spring(scaleValue, {
          toValue: 1,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  const handlePress = () => {
    router.push({
      pathname: '/PrizeDetail/[id]',
      params: {
        id: prize.id,
        name: prize.name,
        image: prize.image,
        price: prize.price,
        participants: prize.participants,
        body: prize.specs.body,
        display: prize.specs.display,
        camera: prize.specs.camera,
      },
    });
  };

  return (
    <Animated.View
      style={[
        styles.prizeCard,
        {
          transform: [
            {
              translateY: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              }),
            },
            { scale: scaleValue },
          ],
          opacity: animatedValue,
        },
      ]}
    >
      <TouchableOpacity onPress={handlePress} activeOpacity={0.9}>
        <View style={styles.cardContent}>
          <View style={[styles.badge, { backgroundColor: prize.badgeColor }]}>
            <Text style={styles.badgeText}>{prize.badge}</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image source={{ uri: prize.image }} style={styles.prizeImage} />
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.1)']}
              style={styles.imageOverlay}
            />
          </View>
          <View style={styles.prizeInfo}>
            <Text style={styles.prizeName} numberOfLines={2}>
              {prize.name}
            </Text>
            <View style={styles.priceRow}>
              <Text style={styles.originalPrice}>{prize.price}</Text>
              <View style={styles.onlyOne}>
                <Text style={styles.onlyOneText}>Only Rs1</Text>
              </View>
            </View>
            <View style={styles.participantsRow}>
              <Ionicons name="people" size={14} color="#6C757D" />
              <Text style={styles.participantsCount}>
                {prize.participants.toLocaleString()} joined
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.buyButton} onPress={handlePress}>
            <LinearGradient
              colors={['#00A650', '#00D665']}
              style={styles.buyButtonGradient}
            >
              <Ionicons name="flash" size={16} color="#FFFFFF" />
              <Text style={styles.buyButtonText}>Join Now</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}
