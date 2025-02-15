import React from 'react';
import { StyleSheet } from 'react-native';
import { Button as PaperButton, useTheme, MD3Theme } from 'react-native-paper';

type ButtonMode = 'text' | 'outlined' | 'contained' | 'elevated' | 'contained-tonal';

interface CustomButtonProps {
  mode?: ButtonMode;
  style?: any;
  [key: string]: any;
}

export function Button({ mode = 'contained', style, ...props }: CustomButtonProps) {
  const theme = useTheme<MD3Theme>();

  const getBackgroundColor = () => {
    switch (mode) {
      case 'contained':
        return theme.colors.primary;
      case 'outlined':
        return theme.colors.surface;
      default:
        return 'transparent';
    }
  };

  return (
    <PaperButton
      mode={mode}
      style={[
        styles.button,
        { backgroundColor: getBackgroundColor() },
        style,
      ]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
  },
}); 