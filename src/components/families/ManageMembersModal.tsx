import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Portal, Modal, Card, TextInput, Button, List, Avatar, IconButton, Chip, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Member = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'member';
  status: 'active' | 'pending';
};

type ManageMembersModalProps = {
  visible: boolean;
  onDismiss: () => void;
  familyName: string;
  members: Member[];
  onAddMember: (email: string) => void;
  onRemoveMember: (memberId: string) => void;
  onChangeRole: (memberId: string, newRole: 'admin' | 'member') => void;
};

export function ManageMembersModal({
  visible,
  onDismiss,
  familyName,
  members,
  onAddMember,
  onRemoveMember,
  onChangeRole,
}: ManageMembersModalProps) {
  const [email, setEmail] = useState('');
  const [inviting, setInviting] = useState(false);
  const windowHeight = Dimensions.get('window').height;

  const handleInvite = () => {
    setInviting(true);
    onAddMember(email);
    setEmail('');
    setInviting(false);
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={styles.modalContainer}>
        <Card style={[styles.modal, { maxHeight: windowHeight * 0.8 }]}>
          <Card.Title 
            title={`Manage ${familyName} Members`}
            right={(props) => (
              <IconButton 
                {...props} 
                icon="close" 
                onPress={onDismiss}
              />
            )}
          />
          <Card.Content style={styles.content}>
            <View style={styles.inviteSection}>
              <TextInput
                label="Invite Member by Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                right={
                  <TextInput.Icon
                    icon="send"
                    disabled={!isValidEmail(email) || inviting}
                    onPress={handleInvite}
                  />
                }
                style={styles.emailInput}
              />
            </View>

            <Text variant="titleMedium" style={styles.sectionTitle}>
              Members ({members.length})
            </Text>

            <View style={styles.membersListContainer}>
              <ScrollView>
                {members.map((member) => (
                  <List.Item
                    key={member.id}
                    title={member.name}
                    description={member.email}
                    left={(props) => (
                      <Avatar.Text
                        {...props}
                        label={member.name.substring(0, 2)}
                        size={40}
                      />
                    )}
                    right={() => (
                      <View style={styles.memberActions}>
                        {member.status === 'pending' && (
                          <Chip icon="clock" mode="outlined" compact>
                            Pending
                          </Chip>
                        )}
                        <IconButton
                          icon={member.role === 'admin' ? 'crown' : 'account'}
                          selected={member.role === 'admin'}
                          onPress={() => onChangeRole(
                            member.id,
                            member.role === 'admin' ? 'member' : 'admin'
                          )}
                        />
                        <IconButton
                          icon="delete"
                          iconColor="red"
                          onPress={() => onRemoveMember(member.id)}
                        />
                      </View>
                    )}
                    style={styles.memberItem}
                  />
                ))}
              </ScrollView>
            </View>
          </Card.Content>
        </Card>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    padding: 16,
  },
  modal: {
    width: '100%',
  },
  content: {
    paddingHorizontal: 0,
  },
  inviteSection: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  emailInput: {
    marginBottom: 8,
  },
  sectionTitle: {
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  membersListContainer: {
    maxHeight: 400,
  },
  memberItem: {
    paddingRight: 8,
  },
  memberActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
}); 