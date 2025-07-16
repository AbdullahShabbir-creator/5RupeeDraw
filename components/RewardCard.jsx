import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const DailyRewardCard = ({ onSettingsPress, onRewardsPress }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>🎁 Your Daily Rewards</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={onSettingsPress}>
          <Text style={styles.buttonText}>Go to Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={onRewardsPress}>
          <Text style={styles.buttonText}>See Rewards</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 20,
    margin: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 15,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#0B2DA2',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default DailyRewardCard;
