import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { countdownStyles as styles } from '@/styles/PrizeDetail/CountdownTimer';

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(targetDate).getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <View style={styles.countdownContainer}>
      <Text style={styles.countdownTitle}>Draw in</Text>
      <View style={styles.countdownGrid}>
        {Object.entries(timeLeft).map(([unit, value]) => (
          <View key={unit} style={styles.timeUnit}>
            <Text style={styles.timeValue}>{value.toString().padStart(2, '0')}</Text>
            <Text style={styles.timeLabel}>{unit}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default CountdownTimer;
