import React from 'react';
import { SegmentedButtons } from 'react-native-paper';
import { useFamilies } from '../../hooks/useFamilies';
import { useTheme } from 'react-native-paper';

export function FamilyWalletSelector({ 
  wallets,
  selectedWallet,
  onSelect 
}: {
  wallets: Wallet[];
  selectedWallet: Wallet | null;
  onSelect: (wallet: Wallet) => void;
}) {
  const { families } = useFamilies();
  const theme = useTheme();

  const personalWallet = wallets.find(w => !w.family_id);
  const familyWallets = wallets.filter(w => w.family_id);

  return (
    <SegmentedButtons
      value={selectedWallet?.id || ''}
      onValueChange={value => 
        onSelect(wallets.find(w => w.id === value)!)
      }
      buttons={[
        {
          value: personalWallet?.id || 'personal',
          icon: 'account',
          label: 'Personal',
          disabled: !personalWallet,
          style: personalWallet ? {} : { opacity: 0.5 }
        },
        ...familyWallets.map(wallet => ({
          value: wallet.id,
          icon: 'account-group',
          label: families.find(f => f.id === wallet.family_id)?.name || 'Family',
          showSelectedCheck: true
        }))
      ]}
      style={{ marginBottom: 16 }}
    />
  );
} 