import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather } from '@expo/vector-icons';

const HeaderBar = ({ onSearch, onNotification }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        {/* Logo */}
        <Image
          
        />

        {/* App Name */}
        <Text style={styles.title}>LuckyDraw</Text>

        {/* Icons */}
        <View style={styles.icons}>
          <TouchableOpacity onPress={onSearch} style={styles.iconBtn}>
            <Feather name="search" size={22} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={onNotification} style={styles.iconBtn}>
            <Ionicons name="notifications-outline" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0B2DA2',
    paddingVertical: 12,
    paddingHorizontal: 16,
    elevation: 5,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    marginRight: 40, // space for right icons
  },
  icons: {
    flexDirection: 'row',
  },
  iconBtn: {
    marginLeft: 12,
  },
});

export default HeaderBar;
