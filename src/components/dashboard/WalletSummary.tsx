import { View, StyleSheet } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { formatCurrency } from '../../utils/currency';

export function WalletSummary() {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.headerText}>Your growth this week</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>$2,450</Text>
              <Text style={styles.statLabel}>balance</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: theme.colors.primary }]}>21</Text>
              <Text style={styles.statLabel}>transactions</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: theme.colors.success }]}>15</Text>
              <Text style={styles.statLabel}>savings</Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
  }
}); 