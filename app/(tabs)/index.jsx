import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, ScrollView, Animated, ImageBackground } from 'react-native';
import Header from '@/components/Home/Header';
import BalanceCard from '@/components/Home/BalanceCard';
import QuickActions from '@/components/Home/QuickActions';
import StatsCards from '@/components/Home/StatsCards';
import TransactionItem from '@/components/Home/TransactionItem';
import { homeStyles } from '@/styles/Home/HomeScreenStyles';
     
export default function HomeScreen() {
  const [showBalance, setShowBalance] = useState(true);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));
  const [cardAnim] = useState(new Animated.Value(0));
  const [actionsAnim] = useState(new Animated.Value(0));

  const quickActions = [
    { icon: 'flash', name: 'Lucky Draw', color: '#00A650', gradient: ['#00A650', '#00D665'] },
    { icon: 'wallet', name: 'Top Up', color: '#007BFF', gradient: ['#007BFF', '#0056D6'] },
    { icon: 'trophy', name: 'My Wins', color: '#FFD700', gradient: ['#FFD700', '#FFA500'] },
    { icon: 'person', name: 'Profile', color: '#6C757D', gradient: ['#6C757D', '#495057'] },
  ];

  const transactions = [
    {
      id: 1,
      name: 'Lucky Draw Win',
      date: '2 May 2024 / 2:00 PM',
      amount: '+ Rs22.78',
      image: 'https://api.a0.dev/assets/image?text=L&aspect=1:1&seed=123',
      type: 'win',
      description: 'Samsung Galaxy A34 Entry',
    },
    {
      id: 2,
      name: 'Premium Entry',
      date: '18 July 2024 / 6:00 AM',
      amount: '- Rs10.18',
      image: 'https://api.a0.dev/assets/image?text=P&aspect=1:1&seed=456',
      type: 'entry',
      description: 'iPhone 15 Pro Draw',
    },
    {
      id: 3,
      name: 'Bonus Credit',
      date: '18 July 2024 / 8:00 AM',
      amount: '+ Rs7.28',
      image: 'https://api.a0.dev/assets/image?text=B&aspect=1:1&seed=789',
      type: 'bonus',
      description: 'Referral Bonus',
    },
    {
      id: 4,
      name: 'Prize Entry',
      date: '19 July 2024 / 10:30 AM',
      amount: '- Rs100.00',
      image: 'https://api.a0.dev/assets/image?text=M&aspect=1:1&seed=101',
      type: 'entry',
      description: 'MacBook Air M3 Draw',
    },
  ];

  useEffect(() => {
    const animationSequence = Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(cardAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(actionsAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ]);

    animationSequence.start();
  }, []);

  return (
    <SafeAreaView style={homeStyles.container}>
      {/* Background */}
      <ImageBackground
        source={{ uri: 'https://api.a0.dev/assets/image?text=Pattern&aspect=16:9&seed=bg' }}
        style={homeStyles.backgroundPattern}
        imageStyle={{ opacity: 0.05 }}
      />

      {/* Header */}
      <Animated.View style={{ opacity: fadeAnim }}>
        <Header />
      </Animated.View>

      <ScrollView style={homeStyles.content} showsVerticalScrollIndicator={false}>
        {/* Balance Card */}
        <Animated.View
          style={{
            paddingHorizontal: 20,
            transform: [{ translateY: slideAnim }],
            opacity: cardAnim,
          }}
        >
          <BalanceCard showBalance={showBalance} setShowBalance={setShowBalance} />
        </Animated.View>

        {/* Quick Actions */}
        <QuickActions quickActions={quickActions} actionsAnim={actionsAnim} />

        {/* Stats Cards */}
        <StatsCards />

        {/* Recent Activity */}
        <View style={homeStyles.transactionsContainer}>
          <View style={homeStyles.transactionsHeader}>
            <Animated.Text style={homeStyles.sectionTitle}>Recent Activity</Animated.Text>
          </View>

          <View style={homeStyles.transactionsList}>
            {transactions.map((tx, idx) => (
              <TransactionItem key={tx.id} transaction={tx} index={idx} />
            ))}
          </View>
        </View>

        <View style={homeStyles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}
