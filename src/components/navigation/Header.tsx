import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';

type HeaderProps = {
  title: string;
  subtitle?: string;
  showSettings?: boolean;
  onSettingsPress?: () => void;
};

export function Header({ title, subtitle, showSettings, onSettingsPress }: HeaderProps) {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.primary }]}>
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text variant="headlineSmall" style={styles.title}>
            {title}
          </Text>
          {subtitle && (
            <MaterialCommunityIcons 
              name="chevron-down" 
              size={24} 
              color="white" 
            />
          )}
        </View>
        
        {showSettings && (
          <Pressable onPress={onSettingsPress} style={styles.settingsButton}>
            <MaterialCommunityIcons name="cog" size={24} color="white" />
          </Pressable>
        )}
      </View>

      {subtitle && (
        <Text variant="bodyMedium" style={styles.subtitle}>
          {subtitle}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 48,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
  },
  subtitle: {
    color: 'white',
    opacity: 0.8,
    marginTop: 4,
  },
  settingsButton: {
    padding: 8,
  },
}); 