import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '@/styles/Rewards/FilterTabStyles';

const FilterTabs = ({ filter, setFilter, stats }) => {
  const tabs = [
    { key: 'all', label: 'All Rewards', count: stats.total },
    { key: 'available', label: 'Available', count: stats.available },
    { key: 'redeemed', label: 'Redeemed', count: stats.redeemed },
  ];

  return (
    <View style={styles.filterContainer}>
      <View style={styles.filterTabs}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[
              styles.filterTab,
              filter === tab.key && styles.activeFilterTab,
            ]}
            onPress={() => setFilter(tab.key)}
          >
            <Text
              style={[
                styles.filterTabText,
                filter === tab.key && styles.activeFilterTabText,
              ]}
            >
              {tab.label} ({tab.count})
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default FilterTabs;
