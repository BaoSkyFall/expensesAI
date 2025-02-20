import React from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { List, Text, useTheme, Card, Divider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { EXPENSE_CATEGORIES } from '../../constants/categories';
import { useExpenses } from '../../hooks/useExpenses';
import { formatCurrency } from '../../utils/currency';

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
  familyId: string | null;
  onRefresh: () => void;
};

export function ExpenseList({ selectedCategory, searchQuery, timeFilter, onRefresh, familyId }: ExpenseListProps) {
  const theme = useTheme();
  const { expenses, loading } = useExpenses(familyId);

  const filteredExpenses = expenses.filter((expense) => {
    const matchesCategory = !selectedCategory || expense.category_id === selectedCategory;
    const matchesSearch = !searchQuery || 
      expense?.description?.toLowerCase()?.includes(searchQuery.toLowerCase());
    
    if (timeFilter === 'week') {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return matchesCategory && matchesSearch && new Date(expense.created_at) >= weekAgo;
    }
    
    if (timeFilter === 'month') {
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      return matchesCategory && matchesSearch && new Date(expense.created_at) >= monthAgo;
    }
    
    if (timeFilter === 'year') {
      const yearAgo = new Date();
      yearAgo.setFullYear(yearAgo.getFullYear() - 1);
      return matchesCategory && matchesSearch && new Date(expense.created_at) >= yearAgo;
    }
    
    return matchesCategory && matchesSearch;
  });

  const getCategory = (categoryId: string) => {
    return EXPENSE_CATEGORIES.find(cat => cat.id === categoryId);
  };

  const renderExpenseItem = ({ item }) => {
    const category = item.expense_categories;
    
    return (
      <>
        <List.Item
          title={item.description}
          description={`${category?.name} • ${new Date(item.created_at).toLocaleDateString()}`}
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
              -{formatCurrency(item.amount)}
            </Text>
          )}
        />
        <Divider />
      </>
    );
  };

  if (loading) {
    return (
      <Card style={styles.card}>
        <ActivityIndicator style={styles.loading} />
      </Card>
    );
  }

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
  loading: {
    marginTop: 16,
  },
}); 