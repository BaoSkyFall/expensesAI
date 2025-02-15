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

  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.budgetSection}>
          <Text variant="titleMedium">Monthly Budget</Text>
          <View style={styles.budgetProgress}>
            <View style={styles.budgetTexts}>
              <Text variant="bodyMedium">Spent: ${totalExpenses}</Text>
              <Text variant="bodyMedium">Budget: ${monthlyBudget}</Text>
            </View>
            <ProgressBar
              progress={budgetProgress}
              color={budgetProgress > 0.8 ? theme.colors.error : theme.colors.primary}
              style={styles.progressBar}
            />
          </View>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <MaterialCommunityIcons
              name="account-group"
              size={24}
              color={theme.colors.primary}
            />
            <Text variant="titleMedium">{membersCount}</Text>
            <Text variant="bodySmall">Members</Text>
          </View>

          <View style={styles.statItem}>
            <MaterialCommunityIcons
              name="cash-multiple"
              size={24}
              color={theme.colors.primary}
            />
            <Text variant="titleMedium">
              ${Math.round(totalExpenses / membersCount)}
            </Text>
            <Text variant="bodySmall">Per Member</Text>
          </View>

          <View style={styles.statItem}>
            <MaterialCommunityIcons
              name="chart-line"
              size={24}
              color={budgetProgress > 0.8 ? theme.colors.error : theme.colors.primary}
            />
            <Text variant="titleMedium">
              {Math.round(budgetProgress * 100)}%
            </Text>
            <Text variant="bodySmall">Of Budget</Text>
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
  },
  budgetSection: {
    marginBottom: 24,
  },
  budgetProgress: {
    marginTop: 8,
  },
  budgetTexts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
}); 