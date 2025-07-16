import React, { useEffect, useState } from 'react';
import { Animated, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '@/styles/Rewards/RewardListStyles';

const { width } = Dimensions.get('window');

export default function FloatRewardIcon({ index }) {
  const [animatedValue] = useState(new Animated.Value(0));
  const icons = ['gift', 'trophy', 'star', 'diamond', 'heart'];
  const colors = ['#007BFF', '#00A650', '#FFD700', '#FF4C4C', '#8B5CF6'];

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 3000 + index * 500,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.floatingIcon,
        {
          left: Math.random() * width,
          transform: [
            {
              translateY: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [600, -100],
              }),
            },
          ],
          opacity: animatedValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 0.6, 0],
          }),
        },
      ]}
    >
      <Ionicons name={icons[index % icons.length]} size={20} color={colors[index % colors.length]} />
    </Animated.View>
  );
}
