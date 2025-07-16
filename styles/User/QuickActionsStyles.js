import { StyleSheet } from 'react-native';

export const quickActionsStyles = StyleSheet.create({
  quickActionsContainer: {
    margin: 20,
  },
  quickActionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1C1C1C',
    marginBottom: 16,
  },
  quickActionsList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionItem: {
    alignItems: 'center',
    flex: 1,
  },
  quickActionIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 12,
    color: '#1C1C1C',
    fontWeight: '600',
  },
});
