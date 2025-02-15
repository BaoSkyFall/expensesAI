import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, List, Text, useTheme, Searchbar, Menu, Button, Chip, Divider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Expense = {
  id: string;
  amount: number;
  category: string;
  date: string;
  member: string;
};

type FamilyExpenseListProps = {
  expenses: Expense[];
};

type SortOption = 'date' | 'amount' | 'category' | 'member';
type GroupOption = 'none' | 'date' | 'category' | 'member';

export function FamilyExpenseList({ expenses }: FamilyExpenseListProps) {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('date');
  const [groupBy, setGroupBy] = useState<GroupOption>('none');
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showGroupMenu, setShowGroupMenu] = useState(false);

  const filteredExpenses = expenses
    .filter(expense => {
      const searchLower = searchQuery.toLowerCase();
      return (
        expense.category.toLowerCase().includes(searchLower) ||
        expense.member.toLowerCase().includes(searchLower) ||
        expense.amount.toString().includes(searchLower)
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'amount':
          return b.amount - a.amount;
        case 'category':
          return a.category.localeCompare(b.category);
        case 'member':
          return a.member.localeCompare(b.member);
        default:
          return 0;
      }
    });

  const groupedExpenses = groupBy === 'none' ? { 'All Expenses': filteredExpenses } : 
    filteredExpenses.reduce((groups, expense) => {
      const key = groupBy === 'date' 
        ? new Date(expense.date).toLocaleDateString()
        : expense[groupBy];
      return {
        ...groups,
        [key]: [...(groups[key] || []), expense],
      };
    }, {} as Record<string, Expense[]>);

  const totalAmount = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.header}>
          <Text variant="titleMedium">Recent Expenses</Text>
          <Text variant="titleMedium" style={{ color: theme.colors.error }}>
            Total: ${totalAmount}
          </Text>
        </View>

        <View style={styles.filters}>
          <Searchbar
            placeholder="Search expenses"
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchBar}
          />
          
          <View style={styles.filterActions}>
            <Menu
              visible={showSortMenu}
              onDismiss={() => setShowSortMenu(false)}
              anchor={
                <Button
                  mode="outlined"
                  onPress={() => setShowSortMenu(true)}
                  icon="sort"
                  compact
                >
                  Sort: {sortBy}
                </Button>
              }
            >
              <Menu.Item 
                onPress={() => { setSortBy('date'); setShowSortMenu(false); }}
                title="Date"
                leadingIcon="calendar"
              />
              <Menu.Item 
                onPress={() => { setSortBy('amount'); setShowSortMenu(false); }}
                title="Amount"
                leadingIcon="currency-usd"
              />
              <Menu.Item 
                onPress={() => { setSortBy('category'); setShowSortMenu(false); }}
                title="Category"
                leadingIcon="tag"
              />
              <Menu.Item 
                onPress={() => { setSortBy('member'); setShowSortMenu(false); }}
                title="Member"
                leadingIcon="account"
              />
            </Menu>

            <Menu
              visible={showGroupMenu}
              onDismiss={() => setShowGroupMenu(false)}
              anchor={
                <Button
                  mode="outlined"
                  onPress={() => setShowGroupMenu(true)}
                  icon="group"
                  compact
                >
                  Group: {groupBy}
                </Button>
              }
            >
              <Menu.Item 
                onPress={() => { setGroupBy('none'); setShowGroupMenu(false); }}
                title="None"
                leadingIcon="format-list-bulleted"
              />
              <Menu.Item 
                onPress={() => { setGroupBy('date'); setShowGroupMenu(false); }}
                title="Date"
                leadingIcon="calendar"
              />
              <Menu.Item 
                onPress={() => { setGroupBy('category'); setShowGroupMenu(false); }}
                title="Category"
                leadingIcon="tag"
              />
              <Menu.Item 
                onPress={() => { setGroupBy('member'); setShowGroupMenu(false); }}
                title="Member"
                leadingIcon="account"
              />
            </Menu>
          </View>
        </View>

        {Object.entries(groupedExpenses).map(([group, groupExpenses]) => (
          <View key={group}>
            {groupBy !== 'none' && (
              <>
                <Text variant="titleSmall" style={styles.groupHeader}>{group}</Text>
                <Divider style={styles.divider} />
              </>
            )}
            
            {groupExpenses.map((expense) => (
              <List.Item
                key={expense.id}
                title={`$${expense.amount} - ${expense.category}`}
                description={`${expense.date} • ${expense.member}`}
                left={(props) => (
                  <MaterialCommunityIcons
                    {...props}
                    name="currency-usd"
                    size={24}
                    color={theme.colors.primary}
                  />
                )}
                right={() => (
                  <Text
                    variant="titleMedium"
                    style={{ color: theme.colors.error }}
                  >
                    -${expense.amount}
                  </Text>
                )}
              />
            ))}
          </View>
        ))}

        {filteredExpenses.length === 0 && (
          <View style={styles.emptyState}>
            <MaterialCommunityIcons name="cash-remove" size={48} color="#666" />
            <Text variant="bodyLarge">No expenses found</Text>
          </View>
        )}
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 16,
    marginBottom: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  filters: {
    marginBottom: 16,
  },
  searchBar: {
    marginBottom: 8,
  },
  filterActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  groupHeader: {
    marginTop: 16,
    marginBottom: 8,
    paddingLeft: 8,
  },
  divider: {
    marginBottom: 8,
  },
  emptyState: {
    alignItems: 'center',
    padding: 24,
    gap: 8,
  },
}); 