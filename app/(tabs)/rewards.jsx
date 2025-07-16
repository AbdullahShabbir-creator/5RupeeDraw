import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, FlatList, Animated, TouchableOpacity, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

// Components
import FilterTabs from '@/components/Rewards/FilterTabs';
import RewardCard from '@/components/Rewards/RewardCard';
import FloatRewardIcon from '@/components/Rewards/FloatRewardIcon';

// Styles
import screenStyles from '@/styles/Rewards/RewardScreenStyles';
import listStyles from '@/styles/Rewards/RewardListStyles';

// ✅ Inline mock data
const userRewards = Array.from({ length: 10 }, (_, index) => ({
  id: String(index + 1),
  name: [
    'Amazon Gift Card',
    'Spotify Premium',
    'Netflix Subscription',
    'Starbucks Gift Card',
    'Google Play Credit',
    'Uber Eats Voucher',
  ][index % 6],
  value: ['$10', '1 Month', '3 Months', '$25', '$30', '$40'][index % 6],
  date: `2025-06-${String(10 + index).padStart(2, '0')}`,
  image: `https://api.a0.dev/assets/image?text=Reward%20${index + 1}&aspect=1:1&seed=${100 + index}`,
  redeemed: index % 3 === 0,
  category: ['Shopping', 'Entertainment', 'Food & Drink', 'Digital'][index % 4],
  icon: ['gift', 'musical-notes', 'tv', 'cafe', 'phone-portrait', 'restaurant'][index % 6],
  color: ['#FF9500', '#1DB954', '#E50914', '#00704A', '#4285F4', '#000000'][index % 6],
  expiryDate: `2025-12-${String(10 + index).padStart(2, '0')}`,
}));

export default function RewardsScreen() {
  const [headerOpacity] = useState(new Animated.Value(0));
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    Animated.timing(headerOpacity, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const totalRewards = userRewards.length;
  const availableRewards = userRewards.filter(r => !r.redeemed).length;
  const redeemedRewards = userRewards.filter(r => r.redeemed).length;

  const filteredRewards = userRewards.filter(reward => {
    if (filter === 'available') return !reward.redeemed;
    if (filter === 'redeemed') return reward.redeemed;
    return true;
  });

  const renderItem = ({ item, index }) => (
    <RewardCard item={item} index={index} />
  );

  return (
    <SafeAreaView style={screenStyles.container}>
      <StatusBar style="light" />

      {/* Floating icons */}
      {[0, 1, 2, 3, 4].map(index => (
        <FloatRewardIcon key={index} index={index} />
      ))}

      {/* Header */}
      <Animated.View style={[screenStyles.header, { opacity: headerOpacity }]}>
        <LinearGradient
          colors={['#007BFF', '#0056D6']}
          style={screenStyles.headerGradient}
        >
          <View style={screenStyles.headerContent}>
            <TouchableOpacity style={screenStyles.backButton}>
              <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <View style={screenStyles.headerTextContainer}>
              <Text style={screenStyles.headerTitle}>Your Rewards</Text>
              <Text style={screenStyles.headerSubtitle}>Claim your amazing prizes</Text>
            </View>
            <TouchableOpacity style={screenStyles.filterButton}>
              <Ionicons name="filter" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </Animated.View>

      {/* Filter Tabs */}
      <FilterTabs
        filter={filter}
        setFilter={setFilter}
        stats={{
          total: totalRewards,
          available: availableRewards,
          redeemed: redeemedRewards,
        }}
      />

      {/* Reward List */}
      <FlatList
        data={filteredRewards}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={listStyles.listContainer}
        ItemSeparatorComponent={() => <View style={listStyles.separator} />}
      />
    </SafeAreaView>
  );
}
