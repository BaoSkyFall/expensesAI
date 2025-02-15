import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Text, Card, useTheme } from 'react-native-paper';
import { useAuth } from '../../hooks/useAuth';
import { ExpenseChart } from '../../components/dashboard/ExpenseChart';
import { RecentExpenses } from '../../components/dashboard/RecentExpenses';
import { WalletSummary } from '../../components/dashboard/WalletSummary';

export default function DashboardScreen() {
  const { user } = useAuth();
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>Overview</Text>
        <Text variant="titleMedium" style={styles.subtitle}>My Household</Text>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <WalletSummary />
        
        <Card style={styles.chartCard}>
          <Card.Content>
            <Text variant="titleMedium">Monthly Expenses</Text>
            <ExpenseChart />
          </Card.Content>
        </Card>

        <RecentExpenses />
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
    backgroundColor: '#f5f5f5',
    zIndex: 1, // Keep header above scroll content
  },
  title: {
    color: '#1a1a1a',
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#666',
    marginTop: 4,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24, // Add padding at bottom for last item
  },
  chartCard: {
    margin: 16,
    marginTop: 8,
  },
}); 