import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Text, TextInput, TextInputProps } from 'react-native-paper';
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
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.labelRow}>
        <Text variant="bodySmall" style={styles.label}>
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
              color="#666"
            />
          </Pressable>
        )}
      </View>
      <TextInput
        {...props}
        mode="outlined"
        style={styles.input}
        contentStyle={styles.inputContent}
        outlineStyle={styles.inputOutline}
        theme={{
          colors: {
            background: '#f5f5f5',
          },
        }}
        secureTextEntry={isPassword ? !passwordVisible : secureTextEntry}
      />
      {error && (
        <Text variant="bodySmall" style={styles.error}>
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
    color: '#666',
    marginLeft: 4,
  },
  eyeIcon: {
    padding: 4,
    marginRight: 4,
  },
  input: {
    backgroundColor: '#f5f5f5',
    height: 48,
  },
  inputContent: {
    backgroundColor: '#f5f5f5',
  },
  inputOutline: {
    borderRadius: 8,
  },
  error: {
    color: '#dc2626',
    marginTop: 4,
    marginLeft: 4,
  },
}); 