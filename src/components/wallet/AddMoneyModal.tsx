import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Portal, Modal, Card, TextInput, Button, useTheme, SegmentedButtons } from 'react-native-paper';
import { useFamilies } from '../../hooks/useFamilies';
import { useWallet } from '../../hooks/useWallet';

type Wallet = {
  id: string;
  family_id?: string;
  balance: number;
  // Add other wallet properties you need
};

type AddMoneyModalProps = {
  visible: boolean;
  onDismiss: () => void;
  onSubmit: (amount: number, familyId?: string) => void;
  families: Array<{ id: string; name: string }>;
  wallets: Wallet[];
};

export function AddMoneyModal({ visible, onDismiss, onSubmit, families, wallets }: AddMoneyModalProps) {
  const [amount, setAmount] = useState('');
  const [selectedFamilyId, setSelectedFamilyId] = useState<string | null>(null);
  const theme = useTheme();

  const walletOptions = [
    { label: 'Personal', value: 'personal', icon: 'account' },
    ...families.map(family => ({
      label: family.name,
      value: family.id,
      icon: 'account-group',
      disabled: !wallets.some(w => w.family_id === family.id)
    }))
  ];

  const handleSubmit = () => {
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) return;
    
    onSubmit(numericAmount, selectedFamilyId === 'personal' ? undefined : selectedFamilyId);
    setAmount('');
    setSelectedFamilyId(null);
  };

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss}>
        <Card style={styles.modal}>
          <Card.Title title="Add Funds" />
          <Card.Content>
            <TextInput
              label="Amount"
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              right={<TextInput.Affix text="đ" />}
              style={styles.input}
            />
            
            <SegmentedButtons
              value={selectedFamilyId || 'personal'}
              onValueChange={setSelectedFamilyId}
              buttons={walletOptions}
              style={styles.segmentedButtons}
            />

            <View style={styles.buttons}>
              <Button 
                onPress={onDismiss}
                mode="outlined"
                style={styles.button}
              >
                Cancel
              </Button>
              <Button
                mode="contained"
                onPress={handleSubmit}
                disabled={!amount || parseFloat(amount) <= 0 || !selectedFamilyId}
                style={styles.button}
              >
                Add Funds
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
    margin: 20,
    backgroundColor: 'white',
  },
  input: {
    marginBottom: 16,
    backgroundColor: 'transparent',
  },
  segmentedButtons: {
    marginBottom: 16,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
  },
}); 