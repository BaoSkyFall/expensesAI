import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Searchbar } from 'react-native-paper';
import { FamilyCard } from '../../components/families/FamilyCard';
import { AddFamilyButton } from '../../components/families/AddFamilyButton';

export default function FamiliesScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  // Dummy data - replace with real data later
  const families = [
    {
      id: '1',
      name: 'Smith Family',
      totalExpenses: 1250,
      members: [
        { id: '1', name: 'John Smith', role: 'admin' as const },
        { id: '2', name: 'Jane Smith', role: 'member' as const },
        { id: '3', name: 'Jimmy Smith', role: 'member' as const },
        { id: '4', name: 'Jenny Smith', role: 'member' as const },
      ],
    },
    {
      id: '2',
      name: 'Johnson Family',
      totalExpenses: 980,
      members: [
        { id: '5', name: 'Mike Johnson', role: 'admin' as const },
        { id: '6', name: 'Sarah Johnson', role: 'member' as const },
      ],
    },
  ];

  const handleManageMembers = (familyId: string) => {
    // TODO: Implement member management
    console.log('Manage members for family:', familyId);
  };

  const handleViewDetails = (familyId: string) => {
    // TODO: Implement family details view
    console.log('View details for family:', familyId);
  };

  const filteredFamilies = families.filter(family =>
    family.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Searchbar
          placeholder="Search families"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
        />
      </View>

      <ScrollView>
        {filteredFamilies.map(family => (
          <FamilyCard
            key={family.id}
            name={family.name}
            members={family.members}
            totalExpenses={family.totalExpenses}
            onManageMembers={() => handleManageMembers(family.id)}
            onViewDetails={() => handleViewDetails(family.id)}
          />
        ))}
        {filteredFamilies.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text variant="bodyLarge">No families found</Text>
          </View>
        )}
      </ScrollView>

      <AddFamilyButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
  },
  searchBar: {
    marginBottom: 8,
  },
  emptyContainer: {
    padding: 16,
    alignItems: 'center',
  },
}); 