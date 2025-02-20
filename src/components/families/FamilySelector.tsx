import React from 'react';
import { StyleSheet } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';
import { ViewStyle } from 'react-native';

type FamilySelectorProps = {
  value: string | null;
  onChange: (value: string | null) => void;
  families: Array<{ id: string; name: string }>;
  style?: ViewStyle;
};

export function FamilySelector({ value, onChange, families, style }: FamilySelectorProps) {
  const buttons = [
    { value: null, label: 'Personal', icon: 'account' },
    ...families.map(family => ({
      value: family.id,
      label: family.name,
      icon: 'account-group'
    }))
  ];

  return (
    <SegmentedButtons
      value={value || 'null'} // Convert null to string for SegmentedButtons
      onValueChange={(newValue) => onChange(newValue === 'null' ? null : newValue)}
      buttons={buttons}
      style={[styles.selector, style]}
    />
  );
}

const styles = StyleSheet.create({
  selector: {
    marginBottom: 8,
  }
}); 