import React from 'react';
import { View, Text } from 'react-native';
import styles from '../../styles/PrizeList/HowItWorksStyles';

const HowItWorksSection = () => {
  return (
    <View style={styles.howItWorksSection}>
      <Text style={styles.sectionTitle}>How It Works</Text>
      <View style={styles.stepsContainer}>
        <View style={styles.step}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>1</Text>
          </View>
          <Text style={styles.stepTitle}>Choose Prize</Text>
          <Text style={styles.stepDescription}>Select Prize</Text>
        </View>
        <View style={styles.step}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>2</Text>
          </View>
          <Text style={styles.stepTitle}>Pay ₹1</Text>
          <Text style={styles.stepDescription}>Make Payment</Text>
        </View>
        <View style={styles.step}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>3</Text>
          </View>
          <Text style={styles.stepTitle}>Win Big</Text>
          <Text style={styles.stepDescription}>Wait&Win</Text>
        </View>
      </View>
    </View>
  );
};

export default HowItWorksSection;
