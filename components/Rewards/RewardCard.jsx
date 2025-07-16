import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '@/styles/Rewards/RewardCardStyles';

const RewardCard = ({ item, index }) => {
  const [animatedValue] = useState(new Animated.Value(0));
  const [scaleValue] = useState(new Animated.Value(0.8));

  useEffect(() => {
    const delay = index * 100;
    Animated.sequence([
      Animated.delay(delay),
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
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <Animated.View
      style={[
        styles.rewardCard,
        {
          transform: [
            { translateX: animatedValue.interpolate({ inputRange: [0, 1], outputRange: [50, 0] }) },
            { scale: scaleValue },
          ],
          opacity: animatedValue,
        },
      ]}
    >
      <TouchableOpacity onPress={handlePress} activeOpacity={0.9}>
        <View style={styles.cardContent}>
          <View style={[styles.categoryBadge, { backgroundColor: item.color }]}>
            <Ionicons name={item.icon} size={12} color="#FFF" />
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
          <View style={styles.statusIndicator}>
            <View style={[styles.statusDot, { backgroundColor: item.redeemed ? '#6C757D' : '#00A650' }]} />
          </View>
          <View style={styles.cardBody}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: item.image }} style={styles.rewardImage} />
              <LinearGradient
                colors={[item.color + '20', item.color + '40']}
                style={styles.imageOverlay}
              />
              {item.redeemed && (
                <View style={styles.redeemedOverlay}>
                  <Ionicons name="checkmark-circle" size={24} color="#FFF" />
                </View>
              )}
            </View>

            <View style={styles.rewardDetails}>
              <Text style={styles.rewardName} numberOfLines={1}>{item.name}</Text>
              <View style={styles.valueRow}>
                <Text style={styles.rewardValue}>{item.value}</Text>
                <View style={styles.coinIcon}>
                  <Ionicons name="diamond" size={12} color="#FFD700" />
                </View>
              </View>
              <View style={styles.dateRow}>
                <Ionicons name="calendar" size={12} color="#6C757D" />
                <Text style={styles.rewardDate}>Won {item.date}</Text>
              </View>
              {!item.redeemed && (
                <View style={styles.expiryRow}>
                  <Ionicons name="time" size={12} color="#FF4C4C" />
                  <Text style={styles.expiryDate}>Expires {item.expiryDate}</Text>
                </View>
              )}
            </View>
          </View>

          <TouchableOpacity
            style={[styles.actionButton, item.redeemed ? styles.redeemedButton : styles.availableButton]}
            onPress={handlePress}
            disabled={item.redeemed}
          >
            {item.redeemed ? (
              <View style={styles.buttonContent}>
                <Ionicons name="checkmark" size={16} color="#6C757D" />
                <Text style={styles.redeemedButtonText}>Redeemed</Text>
              </View>
            ) : (
              <LinearGradient colors={['#00A650', '#00D665']} style={styles.buttonGradient}>
                <Ionicons name="arrow-forward" size={16} color="#FFF" />
                <Text style={styles.availableButtonText}>Redeem Now</Text>
              </LinearGradient>
            )}
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default RewardCard;
