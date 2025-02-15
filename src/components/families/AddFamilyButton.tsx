import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Portal, FAB, Modal, Card, TextInput, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export function AddFamilyButton() {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState('');

  const handleSubmit = async () => {
    // TODO: Implement family creation
    console.log({ name });
    setVisible(false);
    resetForm();
  };

  const resetForm = () => {
    setName('');
  };

  return (
    <>
      <Portal>
        <Modal visible={visible} onDismiss={() => setVisible(false)}>
          <Card style={styles.modal}>
            <ScrollView>
              <Card.Title title="Create New Family" />
              <Card.Content>
                <TextInput
                  label="Family Name"
                  value={name}
                  onChangeText={setName}
                  style={styles.input}
                />
                <View style={styles.buttons}>
                  <Button onPress={() => setVisible(false)}>Cancel</Button>
                  <Button
                    mode="contained"
                    onPress={handleSubmit}
                    disabled={!name.trim()}
                  >
                    Create
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
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
}); 