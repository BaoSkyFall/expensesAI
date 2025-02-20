import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Text, useTheme, Card, Avatar } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { formatCurrency } from '../../utils/currency';

type Transaction = {
  id: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
  description: string;
};

type TransactionListProps = {
  transactions: Transaction[];
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
};

export function TransactionList({ transactions, onDelete, onEdit }: TransactionListProps) {
  const theme = useTheme();

  const renderRightActions = (id: string) => {
    return (
      <View style={styles.swipeActions}>
        <Pressable 
          style={[styles.swipeAction, { backgroundColor: theme.colors.primary }]}
          onPress={() => onEdit?.(id)}
        >
          <MaterialCommunityIcons name="pencil" size={24} color="white" />
        </Pressable>
        <Pressable 
          style={[styles.swipeAction, { backgroundColor: theme.colors.error }]}
          onPress={() => onDelete?.(id)}
        >
          <MaterialCommunityIcons name="trash-can" size={24} color="white" />
        </Pressable>
      </View>
    );
  };

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      food: 'food',
      transport: 'car',
      shopping: 'shopping',
      bills: 'file-document',
      default: 'currency-usd',
    };
    return icons[category?.toLowerCase()] || icons.default;
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {transactions.map((transaction) => (
        <Card 
          key={transaction.id}
          style={[styles.card, { backgroundColor: theme.colors.surface }]}
          mode="outlined"
        >
          <Swipeable
            renderRightActions={() => renderRightActions(transaction.id)}
          >
            <View style={styles.transaction}>
              <Avatar.Icon
                size={40}
                icon={getCategoryIcon(transaction.category)}
                style={{
                  backgroundColor: transaction.type === 'income' 
                    ? theme.colors.primary 
                    : theme.colors.error
                }}
              />
              <View style={styles.details}>
                <Text variant="bodyLarge">{transaction.description}</Text>
                <Text variant="bodySmall" style={{ color: theme.colors.outline }}>
                  {transaction.category} • {transaction.date}
                </Text>
              </View>
              <Text
                variant="titleMedium"
                style={{
                  color: transaction.type === 'income' 
                    ? theme.colors.primary 
                    : theme.colors.error
                }}
              >
                {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
              </Text>
            </View>
          </Swipeable>
        </Card>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    margin: 16,
    marginBottom: 8,
  },
  transaction: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: 'white',
  },
  details: {
    flex: 1,
    marginLeft: 12,
  },
  swipeActions: {
    flexDirection: 'row',
  },
  swipeAction: {
    width: 64,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 