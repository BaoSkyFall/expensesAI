import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { WalletHeader } from '../../components/wallet/WalletHeader';
import { TransactionList } from '../../components/wallet/TransactionList';
import { AddMoneyModal } from '../../components/wallet/AddMoneyModal';
import { FAB } from 'react-native-paper';
import { useTheme } from 'react-native-paper';

export default function WalletScreen() {
  const theme = useTheme();
  const [showAddMoney, setShowAddMoney] = useState(false);

  const handleAddMoney = (amount: number) => {
    // TODO: Implement adding money logic
    console.log('Adding money:', amount);
    setShowAddMoney(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <WalletHeader />
      <TransactionList />
      <FAB
        icon="plus"
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        onPress={() => setShowAddMoney(true)}
      />
      <AddMoneyModal
        visible={showAddMoney}
        onDismiss={() => setShowAddMoney(false)}
        onSubmit={handleAddMoney}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
}); 