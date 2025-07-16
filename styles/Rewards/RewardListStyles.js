import { Platform, StyleSheet } from 'react-native';

export default StyleSheet.create({
  rewardCard: {
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
  categoryBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    zIndex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  statusIndicator: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 2,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  cardBody: {
    flexDirection: 'row',
    padding: 16,
  },
  imageContainer: {
    position: 'relative',
    width: 80,
    height: 80,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 16,
  },
  rewardImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F8F9FA',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  redeemedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rewardDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  rewardName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1C1C1C',
    marginBottom: 4,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  rewardValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007BFF',
    marginRight: 6,
  },
  coinIcon: {
    padding: 2,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  rewardDate: {
    fontSize: 12,
    color: '#6C757D',
    marginLeft: 4,
  },
  expiryRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  expiryDate: {
    fontSize: 12,
    color: '#FF4C4C',
    marginLeft: 4,
  },
  floatingIcon: {
  position: 'absolute',
  top: 0,
  zIndex: -1, // Push behind everything
},

  actionButton: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 25,
    overflow: 'hidden',
  },
  availableButton: {},
  redeemedButton: {
    backgroundColor: '#F8F9FA',
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  availableButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 6,
  },
  redeemedButtonText: {
    color: '#6C757D',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
});
