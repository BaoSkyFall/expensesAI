import { MD3LightTheme } from 'react-native-paper';

export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    // Main colors
    primary: '#0066FF',
    secondary: '#F5F6F8',
    error: '#FF4D4D',
    success: '#00C48C',
    
    // Backgrounds
    background: '#F5F6F8',
    surface: '#FFFFFF',
    surfaceVariant: '#F5F6F8',
    
    // Text colors
    onSurface: '#1A1A1A',
    onSurfaceVariant: '#6B7280',
    outline: '#E5E7EB',
    
    // Border colors
    outlineVariant: '#F3F4F6',
  },
  roundness: 16,
}; 