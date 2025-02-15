import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Portal, FAB, Modal, Card, TextInput, Button, SegmentedButtons } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export function AddMoneyButton() {
  const [visible, setVisible] = useState(false);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<'credit' | 'debit'>('credit');

  const handleSubmit = async () => {
    // TODO: Implement transaction creation
    console.log({
      amount,
      description,
      type,
    });
    setVisible(false);
    resetForm();
  };

  const resetForm = () => {
    setAmount('');
    setDescription('');
    setType('credit');
  };

  return (
    <>
      <Portal>
        <Modal visible={visible} onDismiss={() => setVisible(false)}>
          <Card style={styles.modal}>
            <ScrollView>
              <Card.Title title="Add Transaction" />
              <Card.Content>
                <SegmentedButtons
                  value={type}
                  onValueChange={(value) => setType(value as 'credit' | 'debit')}
                  buttons={[
                    {
                      value: 'credit',
                      label: 'Add Money',
                      icon: 'arrow-up-circle',
                    },
                    {
                      value: 'debit',
                      label: 'Withdraw',
                      icon: 'arrow-down-circle',
                    },
                  ]}
                  style={styles.segmentedButtons}
                />
                <TextInput
                  label="Amount"
                  value={amount}
                  onChangeText={setAmount}
                  keyboardType="numeric"
                  style={styles.input}
                />
                <TextInput
                  label="Description"
                  value={description}
                  onChangeText={setDescription}
                  style={styles.input}
                />
                <View style={styles.buttons}>
                  <Button onPress={() => setVisible(false)}>Cancel</Button>
                  <Button
                    mode="contained"
                    onPress={handleSubmit}
                    disabled={!amount || !description}
                  >
                    Save
                  </Button>
                </View>
              </Card.Content>
            </ScrollView>
          </Card>
        </Modal>
      </Portal>
      <FAB
        icon={() => <MaterialCommunityIcons name="plus" size={24} color="white" />}
        style={styles.fab}
        onPress={() => setVisible(true)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  modal: {
    margin: 16,
  },
  input: {
    marginBottom: 16,
  },
  segmentedButtons: {
    marginBottom: 16,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
}); 