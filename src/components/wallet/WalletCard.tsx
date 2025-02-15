import { Card, Text, useTheme } from 'react-native-paper';

export function WalletCard({ balance }) {
  const theme = useTheme();

  return (
    <Card 
      style={[styles.card, { backgroundColor: theme.colors.surface }]}
      mode="outlined"
    >
      <Card.Content>
        {/* ... card content ... */}
      </Card.Content>
    </Card>
  );
} 