import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, useTheme } from 'react-native-paper';
import { Link, router } from 'expo-router';
import { useAuth } from '../../hooks/useAuth';
import { LabeledInput } from '../../components/common/LabeledInput';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const theme = useTheme();
  const { resetPassword } = useAuth();

  const handleResetPassword = async () => {
    if (!email) return;

    try {
      setLoading(true);
      setMessage('');
      await resetPassword(email);
      setMessage('Check your email for password reset instructions');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text 
          variant="headlineMedium" 
          style={[styles.title, { color: theme.colors.onSurface }]}
        >
          Forgot Password?
        </Text>
        <Text 
          variant="bodyLarge" 
          style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}
        >
          Enter your email to reset your password
        </Text>
      </View>

      <View style={styles.form}>
        <LabeledInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {message ? (
          <Text 
            style={[
              styles.message, 
              { 
                color: message.includes('error') 
                  ? theme.colors.error 
                  : theme.colors.primary 
              }
            ]}
          >
            {message}
          </Text>
        ) : null}

        <Button
          mode="contained"
          onPress={handleResetPassword}
          style={[styles.resetButton, { backgroundColor: theme.colors.primary }]}
          contentStyle={styles.resetButtonContent}
          loading={loading}
          disabled={loading || !email}
        >
          Reset Password
        </Button>

        <Button
          mode="text"
          onPress={() => router.back()}
          style={styles.backButton}
        >
          Back to Login
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 24,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    opacity: 0.7,
  },
  form: {
    flex: 1,
    padding: 24,
  },
  message: {
    textAlign: 'center',
    marginVertical: 16,
  },
  resetButton: {
    borderRadius: 12,
    marginTop: 24,
    elevation: 0,
  },
  resetButtonContent: {
    paddingVertical: 12,
  },
  backButton: {
    marginTop: 16,
  },
}); 