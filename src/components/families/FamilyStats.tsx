import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, ProgressBar, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type FamilyStatsProps = {
  totalExpenses: number;
  monthlyBudget: number;
  membersCount: number;
};

export function FamilyStats({ totalExpenses, monthlyBudget, membersCount }: FamilyStatsProps) {
  const theme = useTheme();
  const budgetProgress = Math.min(totalExpenses / monthlyBudget, 1);
  const remaining = monthlyBudget - totalExpenses;

  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.monthSelector}>
          <MaterialCommunityIcons name="chevron-left" size={24} color={theme.colors.primary} />
          <Text variant="titleLarge">January 2024</Text>
          <MaterialCommunityIcons name="chevron-right" size={24} color={theme.colors.primary} />
        </View>

        <Text variant="bodyMedium" style={styles.transactionCount}>
          {membersCount} TRANSACTIONS
        </Text>

        <View style={styles.barChart}>
          <View style={styles.bar}>
            <View style={[styles.barFill, { height: 120, backgroundColor: theme.colors.primary }]} />
            <Text style={styles.barLabel}>${monthlyBudget}</Text>
            <Text style={styles.barCaption}>BUDGET</Text>
          </View>
          
          <View style={styles.bar}>
            <View style={[styles.barFill, { height: 120 * (totalExpenses/monthlyBudget), backgroundColor: theme.colors.error }]} />
            <Text style={styles.barLabel}>${totalExpenses}</Text>
            <Text style={styles.barCaption}>EXPENSES</Text>
          </View>
          
          <View style={styles.bar}>
            <View style={[styles.barFill, { height: 120 * (remaining/monthlyBudget), backgroundColor: theme.colors.tertiary }]} />
            <Text style={styles.barLabel}>${remaining}</Text>
            <Text style={styles.barCaption}>LEFT</Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 16,
    marginBottom: 8,
    backgroundColor: '#fff',
  },
  monthSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  transactionCount: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 24,
  },
  barChart: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 180,
    alignItems: 'flex-end',
  },
  bar: {
    alignItems: 'center',
    width: 80,
  },
  barFill: {
    width: 40,
    borderRadius: 20,
    marginBottom: 8,
  },
  barLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  barCaption: {
    fontSize: 12,
    color: '#666',
  },
}); 