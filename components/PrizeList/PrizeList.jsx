import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PrizeCard from './PrizeCard';
import styles from '../../styles/PrizeList/PrizeListStyles';

// You can move mock data here or pass via props
const PrizesList = ({ prizes }) => {
  return (
    <View style={styles.prizesSection}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Featured Prizes</Text>
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>View All</Text>
          <Ionicons name="chevron-forward" size={16} color="#007BFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.prizesGrid}>
        {prizes.map((prize, index) => (
          <PrizeCard key={prize.id} prize={prize} index={index} />
        ))}
      </View>
    </View>
  );
};

export default PrizesList;
