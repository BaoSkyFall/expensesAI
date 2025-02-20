import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Searchbar, SegmentedButtons } from 'react-native-paper';
import { ExpenseList } from '../../components/expenses/ExpenseList';
import { AddExpenseButton } from '../../components/expenses/AddExpenseButton';
import { CategoryFilter } from '../../components/expenses/CategoryFilter';
import { useExpenses } from '../../hooks/useExpenses';
import { useFamilies } from '../../hooks/useFamilies';
import { FamilySelector } from '../../components/families/FamilySelector';

export default function ExpensesScreen() {
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
    <View style={styles.container}>
      <View style={styles.header}>
        <FamilySelector
          value={selectedFamilyId}
          onChange={setSelectedFamilyId}
          families={families}
          style={styles.familySelector}
        />
        <Searchbar
          placeholder="Search expenses"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
        />
        <SegmentedButtons
          value={timeFilter}
          onValueChange={setTimeFilter}
          buttons={[
            { value: 'week', label: 'Week' },
            { value: 'month', label: 'Month' },
            { value: 'year', label: 'Year' },
          ]}
          style={styles.segmentedButtons}
        />
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </View>
      <ExpenseList
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
        timeFilter={timeFilter}
        onRefresh={handleRefresh}
        familyId={selectedFamilyId}
      />
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
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
  },
  familySelector: {
    marginBottom: 16,
  },
  searchBar: {
    marginBottom: 16,
  },
  segmentedButtons: {
    marginBottom: 16,
  },
}); 