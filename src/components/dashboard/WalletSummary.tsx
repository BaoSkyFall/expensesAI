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
          <View style={styles.row}>
            <MaterialCommunityIcons 
              name="wallet" 
              size={24} 
              color={theme.colors.primary} 
            />
            <View style={styles.textContainer}>
              <Text variant="titleMedium">Current Balance</Text>
              <Text 
                variant="headlineMedium" 
                style={{ color: theme.colors.primary }}
              >
                {formatCurrency(2450)}
              </Text>
            </View>
          </View>
          <Text variant="bodyMedium" style={styles.label}>
            Monthly Expenses: {formatCurrency(123456)}
          </Text>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 8,
  },
  card: {
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 16,
  },
  label: {
    marginTop: 8,
  },
}); 