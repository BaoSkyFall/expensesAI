import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WalletHeader } from '../../components/wallet/WalletHeader';
import { TransactionList } from '../../components/wallet/TransactionList';
import { AddMoneyButton } from '../../components/wallet/AddMoneyButton';

export default function WalletScreen() {
  return (
    <View style={styles.container}>
      <WalletHeader />
      <TransactionList />
      <AddMoneyButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
}); 