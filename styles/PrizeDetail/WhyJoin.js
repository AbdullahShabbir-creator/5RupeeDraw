import { StyleSheet, Platform } from 'react-native';

export const whyJoinStyles = StyleSheet.create({
  featuresSection: {
    marginBottom: 25,
    marginTop:30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1C1C1C',
    marginBottom: 15,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
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
  featureTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1C1C1C',
    marginTop: 8,
    marginBottom: 4,
  },
  featureText: {
    fontSize: 12,
    color: '#6C757D',
    textAlign: 'center',
  },
});
