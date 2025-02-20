import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { formatCurrency } from '../../utils/currency';

type WalletHeaderProps = {
  balance?: number;
  totalIncome?: number;
  totalExpenses?: number;
};

export function WalletHeader({ balance = 0, totalIncome = 0, totalExpenses = 0 }: WalletHeaderProps) {
  const theme = useTheme();

  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.balanceContainer}>
          <Text variant="titleMedium" style={styles.label}>Total Balance</Text>
          <Text 
            variant="headlineMedium" 
            style={[styles.balance, { color: theme.colors.primary }]}
          >
            {formatCurrency(balance)}
          </Text>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <MaterialCommunityIcons
              name="arrow-up-circle"
              size={24}
              color={theme.colors.primary}
            />
            <View style={styles.statText}>
              <Text variant="labelMedium">Income</Text>
              <Text variant="titleMedium" style={{ color: theme.colors.primary }}>
                +{formatCurrency(totalIncome)}
              </Text>
            </View>
          </View>
          <View style={styles.statItem}>
            <MaterialCommunityIcons
              name="arrow-down-circle"
              size={24}
              color={theme.colors.error}
            />
            <View style={styles.statText}>
              <Text variant="labelMedium">Expenses</Text>
              <Text variant="titleMedium" style={{ color: theme.colors.error }}>
                -{formatCurrency(totalExpenses)}
              </Text>
            </View>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 16,
  },
  balanceContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  label: {
    marginBottom: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    marginLeft: 8,
  },
  balance: {
    fontSize: 24,
    fontWeight: 'bold',
  },
}); 