import { StyleSheet, Platform } from 'react-native';

export const pulseStyles = StyleSheet.create({
  participantsBadge: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minWidth: 200,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  participantsContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  participantsText: {
    marginLeft: 6,
    color: '#00A650',
    fontWeight: '600',
    fontSize: 14,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FF4C4C',
    marginRight: 4,
  },
  liveText: {
    color: '#FF4C4C',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
