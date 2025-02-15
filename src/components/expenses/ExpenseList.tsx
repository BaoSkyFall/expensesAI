import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { List, Text, useTheme, Card, Divider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { EXPENSE_CATEGORIES } from '../../constants/categories';

type Expense = {
  id: number;
  amount: number;
  description: string;
  categoryId: string;
  date: string;
};

type ExpenseListProps = {
  selectedCategory: string | null;
  searchQuery: string;
  timeFilter: string;
};

export function ExpenseList({ selectedCategory, searchQuery, timeFilter }: ExpenseListProps) {
  const theme = useTheme();

  // Dummy data - replace with real data later
  const expenses: Expense[] = [
    {
      id: 1,
      amount: 50,
      description: 'Grocery shopping',
      categoryId: '1', // Food
      date: '2024-01-15',
    },
    {
      id: 2,
      amount: 30,
      description: 'Gas',
      categoryId: '3', // Transport
      date: '2024-01-14',
    },
    {
      id: 3,
      amount: 100,
      description: 'New shoes',
      categoryId: '2', // Shopping
      date: '2024-01-13',
    },
  ];

  const filteredExpenses = expenses.filter((expense) => {
    const matchesCategory = !selectedCategory || expense.categoryId === selectedCategory;
    const matchesSearch = !searchQuery || 
      expense.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategory = (categoryId: string) => {
    return EXPENSE_CATEGORIES.find(cat => cat.id === categoryId);
  };

  const renderExpenseItem = ({ item }: { item: Expense }) => {
    const category = getCategory(item.categoryId);
    
    return (
      <>
        <List.Item
          title={item.description}
          description={`${category?.name} • ${item.date}`}
          left={(props) => (
            <MaterialCommunityIcons
              name={category?.icon || 'help-circle'}
              size={24}
              color={category?.color || theme.colors.primary}
              {...props}
            />
          )}
          right={() => (
            <Text variant="titleMedium" style={{ color: theme.colors.error }}>
              -${item.amount}
            </Text>
          )}
        />
        <Divider />
      </>
    );
  };

  return (
    <Card style={styles.card}>
      <FlatList
        data={filteredExpenses}
        renderItem={renderExpenseItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text variant="bodyLarge">No expenses found</Text>
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