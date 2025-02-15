import { MD3LightTheme } from 'react-native-paper';

export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    // Main colors
    primary: '#0095FF',
    secondary: '#E6F4FF',
    error: '#FF6B6B',
    
    // Backgrounds
    background: '#FFFFFF',
    surface: '#FFFFFF',
    surfaceVariant: '#F5F5F5',
    
    // Text colors
    onSurface: '#1A1A1A',
    onSurfaceVariant: '#666666',
    outline: '#666666',
    
    // Border colors
    outlineVariant: '#EEEEEE',
  },
}; 