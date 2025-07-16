import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  prizeCard: {
    width: '48%',
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  cardContent: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  imageContainer: {
    position: 'relative',
    height: 140,
  },
  prizeImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F8F9FA',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
  },
  prizeInfo: {
    padding: 15,
  },
  prizeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1C1C1C',
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  originalPrice: {
    fontSize: 14,
    color: '#6C757D',
    textDecorationLine: 'line-through',
  },
  onlyOne: {
    backgroundColor: '#FFE4E6',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  onlyOneText: {
    color: '#FF4C4C',
    fontSize: 12,
    fontWeight: 'bold',
  },
  participantsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  participantsCount: {
    fontSize: 12,
    color: '#6C757D',
    marginLeft: 4,
  },
  buyButton: {
    margin: 15,
    marginTop: 0,
    borderRadius: 25,
    overflow: 'hidden',
  },
  buyButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  buyButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 6,
  },
});
