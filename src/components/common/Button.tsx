import React, { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Button as PaperButton, useTheme } from 'react-native-paper';

export function Button({ mode = 'contained', style, ...props }) {
  const theme = useTheme();
  const [isPressed, setIsPressed] = useState(false);

  const getBackgroundColor = () => {
    if (mode === 'contained') {
      return isPressed ? theme.colors.primaryHover : theme.colors.primary;
    }
    if (mode === 'outlined') {
      return isPressed ? theme.colors.surfaceHover : theme.colors.surface;
    }
    return 'transparent';
  };

  return (
    <PaperButton
      mode={mode}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
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