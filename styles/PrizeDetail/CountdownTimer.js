import { StyleSheet, Platform } from 'react-native';

export const countdownStyles = StyleSheet.create({
  countdownContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 25,
    alignItems: 'center',
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
  countdownTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1C1C1C',
    marginBottom: 15,
  },
  countdownGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  timeUnit: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    paddingVertical: 12,
    marginHorizontal: 4,
    borderRadius: 8,
  },
  timeValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  timeLabel: {
    fontSize: 12,
    color: '#6C757D',
    marginTop: 4,
  },
});
