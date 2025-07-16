import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  howItWorksSection: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 16,
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
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1C1C1C',
  },
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  step: {
    flex: 1,
    alignItems: 'center',
  },
  stepNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  stepNumberText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  stepTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1C1C1C',
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 12,
    color: '#6C757D',
    textAlign: 'center',
  },
});
