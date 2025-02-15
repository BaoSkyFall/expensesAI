import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
import { LineChart } from 'react-native-chart-kit';

type FamilyExpenseChartProps = {
  familyId: string;
};

export function FamilyExpenseChart({ familyId }: FamilyExpenseChartProps) {
  const theme = useTheme();
  const screenWidth = Dimensions.get('window').width;

  // TODO: Fetch real data from API
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [1500, 2300, 1800, 2100, 2800, 2400],
      },
    ],
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleMedium" style={styles.title}>Expense Trends</Text>
        <LineChart
          data={data}
          width={screenWidth - 64}
          height={220}
          chartConfig={{
            backgroundColor: theme.colors.primary,
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 0,
            color: (opacity = 1) => theme.colors.primary,
            style: {
              borderRadius: 16,
            },
          }}
          bezier
          style={styles.chart}
        />
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 16,
    marginBottom: 8,
  },
  title: {
    marginBottom: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
}); 