import { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Redirect } from 'expo-router';
import { supabase } from '../services/supabase';
import { useAuth } from '../hooks/useAuth';

export default function Home() {
  const { user } = useAuth();

  if (!user) {
    return <Redirect href="/login" />;
  }

  useEffect(() => {
    const testConnection = async () => {
      const { data, error } = await supabase.from('users').select('*').limit(1);
      console.log('Supabase test:', { data, error });
    };
    testConnection();
  }, []);

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">ExpenseAI</Text>
      <Text variant="bodyMedium">Welcome to ExpenseAI</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 