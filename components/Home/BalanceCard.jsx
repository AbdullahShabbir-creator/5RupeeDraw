import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { cardStyles } from '@/styles/Home/CardStyles';

export default function BalanceCard({ showBalance, setShowBalance }) {
  return (
    <TouchableOpacity onPress={() => setShowBalance(!showBalance)} activeOpacity={0.9}>
      <LinearGradient
        colors={['#007BFF', '#0056D6', '#002B5B']}
        style={cardStyles.card}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={cardStyles.cardPattern}>
          <View style={cardStyles.cardCircle1} />
          <View style={cardStyles.cardCircle2} />
          <View style={cardStyles.cardCircle3} />
        </View>
        <View style={cardStyles.cardContent}>
          <View style={cardStyles.cardHeader}>
            <Text style={cardStyles.cardNumber}>0333283938</Text>
            <TouchableOpacity onPress={() => setShowBalance(!showBalance)} style={cardStyles.eyeButton}>
              <Ionicons name={showBalance ? 'eye-off' : 'eye'} size={20} color="rgba(255,255,255,0.8)" />
            </TouchableOpacity>
          </View>
          <View style={cardStyles.cardBalanceSection}>
            <Text style={cardStyles.cardBalanceLabel}>Available Balance</Text>
            <Text style={cardStyles.cardBalance}>Rs {showBalance ? '22,000' : '•••••.••'}</Text>
          </View>
          <View style={cardStyles.cardFooter}>
            <View style={cardStyles.cardOwner}>
              <Text style={cardStyles.cardName}>User Name</Text>
              <Text style={cardStyles.cardExpiry}>Last Deposited On . 02/28</Text>
            </View>
            <View style={cardStyles.cardChip}>
              <LinearGradient
                colors={['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.1)']}
                style={cardStyles.chipGradient}
              >
                <MaterialCommunityIcons name="contactless-payment" size={24} color="white" />
              </LinearGradient>
            </View>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}
