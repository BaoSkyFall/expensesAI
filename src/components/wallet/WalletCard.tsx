import { Card, Text, useTheme } from 'react-native-paper';
import { cardStyles } from '../../styles/cards';

export function WalletCard({ balance }) {
  const theme = useTheme();

  return (
    <Card 
      style={[styles.card, cardStyles.card]}
      mode="outlined"
    >
      <Card.Content>
        {/* ... card content ... */}
      </Card.Content>
    </Card>
  );
} 