import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Card, List, Text, useTheme, Divider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Transaction = {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: string;
  category?: string;
};

export function TransactionList() {
  const theme = useTheme();

  // Dummy data - replace with real data later
  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'credit',
      amount: 1000,
      description: 'Salary',
      date: '2024-01-15',
    },
    {
      id: '2',
      type: 'debit',
      amount: 50,
      description: 'Grocery shopping',
      date: '2024-01-14',
      category: 'Food',
    },
    {
      id: '3',
      type: 'debit',
      amount: 30,
      description: 'Gas',
      date: '2024-01-13',
      category: 'Transport',
    },
  ];

  const renderTransaction = ({ item }: { item: Transaction }) => (
    <>
      <List.Item
        title={item.description}
        description={item.date}
        left={(props) => (
          <MaterialCommunityIcons
            name={item.type === 'credit' ? 'arrow-up-circle' : 'arrow-down-circle'}
            size={24}
            color={item.type === 'credit' ? theme.colors.primary : theme.colors.error}
            {...props}
          />
        )}
        right={() => (
          <Text
            variant="titleMedium"
            style={{
              color: item.type === 'credit' ? theme.colors.primary : theme.colors.error,
            }}
          >
            {item.type === 'credit' ? '+' : '-'}${item.amount}
          </Text>
        )}
      />
      <Divider />
    </>
  );

  return (
    <Card style={styles.card}>
      <Card.Title title="Recent Transactions" />
      <FlatList
        data={transactions}
        renderItem={renderTransaction}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text variant="bodyLarge">No transactions yet</Text>
          </View>
        )}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 16,
    flex: 1,
  },
  emptyContainer: {
    padding: 16,
    alignItems: 'center',
  },
}); 