import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Text, useTheme, Card, Avatar } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Swipeable from 'react-native-gesture-handler/Swipeable';

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
    return icons[category.toLowerCase()] || icons.default;
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        {transactions.map((transaction) => (
          <Swipeable
            key={transaction.id}
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
                {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
              </Text>
            </View>
          </Swipeable>
        ))}
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
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