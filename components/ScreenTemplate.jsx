// components/ScreenTemplate.js
import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import HeaderBar from './HeaderBar';

const ScreenTemplate = ({ children, onSearch, onNotification }) => {
  return (
    <View style={styles.container}>
      <HeaderBar
        onSearch={onSearch || (() => {})}
        onNotification={onNotification || (() => {})}
      />
      <ScrollView contentContainerStyle={styles.scroll}>{children}</ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f4f9' },
  scroll: { padding: 16, paddingBottom: 40 },
});

export default ScreenTemplate;
