import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Portal, FAB, Modal, Card, TextInput, Button } from 'react-native-paper';
import { CategorySelector } from './CategorySelector';
import { useExpenses } from '../../hooks/useExpenses';
import { ExpenseCategoryType } from '../../constants/categories';

export function AddExpenseButton({ onSuccess, familyId }: { 
  onSuccess?: () => void;
  familyId: string | null;
}) {
  const [visible, setVisible] = useState(false);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ExpenseCategoryType | null>(null);
  const { addExpense } = useExpenses(familyId);

  const handleSubmit = async () => {
    try {
      if (!familyId) {
        console.error('No family selected');
        return;
      }

      const numericAmount = parseFloat(amount);
      if (isNaN(numericAmount) || !selectedCategory) {
        console.error('Invalid amount or category');
        return;
      }

      await addExpense({
        amount: numericAmount,
        description,
        category_id: selectedCategory.id,
        family_id: familyId
      });

      onSuccess?.();
      setVisible(false);
      resetForm();
    } catch (error) {
      console.error('Failed to add expense:', error);
    }
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
          <Card style={styles.modal}>
            <ScrollView>
              <Card.Title title="Add Expense" />
              <Card.Content>
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
                <CategorySelector
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                />
                <View style={styles.buttons}>
                  <Button onPress={() => setVisible(false)}>Cancel</Button>
                  <Button
                    mode="contained"
                    onPress={handleSubmit}
                    disabled={!amount || !description || !selectedCategory || !familyId}
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
        style={styles.fab}
        onPress={() => setVisible(true)}
        disabled={!familyId}
      />
    </>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 20,
    backgroundColor: 'white',
  },
  input: {
    marginBottom: 16,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    marginTop: 16,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
}); 