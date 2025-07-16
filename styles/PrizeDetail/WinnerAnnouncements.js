import { StyleSheet, Platform } from 'react-native';

export const winnerStyles = StyleSheet.create({
  announcementSection: {
    marginBottom: 100,
  },
  announcementCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
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
  announcementContent: {
    flex: 1,
    marginLeft: 15,
  },
  announcementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1C1C1C',
    marginBottom: 4,
  },
  announcementDate: {
    fontSize: 14,
    color: '#007BFF',
    fontWeight: '600',
    marginBottom: 6,
  },
  announcementNote: {
    fontSize: 12,
    color: '#6C757D',
  },
});
