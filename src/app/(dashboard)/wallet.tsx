import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { WalletHeader } from '../../components/wallet/WalletHeader';
import { TransactionList } from '../../components/wallet/TransactionList';
import { AddMoneyModal } from '../../components/wallet/AddMoneyModal';
import { FAB } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import { useWallet } from '../../hooks/useWallet';
import { FamilyWalletSelector } from '../../components/wallet/FamilyWalletSelector';
import { useFamilies } from '../../hooks/useFamilies';

export default function WalletScreen() {
  const theme = useTheme();
  const [showAddMoney, setShowAddMoney] = useState(false);
  const { 
    wallets,
    selectedWallet,
    selectWallet,
    addTransaction 
  } = useWallet();
  const { families } = useFamilies();
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);

  useEffect(() => {
    if (selectedWallet) {
      setTotalIncome(selectedWallet.wallet_transactions
        .filter(t => t.type === 'credit')
        .reduce((sum, t) => sum + t.amount, 0));
      
      setTotalExpenses(selectedWallet.wallet_transactions
        .filter(t => t.type === 'debit')
        .reduce((sum, t) => sum + t.amount, 0));
    }
  }, [selectedWallet?.balance]);

  const handleAddMoney = async (amount: number, familyId?: string) => {
    try {
      await addTransaction(amount, 'credit', 'Manual top-up', familyId);
      setShowAddMoney(false);
    } catch (err) {
      console.error('Failed to add money:', err);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FamilyWalletSelector
        wallets={wallets}
        selectedWallet={selectedWallet}
        onSelect={selectWallet}
      />

      {selectedWallet && (
        <>
          <WalletHeader 
            balance={selectedWallet.balance}
            totalIncome={totalIncome}
            totalExpenses={totalExpenses}
          />
          <TransactionList transactions={selectedWallet.wallet_transactions} />
        </>
      )}
      
      <FAB
        icon="plus"
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        onPress={() => setShowAddMoney(true)}
      />
      <AddMoneyModal
        visible={showAddMoney}
        onDismiss={() => setShowAddMoney(false)}
        onSubmit={handleAddMoney}
        families={families}
        wallets={wallets}
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