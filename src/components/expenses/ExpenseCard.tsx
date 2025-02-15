import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { formatCurrency } from '../../utils/currency';

type ExpenseCardProps = {
  amount: number;
};

export function ExpenseCard({ amount }: ExpenseCardProps) {
  const theme = useTheme();

  return (
    <Text 
      variant="titleMedium" 
      style={[styles.amount, { color: theme.colors.primary }]}
    >
      {formatCurrency(amount)}
    </Text>
  );
}

const styles = StyleSheet.create({
  amount: {
    fontWeight: 'bold',
  },
}); 