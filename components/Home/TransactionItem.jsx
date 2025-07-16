import React, { useEffect, useState } from 'react';
import { View, Text, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { transactionStyles as styles } from '@/styles/Home/TransactionsStyles';

export default function TransactionItem({ transaction, index }) {
  const [itemAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(itemAnim, {
      toValue: 1,
      duration: 600,
      delay: index * 100,
      useNativeDriver: true,
    }).start();
  }, []);

  const getIcon = (type) => {
    switch (type) {
      case 'win': return 'trophy';
      case 'entry': return 'flash';
      case 'bonus': return 'gift';
      default: return 'wallet';
    }
  };

  const getColor = (type) => {
    switch (type) {
      case 'win': return '#FFD700';
      case 'entry': return '#007BFF';
      case 'bonus': return '#00A650';
      default: return '#6C757D';
    }
  };

  return (
    <Animated.View
      style={[
        styles.transactionItem,
        {
          transform: [{ translateX: itemAnim.interpolate({ inputRange: [0, 1], outputRange: [100, 0] }) }],
          opacity: itemAnim,
        },
      ]}
    >
      <View style={styles.transactionLeft}>
        <View style={[styles.transactionIconContainer, { backgroundColor: getColor(transaction.type) }]}>
          <Ionicons name={getIcon(transaction.type)} size={20} color="white" />
        </View>
        <View style={styles.transactionInfo}>
          <Text style={styles.transactionName}>{transaction.name}</Text>
          <Text style={styles.transactionDescription}>{transaction.description}</Text>
          <Text style={styles.transactionDate}>{transaction.date}</Text>
        </View>
      </View>
      <View style={styles.transactionRight}>
        <Text
          style={[
            styles.transactionAmount,
            transaction.amount.includes('+') ? styles.positiveAmount : styles.negativeAmount,
          ]}
        >
          {transaction.amount}
        </Text>
        <View
          style={[
            styles.transactionBadge,
            { backgroundColor: transaction.amount.includes('+') ? '#E8F5E9' : '#FFEBEE' },
          ]}
        >
          <Text
            style={{
              color: transaction.amount.includes('+') ? '#00A650' : '#FF4C4C',
              fontWeight: '600',
              fontSize: 10,
            }}
          >
            {transaction.amount.includes('+') ? 'Credit' : 'Debit'}
          </Text>
        </View>
      </View>
    </Animated.View>
  );
}
