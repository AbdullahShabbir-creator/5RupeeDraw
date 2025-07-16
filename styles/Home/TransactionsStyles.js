import { StyleSheet, Platform } from 'react-native';

export const transactionStyles = StyleSheet.create({
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
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    color: '#007BFF',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 4,
  },
  transactionsList: {
    marginTop: 10,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    justifyContent: 'space-between',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  transactionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionName: {
    color: '#1C1C1C',
    fontSize: 16,
    fontWeight: '600',
  },
  transactionDescription: {
    color: '#6C757D',
    fontSize: 12,
    marginTop: 2,
  },
  transactionDate: {
    color: '#6C757D',
    fontSize: 11,
    marginTop: 4,
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  positiveAmount: {
    color: '#00A650',
  },
  negativeAmount: {
    color: '#FF4C4C',
  },
  transactionBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  transactionBadgeText: {
    fontSize: 10,
    fontWeight: '600',
  },
});
