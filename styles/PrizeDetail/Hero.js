import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width } = Dimensions.get('window');

export const heroStyles = StyleSheet.create({
  heroSection: {
    overflow: 'hidden',
  },
  heroGradient: {
    paddingTop: Platform.OS === 'ios' ? 100 : 80,
    paddingBottom: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  heroImageContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  heroImage: {
    width: width * 0.6,
    height: width * 0.6,
    resizeMode: 'contain',
  },
  imageGlow: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: width * 0.4,
    height: width * 0.4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: width * 0.2,
    transform: [
      { translateX: -width * 0.2 },
      { translateY: -width * 0.2 },
    ],
    opacity: 0.3,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  originalPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textDecorationLine: 'line-through',
    marginRight: 15,
  },
  discountBadge: {
    backgroundColor: '#FF4C4C',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
