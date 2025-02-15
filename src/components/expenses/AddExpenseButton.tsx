import { Portal, FAB, Modal, Card, TextInput, Button, Text } from 'react-native-paper';
import { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CategorySelector } from './CategorySelector';
import { EXPENSE_CATEGORIES, ExpenseCategoryType } from '../../constants/categories';
import React from 'react';
import { useTheme } from 'react-native-paper';

export function AddExpenseButton() {
  const [visible, setVisible] = useState(false);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ExpenseCategoryType | null>(null);
  const theme = useTheme();

  const handleSubmit = async () => {
    // TODO: Implement expense creation with category
    console.log({
      amount,
      description,
      category: selectedCategory,
    });
    setVisible(false);
    resetForm();
  };

  const resetForm = () => {
    setAmount('');
    setDescription('');
    setSelectedCategory(null);
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
              <Card.Title title="Add New Expense" />
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
                <TextInput
                  label="Description"
                  value={description}
                  onChangeText={setDescription}
                  style={styles.input}
                />
                <Text style={styles.label}>Category</Text>
                <CategorySelector
                  selectedCategory={selectedCategory?.id || null}
                  onSelectCategory={setSelectedCategory}
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
                    style={styles.button}
                    contentStyle={styles.buttonContent}
                    disabled={!amount || !description || !selectedCategory}
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
  label: {
    marginBottom: 8,
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
    minWidth: 80,
  },
  buttonContent: {
    // paddingHorizontal: 2,
    // paddingVertical: 2,
  },
}); 