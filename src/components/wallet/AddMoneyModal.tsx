import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Portal, Modal, Card, TextInput, Button, useTheme } from 'react-native-paper';

type AddMoneyModalProps = {
  visible: boolean;
  onDismiss: () => void;
  onSubmit: (amount: number) => void;
};

export function AddMoneyModal({ visible, onDismiss, onSubmit }: AddMoneyModalProps) {
  const [amount, setAmount] = useState('');
  const theme = useTheme();

  const handleSubmit = () => {
    const numAmount = parseFloat(amount);
    if (!isNaN(numAmount) && numAmount > 0) {
      onSubmit(numAmount);
      setAmount('');
    }
  };

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss}>
        <Card 
          style={[styles.modal, { backgroundColor: theme.colors.surface }]}
          mode="outlined"
        >
          <Card.Title title="Add Money" />
          <Card.Content>
            <TextInput
              label="Amount"
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              style={styles.input}
              mode="outlined"
              theme={{
                colors: {
                  background: theme.colors.surfaceVariant,
                },
              }}
            />
            <View style={styles.buttonContainer}>
              <Button 
                mode="outlined"
                onPress={onDismiss}
                style={styles.button}
                contentStyle={styles.buttonContent}
              >
                Cancel
              </Button>
              <Button 
                mode="contained" 
                onPress={handleSubmit}
                style={styles.button}
                contentStyle={styles.buttonContent}
                disabled={!amount || isNaN(parseFloat(amount))}
              >
                Add
              </Button>
            </View>
          </Card.Content>
        </Card>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 16,
  },
  input: {
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    marginTop: 24,
    marginBottom: 16,
  },
  button: {
    borderRadius: 8,
    minWidth: 100,
  },
  buttonContent: {
    // paddingHorizontal: 16,
    // paddingVertical: 8,
  },
}); 