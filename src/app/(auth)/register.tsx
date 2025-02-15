import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { Link, router } from 'expo-router';
import { useAuth } from '../../hooks/useAuth';
import { LabeledInput } from '../../components/common/LabeledInput';

export default function RegisterScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signUp } = useAuth();

  const handleRegister = async () => {
    try {
      await signUp(email, password, { full_name: fullName });
      router.replace('/');
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="displaySmall" style={styles.title}>
          Unleash Your
        </Text>
        <Text variant="displaySmall" style={styles.title}>
          Financial Potentials
        </Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          Artificial intelligence for smarter financial decisions
        </Text>
      </View>

      <View style={styles.form}>
        <LabeledInput
          label="Full Name"
          value={fullName}
          onChangeText={setFullName}
        />

        <LabeledInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <LabeledInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          isPassword
        />

        <Button
          mode="contained"
          onPress={handleRegister}
          style={styles.registerButton}
          contentStyle={styles.registerButtonContent}
        >
          Create Account
        </Button>

        <View style={styles.loginContainer}>
          <Text variant="bodyMedium" style={styles.loginText}>
            Already have an account?
          </Text>
          <Link href="/login" asChild>
            <Button mode="text" compact>
              Login
            </Button>
          </Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 24,
  },
  title: {
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#666',
    marginTop: 8,
  },
  form: {
    flex: 1,
    padding: 24,
  },
  registerButton: {
    borderRadius: 8,
    marginTop: 16,
  },
  registerButtonContent: {
    paddingVertical: 8,
  },
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  loginText: {
    color: '#666',
  },
}); 