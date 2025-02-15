import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Slot } from 'expo-router';
import { PaperProvider, MD3LightTheme } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#0095FF',
    secondary: '#E6F4FF',
    error: '#FF6B6B',
    background: '#FFFFFF',
    surface: '#FFFFFF',
    outline: '#666666',
    surfaceVariant: '#F5F5F5',
    // Text colors
    onSurface: '#1A1A1A',
    onSurfaceVariant: '#666666',
    // Border colors
    outlineVariant: '#EEEEEE',
  },
};

export default function AppLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider theme={theme}>
        <View style={styles.content}>
          <Slot />
        </View>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
}); 