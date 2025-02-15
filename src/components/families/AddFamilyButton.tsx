import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Portal, FAB, Modal, Card, TextInput, Button, useTheme } from 'react-native-paper';

export function AddFamilyButton() {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState('');
  const theme = useTheme();

  const handleSubmit = async () => {
    // TODO: Implement family creation
    console.log('Creating family:', name);
    setVisible(false);
    setName('');
  };

  return (
    <>
      <Portal>
        <Modal visible={visible} onDismiss={() => setVisible(false)}>
          <Card 
            style={[styles.modal, { backgroundColor: theme.colors.surface }]}
            mode="outlined"
          >
            <ScrollView>
              <Card.Title title="Create New Family" />
              <Card.Content>
                <TextInput
                  label="Family Name"
                  value={name}
                  onChangeText={setName}
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
                    onPress={() => setVisible(false)}
                    style={styles.button}
                    contentStyle={styles.buttonContent}
                  >
                    Cancel
                  </Button>
                  <Button
                    mode="contained"
                    onPress={handleSubmit}
                    disabled={!name.trim()}
                    style={styles.button}
                    contentStyle={styles.buttonContent}
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
        icon="plus"
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
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
    // paddingHorizontal: 8,  // Commented out to remove padding
    // paddingVertical: 4,    // Commented out to remove padding
  },
}); 