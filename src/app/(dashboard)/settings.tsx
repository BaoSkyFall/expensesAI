import React from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Button, useTheme, Divider } from 'react-native-paper';
import { useAuth } from '../../hooks/useAuth';
import { router } from 'expo-router';

export default function SettingsScreen() {
  const theme = useTheme();
  const { signOut, user } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      router.replace('/(auth)/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <List.Section>
        <List.Subheader>Account</List.Subheader>
        <List.Item
          title={user?.email}
          description="Email"
          left={props => <List.Icon {...props} icon="email" />}
        />
        <Divider />
        <List.Item
          title={user?.user_metadata?.full_name}
          description="Full Name"
          left={props => <List.Icon {...props} icon="account" />}
        />
      </List.Section>

      <List.Section>
        <List.Subheader>App Settings</List.Subheader>
        <List.Item
          title="Currency"
          description="VNĐ"
          left={props => <List.Icon {...props} icon="currency-usd" />}
        />
        <Divider />
        <List.Item
          title="Language"
          description="English"
          left={props => <List.Icon {...props} icon="translate" />}
        />
      </List.Section>

      <View style={styles.buttonContainer}>
        <Button 
          mode="outlined"
          onPress={handleLogout}
          style={[styles.button, { borderColor: theme.colors.error }]}
          textColor={theme.colors.error}
          icon="logout"
        >
          Logout
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    padding: 16,
    marginTop: 'auto', // Push to bottom
  },
  button: {
    // Static styles only, theme-dependent styles moved to inline
  },
}); 