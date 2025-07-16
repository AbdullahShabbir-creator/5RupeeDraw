import { StyleSheet, Platform, StatusBar } from 'react-native';

const STATUSBAR_HEIGHT = Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 44;

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  backgroundPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1C1C1C',
    marginBottom: 15,
    paddingHorizontal: 20,
    paddingTop: STATUSBAR_HEIGHT,
  },
  transactionsContainer: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  transactionsList: {
    marginTop: 10,
  },
  bottomSpacing: {
    height: 80,
  },
});
