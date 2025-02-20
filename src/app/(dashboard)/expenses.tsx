import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme, SegmentedButtons } from 'react-native-paper';
import { ExpenseList } from '../../components/expenses/ExpenseList';
import { AddExpenseButton } from '../../components/expenses/AddExpenseButton';
import { CategoryFilter } from '../../components/expenses/CategoryFilter';
import { useExpenses } from '../../hooks/useExpenses';
import { useFamilies } from '../../hooks/useFamilies';
import { Searchbar } from '../../components/common/SearchBar';

export default function ExpensesScreen() {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [timeFilter, setTimeFilter] = useState('week');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedFamilyId, setSelectedFamilyId] = useState<string | null>(null);
  const { families } = useFamilies();
  const { refreshExpenses } = useExpenses(selectedFamilyId);

  const handleRefresh = useCallback(() => {
    refreshExpenses();
  }, [refreshExpenses]);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Family Selector */}
      <View style={styles.familyToggle}>
        <SegmentedButtons
          value={selectedFamilyId ? 'family' : 'personal'}
          onValueChange={(value) => setSelectedFamilyId(value === 'family' ? families[0]?.id : null)}
          buttons={[
            { 
              value: 'personal', 
              label: 'Personal',
              icon: 'account'
            },
            { 
              value: 'family', 
              label: 'Sú Family',
              icon: 'account-group'
            },
          ]}
          style={styles.familySegment}
        />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search expenses"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
        />
      </View>

      {/* Time Filter */}
      <View style={styles.timeFilterContainer}>
        <SegmentedButtons
          value={timeFilter}
          onValueChange={setTimeFilter}
          buttons={[
            { value: 'week', label: 'Week' },
            { value: 'month', label: 'Month' },
            { value: 'year', label: 'Year' },
          ]}
          style={styles.timeFilter}
        />
      </View>

      {/* Category Filter */}
      <CategoryFilter
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Expense List */}
      <ExpenseList
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
        timeFilter={timeFilter}
        onRefresh={handleRefresh}
        familyId={selectedFamilyId}
      />

      {/* Add Button */}
      <AddExpenseButton 
        onSuccess={handleRefresh} 
        familyId={selectedFamilyId}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  familyToggle: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  familySegment: {
    backgroundColor: '#F3F4F6',
    borderRadius: 24,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  searchBar: {
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
  },
  timeFilterContainer: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  timeFilter: {
    backgroundColor: '#F3F4F6',
    borderRadius: 24,
  },
}); 