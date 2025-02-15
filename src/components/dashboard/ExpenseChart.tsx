import { View, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useTheme } from 'react-native-paper';

export function ExpenseChart() {
  const theme = useTheme();
  const screenWidth = Dimensions.get('window').width;

  // Dummy data - replace with real data later
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [1500, 2300, 1800, 2100, 2800, 2400],
      },
    ],
  };

  return (
    <View>
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
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
} 