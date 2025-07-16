import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  filterContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  filterTabs: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: 4,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  filterTab: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignItems: 'center',
  },
  activeFilterTab: {
    backgroundColor: '#007BFF',
  },
  filterTabText: {
    fontSize: 12,
    color: '#6C757D',
    fontWeight: '600',
  },
  activeFilterTabText: {
    color: '#FFFFFF',
  },
});
