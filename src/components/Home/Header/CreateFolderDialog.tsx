import React from 'react';
import Dialog from 'react-native-dialog';
import { StyleSheet, View } from 'react-native';
import { useApiClient } from '../../../api/useApiClient';
import { useMutation, useQueryClient } from 'react-query';
import { useState } from 'react';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { useCurrentDirectoryId } from '../useCurrentDirectoryId';
import useTheme from '../../../theme/useTheme';
import Typography from '../../misc/Typography';

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
        <Dialog.Title>
          <Typography>Create folder</Typography>
        </Dialog.Title>
        <Dialog.Input
          value={folderName}
          onChangeText={setFolderName}
          placeholder="Folder name"
          style={styles.font}
        />
        <Dialog.Button
          label="Cancel"
          onPress={onClose}
          color={colors.primary}
          style={styles.font}
        />
        <Dialog.Button
          label="Create"
          onPress={handleCreatePress}
          color={colors.primary}
          style={styles.font}
        />
      </Dialog.Container>
    </View>
  );
};

const styles = StyleSheet.create({
  font: {
    fontFamily: 'Oswald_400Regular'
  }
});

export default CreateFolderDialog;
