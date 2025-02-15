import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Text, TextInput, TextInputProps, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface LabeledInputProps extends Omit<TextInputProps, 'right' | 'mode' | 'theme'> {
  label: string;
  error?: string;
  isPassword?: boolean;
}

export function LabeledInput({ 
  label, 
  error, 
  style, 
  isPassword,
  secureTextEntry,
  ...props 
}: LabeledInputProps) {
  const theme = useTheme();
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.labelRow}>
        <Text variant="bodySmall" style={[styles.label, { color: theme.colors.onSurfaceVariant }]}>
          {label}
        </Text>
        {isPassword && (
          <Pressable 
            onPress={() => setPasswordVisible(!passwordVisible)}
            style={styles.eyeIcon}
          >
            <MaterialCommunityIcons
              name={passwordVisible ? 'eye-off' : 'eye'}
              size={20}
              color={theme.colors.onSurfaceVariant}
            />
          </Pressable>
        )}
      </View>
      <TextInput
        {...props}
        mode="outlined"
        style={[styles.input, { backgroundColor: theme.colors.surfaceVariant }]}
        contentStyle={[styles.inputContent, { backgroundColor: theme.colors.surfaceVariant }]}
        outlineStyle={[styles.inputOutline, { borderColor: theme.colors.outlineVariant }]}
        theme={{
          colors: {
            background: theme.colors.surfaceVariant,
          },
        }}
        secureTextEntry={isPassword ? !passwordVisible : secureTextEntry}
      />
      {error && (
        <Text variant="bodySmall" style={[styles.error, { color: theme.colors.error }]}>
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  label: {
    marginLeft: 4,
    fontSize: 13,
  },
  eyeIcon: {
    padding: 4,
    marginRight: 4,
  },
  input: {
    height: 48,
  },
  inputContent: {
  },
  inputOutline: {
    borderRadius: 12,
  },
  error: {
    marginTop: 4,
    marginLeft: 4,
  },
}); 