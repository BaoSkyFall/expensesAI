import { Searchbar as PaperSearchbar } from 'react-native-paper';
import { useTheme } from 'react-native-paper';

export function Searchbar({ value, onChangeText, ...props }) {
  const theme = useTheme();

  return (
    <PaperSearchbar
      value={value}
      onChangeText={onChangeText}
      style={[styles.searchBar, { backgroundColor: theme.colors.surfaceVariant }]}
      iconColor={theme.colors.onSurfaceVariant}
      placeholderTextColor={theme.colors.onSurfaceVariant}
      inputStyle={{ color: theme.colors.onSurface }}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  searchBar: {
    marginBottom: 16,
    elevation: 0,
    borderRadius: 12,
  },
}); 