import { View, StyleSheet } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
              <Text variant="headlineMedium" style={{ color: theme.colors.primary }}>
                $2,450.00
              </Text>
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
}); 