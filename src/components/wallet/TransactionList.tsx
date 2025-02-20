import React from 'react';
import { FlatList, StyleSheet, View, ActivityIndicator } from 'react-native';
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

type TransactionListProps = {
  transactions?: Array<{
    id: string;
    type: 'credit' | 'debit';
    amount: number;
    description: string;
    created_at: string;
    expenses?: Array<{
      category_id: string;
      expense_categories: {
        name: string;
        icon: string;
      }
    }>;
  }>;
  loading?: boolean;
};

export function TransactionList({ transactions = [], loading }: TransactionListProps) {
  const theme = useTheme();

  const renderTransaction = ({ item }: { item: TransactionListProps['transactions'][0] }) => (
    <>
      <List.Item
        title={item.description}
        description={item.expenses?.[0]?.expense_categories?.name || new Date(item.created_at).toLocaleDateString()}
        left={(props) => (
          <MaterialCommunityIcons
            name={item.expenses?.[0]?.expense_categories?.icon || 
                 (item.type === 'credit' ? 'arrow-up-circle' : 'arrow-down-circle')}
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
            {item.type === 'credit' ? '+' : '-'}${item.amount.toFixed(2)}
          </Text>
        )}
      />
      <Divider />
    </>
  );

  return (
    <Card style={styles.card}>
      <Card.Title title="Recent Transactions" />
      {loading ? (
        <View style={styles.emptyContainer}>
          <ActivityIndicator animating={true} />
        </View>
      ) : (
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
      )}
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