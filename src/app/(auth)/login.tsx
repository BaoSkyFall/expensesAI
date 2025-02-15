import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, useTheme } from 'react-native-paper';
import { Link } from 'expo-router';
import { useAuth } from '../../hooks/useAuth';
import { LabeledInput } from '../../components/common/LabeledInput';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth();
  const theme = useTheme();

  const handleLogin = async () => {
    try {
      await signIn(username, password);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text 
          variant="displaySmall" 
          style={[styles.title, { color: theme.colors.onSurface }]}
        >
          Hey 👋
        </Text>
        <Text 
          variant="headlineMedium" 
          style={[styles.subtitle, { color: theme.colors.onSurface }]}
        >
          Login Now!
        </Text>
      </View>

      <View style={styles.form}>
        <View style={styles.linkContainer}>
          <Text 
            variant="bodyMedium" 
            style={[styles.linkText, { color: theme.colors.onSurfaceVariant }]}
          >
            I Am A Old User
          </Text>
          <Text 
            variant="bodyMedium" 
            style={[styles.separator, { color: theme.colors.onSurfaceVariant }]}
          >
            /
          </Text>
          <Link href="/register" asChild>
            <Button mode="text" compact>
              Create New
            </Button>
          </Link>
        </View>

        <LabeledInput
          label="Username"
          value={username}
          onChangeText={setUsername}
        />

        <LabeledInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          isPassword
        />

        <View style={styles.forgotContainer}>
          <Link href="/forgot-password" asChild>
            <Button mode="text" compact>
              Forgot Password?
            </Button>
          </Link>
     
        </View>

        <Button
          mode="contained"
          onPress={handleLogin}
          style={[styles.loginButton, { backgroundColor: theme.colors.primary }]}
          contentStyle={styles.loginButtonContent}
        >
          Login now
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
    fontWeight: 'bold',
  },
  form: {
    flex: 1,
    padding: 24,
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  linkText: {
  },
  separator: {
    marginHorizontal: 8,
  },
  forgotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  loginButton: {
    borderRadius: 12,
    elevation: 0,
  },
  loginButtonContent: {
    paddingVertical: 12,
  },
}); 