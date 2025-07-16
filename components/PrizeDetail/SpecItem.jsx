import React, { useEffect, useState } from 'react';
import { View, Text, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { specItemStyles as styles } from '@/styles/PrizeDetail/SpecItem';

const SpecItem = ({ label, value, icon, index }) => {
  const [animatedValue] = useState(new Animated.Value(0));
useEffect(() => {
  console.log('SpecItem props:', { label, value, icon, index });
}, []);

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 600,
      delay: index * 100,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.specItem,
        {
          opacity: animatedValue,
          transform: [
            {
              translateX: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              }),
            },
          ],
        },
      ]}
    >
      <View style={styles.specIcon}>
        <Ionicons name={icon} size={20} color="#007BFF" />
      </View>
      <View style={styles.specContent}>
        <Text style={styles.specLabel}>{label}</Text>
        <Text style={styles.specValue}>{value}</Text>
      </View>
    </Animated.View>
  );
};

export default SpecItem;
