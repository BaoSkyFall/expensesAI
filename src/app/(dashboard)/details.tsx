import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Text, useTheme } from 'react-native-paper';
import { FamilyStats } from '../../components/families/FamilyStats';
import { FamilyExpenseChart } from '../../components/families/FamilyExpenseChart';
import { FamilyMembersList } from '../../components/families/FamilyMembersList';
import { FamilyExpenseList } from '../../components/families/FamilyExpenseList';

export default function FamilyDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const theme = useTheme();

  // TODO: Fetch family details from API
  const familyDetails = {
    id,
    name: 'Smith Family',
    totalExpenses: 1250,
    members: [
      { id: '1', name: 'John Smith', role: 'admin', email: 'john@example.com', status: 'active' },
      { id: '2', name: 'Jane Smith', role: 'member', email: 'jane@example.com', status: 'active' },
    ],
    monthlyBudget: 2000,
    expenses: [
      { id: '1', amount: 50, category: 'Food', date: '2024-01-15', member: 'John Smith' },
      { id: '2', amount: 30, category: 'Transport', date: '2024-01-14', member: 'Jane Smith' },
    ],
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.surface }]}>
        <Text variant="headlineMedium" style={styles.title}>{familyDetails.name}</Text>
        <Text variant="bodyLarge" style={{ color: theme.colors.error }}>
          Total Expenses: ${familyDetails.totalExpenses}
        </Text>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <FamilyStats
          totalExpenses={familyDetails.totalExpenses}
          monthlyBudget={familyDetails.monthlyBudget}
          membersCount={familyDetails.members.length}
        />

        <FamilyExpenseChart familyId={id} />
        
        <FamilyMembersList members={familyDetails.members} />
        
        <FamilyExpenseList expenses={familyDetails.expenses} />
      </ScrollView>
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
    paddingTop: 8,
    backgroundColor: '#fff',
    marginBottom: 8,
    zIndex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  title: {
    color: '#1a1a1a',
    fontWeight: 'bold',
  },
}); 