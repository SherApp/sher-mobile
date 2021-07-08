import React from 'react';
import Dialog from 'react-native-dialog';
import { View } from 'react-native';
import { useApiClient } from '../../../api/useApiClient';
import { useMutation, useQueryClient } from 'react-query';
import { useState } from 'react';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { useCurrentDirectoryId } from '../useCurrentDirectoryId';
import useTheme from '../../../theme/useTheme';

interface Props {
  onClose(): void;
  visible: boolean;
}

const CreateFolderDialog = ({ onClose, visible }: Props) => {
  const [folderName, setFolderName] = useState('');
  const apiClient = useApiClient();
  const parentDirectoryId = useCurrentDirectoryId();

  const queryClient = useQueryClient();

  const createFolderMutation = useMutation(
    () =>
      apiClient.createDirectory({
        id: uuidv4(),
        name: folderName,
        parentDirectoryId
      }),
    {
      onSuccess: async () => {
        setFolderName('');
        await queryClient.invalidateQueries('listDirectory');
      }
    }
  );

  const handleCreatePress = async () => {
    onClose();
    await createFolderMutation.mutateAsync();
  };

  const { colors } = useTheme();

  return (
    <View>
      <Dialog.Container
        visible={visible}
        contentStyle={{ backgroundColor: colors.card }}
      >
        <Dialog.Title>Create folder</Dialog.Title>
        <Dialog.Input value={folderName} onChangeText={setFolderName} />
        <Dialog.Button
          label="Cancel"
          onPress={onClose}
          color={colors.primary}
        />
        <Dialog.Button
          label="Create"
          onPress={handleCreatePress}
          color={colors.primary}
        />
      </Dialog.Container>
    </View>
  );
};

export default CreateFolderDialog;
