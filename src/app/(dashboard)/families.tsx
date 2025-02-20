import React, { useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Text, Searchbar, useTheme } from 'react-native-paper';
import { FamilyCard } from '../../components/families/FamilyCard';
import { AddFamilyButton } from '../../components/families/AddFamilyButton';
import { useFamilies } from '../../hooks/useFamilies';
import LoadingScreen from '../../components/common/LoadingScreen';

export default function FamiliesScreen() {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const { families, loading } = useFamilies();

  if (loading) return <LoadingScreen />;

  const handleManageMembers = (familyId: string) => {
    // TODO: Implement member management
    console.log('Manage members for family:', familyId);
  };

  const handleViewDetails = (familyId: string) => {
    // TODO: Implement family details view
    console.log('View details for family:', familyId);
  };

  const filteredFamilies = families.filter(family =>
    family?.name?.toLowerCase()?.includes(searchQuery.toLowerCase())
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.surface }]}>
        <Searchbar
          placeholder="Search families"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
        />
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
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
    paddingTop: 8,
    backgroundColor: '#f5f5f5',
    zIndex: 1,
  },
  searchBar: {
    marginBottom: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 80, // Extra padding for FAB
  },
  emptyContainer: {
    padding: 16,
    alignItems: 'center',
  },
}); 