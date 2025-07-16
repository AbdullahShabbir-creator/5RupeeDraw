import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    position: 'absolute',
    width: '100%',
    zIndex: 10,
  },
  headerGradient: {
    paddingTop: 50,
    paddingBottom: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 8,
  },
  shareButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  content: {
    paddingTop: 120,
  },
  heroSection: {
    marginTop: -20, // adjust this value to match header height
  zIndex: -1, 
  },
  participantsBadgeContainer: {
    alignItems: 'center',
    marginVertical: 8,
  },
  productSection: {
    marginTop:10,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  productName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#212529',
  },
  productMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#6C757D',
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verifiedText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#00A650',
  },
  specsSection: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#343A40',
    marginBottom: 10,
  },
 specsContainer: {
  flexDirection: 'column', // 👈 stack vertically instead of row
  gap: 10, // optional spacing if using React Native >= 0.71
},

  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  footerGradient: {
    paddingTop: 8,
    paddingBottom: 14,
    paddingHorizontal: 16,
  },
  footerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceDisplay: {
    flexDirection: 'column',
  },
  footerPriceLabel: {
    fontSize: 12,
    color: '#6C757D',
  },
  footerPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00A650',
  },
  buyButton: {
    borderRadius: 50,
    overflow: 'hidden',
  },
  buyButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  buyButtonText: {
    marginLeft: 8,
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  refundNote: {
    marginTop: 6,
    fontSize: 12,
    color: '#6C757D',
    textAlign: 'center',
  },
});
