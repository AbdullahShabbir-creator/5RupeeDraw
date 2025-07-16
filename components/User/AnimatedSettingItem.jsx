import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { settingSectionStyles as styles } from '@/styles/User/SettingSectionStyles';

export default function AnimatedSettingItem({
  item,
  onPress,
  index,
  showBadge = false,
  badgeCount = 0,
}) {
  const [animatedValue] = useState(new Animated.Value(0));
  const [scaleValue] = useState(new Animated.Value(0));

  useEffect(() => {
    const delay = index * 100;
    Animated.sequence([
      Animated.delay(delay),
      Animated.parallel([
        Animated.spring(animatedValue, {
          toValue: 1,
          useNativeDriver: true,
          tension: 50,
          friction: 8,
        }),
        Animated.spring(scaleValue, {
          toValue: 1,
          useNativeDriver: true,
          tension: 50,
          friction: 8,
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

    onPress && onPress();
  };

  return (
    <Animated.View
      style={{
        transform: [
          {
            translateX: animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [50, 0],
            }),
          },
          { scale: scaleValue },
        ],
        opacity: animatedValue,
      }}
    >
      <TouchableOpacity
        style={styles.settingItem}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <View style={styles.settingLeft}>
          <View
            style={[
              styles.iconBackground,
              { backgroundColor: item.color + '15' },
            ]}
          >
            <Ionicons name={item.icon} size={22} color={item.color} />
          </View>
          <View style={styles.settingTextContainer}>
            <Text style={styles.settingText}>{item.title}</Text>
            {item.subtitle && (
              <Text style={styles.settingSubtext}>{item.subtitle}</Text>
            )}
          </View>
        </View>
        <View style={styles.settingRight}>
          {showBadge && badgeCount > 0 && (
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>{badgeCount}</Text>
            </View>
          )}
          {item.type === 'switch' ? (
            <Switch
              value={item.value}
              onValueChange={item.onToggle}
              trackColor={{ false: '#E0E0E0', true: '#00A65050' }}
              thumbColor={item.value ? '#00A650' : '#F4F4F4'}
            />
          ) : (
            <Ionicons
              name="chevron-forward"
              size={20}
              color="#6C757D"
            />
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}
