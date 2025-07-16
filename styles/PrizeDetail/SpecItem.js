// styles/PrizeDetail/SpecItem.js

import { StyleSheet, Platform } from 'react-native';

export const specItemStyles = StyleSheet.create({
  specItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F8F9FA',
    backgroundColor: '#FFFFFF',
  },
  specIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  specContent: {
    flex: 1,
  },
  specLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1C1C',
    marginBottom: 4,
  },
  specValue: {
    fontSize: 13,
    color: '#6C757D',
    lineHeight: 18,
  },
});
