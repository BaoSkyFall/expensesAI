import { View, StyleSheet } from 'react-native';
import { Card, Text, List, useTheme } from 'react-native-paper';

export function RecentExpenses() {
  const theme = useTheme();

  // Dummy data - replace with real data later
  const recentExpenses = [
    { id: 1, category: 'Shopping', amount: 120, date: '2024-01-15' },
    { id: 2, category: 'Food', amount: 45, date: '2024-01-14' },
    { id: 3, category: 'Transport', amount: 30, date: '2024-01-14' },
  ];

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleMedium" style={styles.title}>Recent Expenses</Text>
        {recentExpenses.map((expense) => (
          <List.Item
            key={expense.id}
            title={expense.category}
            description={expense.date}
            right={() => (
              <Text variant="titleMedium" style={{ color: theme.colors.error }}>
                -${expense.amount}
              </Text>
            )}
          />
        ))}
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 16,
    marginTop: 8,
  },
  title: {
    marginBottom: 8,
  },
}); 