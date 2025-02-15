import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { Stack, usePathname, router } from 'expo-router';
import { useAuth } from '../../hooks/useAuth';

export default function AuthLayout() {
  const { user } = useAuth();
  const pathname = usePathname();
  const showSkip = pathname === '/(auth)/';

  useEffect(() => {
    if (user) {
      // If user is logged in, redirect to dashboard
      router.replace('/(dashboard)/');
    }
  }, [user]);

  // Don't render anything while redirecting
  if (user) {
    return null;
  }

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen 
          name="index"
          options={{
            animation: 'none',
          }}
        />
        <Stack.Screen 
          name="login"
          options={{
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen 
          name="register"
          options={{
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen 
          name="forgot-password"
          options={{
            animation: 'slide_from_right',
          }}
        />
      </Stack>
      {showSkip && (
        <Button
          mode="text"
          style={styles.skipButton}
          labelStyle={styles.skipLabel}
          onPress={() => router.push('/(auth)/login')}
        >
          Skip
        </Button>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  skipButton: {
    position: 'absolute',
    top: 48,
    right: 16,
    zIndex: 1,
  },
  skipLabel: {
    fontSize: 16,
  },
}); 