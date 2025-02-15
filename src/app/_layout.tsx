import { useEffect } from 'react';
import { Slot, Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { theme } from '../theme';
import { useAuth } from '../hooks/useAuth';
import LoadingScreen from '../components/common/LoadingScreen';

export default function Layout() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <PaperProvider theme={theme}>
        <LoadingScreen />
      </PaperProvider>
    );
  }

  return (
    <PaperProvider theme={theme}>
      {!user ? (
        // Use Slot for auth routes
        <Slot />
      ) : (
        // Use Stack for authenticated routes
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.colors.primary,
            },
            headerTintColor: '#fff',
          }}
        />
      )}
    </PaperProvider>
  );
} 