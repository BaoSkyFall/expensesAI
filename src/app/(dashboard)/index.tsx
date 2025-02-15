import { ScrollView, View, StyleSheet } from 'react-native';
import { Text, Card, useTheme, Button } from 'react-native-paper';
import { useAuth } from '../../hooks/useAuth';
import { ExpenseChart } from '../../components/dashboard/ExpenseChart';
import { RecentExpenses } from '../../components/dashboard/RecentExpenses';
import { WalletSummary } from '../../components/dashboard/WalletSummary';

export default function DashboardScreen() {
  const { user } = useAuth();
  const theme = useTheme();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineSmall">Welcome back, {user?.user_metadata?.full_name}</Text>
      </View>

      <WalletSummary />
      
      <Card style={styles.chartCard}>
        <Card.Content>
          <Text variant="titleMedium">Monthly Expenses</Text>
          <ExpenseChart />
        </Card.Content>
      </Card>

      <RecentExpenses />
    </ScrollView>
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
    marginBottom: 8,
  },
  chartCard: {
    margin: 16,
    marginTop: 8,
  },
}); 