import React from 'react';
import { View } from 'react-native';
import useTheme from '../../../theme/useTheme';
import {
  Menu,
  MenuOptions,
  MenuTrigger,
  renderers
} from 'react-native-popup-menu';
import ThemedMenuOption, { ThemedMenuSeparator } from '../../misc/ThemedMenu';
import ListItem from '../../misc/ListItem';
import { useMutation, useQueryClient } from 'react-query';
import { useApiClient } from '../../../api/useApiClient';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from '../../misc/Icon';
import { useConfirmationDialog } from '../../misc/ConfirmationDialog/ConfirmationDialogProvider';

interface Props {
  id: string;
  name: string;
}

const DirectoryListItem = ({ id, name }: Props) => {
  const apiClient = useApiClient();
  const queryClient = useQueryClient();
  const deleteMutation = useMutation(() => apiClient.deleteDirectory(id), {
    onSuccess: async () => {
      await queryClient.invalidateQueries('listDirectory');
    }
  });

  const navigation = useNavigation<StackNavigationProp<any>>();

  const handleDeleteSelect = async () => {
    await deleteMutation.mutateAsync();
  };

  const handlePress = () => {
    navigation.push('Files', {
      directoryId: id,
      name
    });
  };

  const { withConfirmation } = useConfirmationDialog();

  const { spacing, colors } = useTheme();

  return (
    <ListItem
      icon={<Icon name="folder" color="primary" />}
      text={name}
      onPress={handlePress}
      menu={
        <Menu renderer={renderers.SlideInMenu}>
          <MenuTrigger>
            <View style={{ padding: spacing(1) }}>
              <Icon name="more-vertical" />
            </View>
          </MenuTrigger>
          <MenuOptions optionsContainerStyle={{ backgroundColor: colors.card }}>
            <ThemedMenuOption
              color="error"
              text="Delete"
              icon="trash-2"
              onSelect={withConfirmation!(handleDeleteSelect, {
                title:
                  'Are you sure you want to delete this file? This cannot be undone.',
                confirmText: 'Delete',
                cancelText: 'Cancel'
              })}
            />
            <ThemedMenuSeparator />
          </MenuOptions>
        </Menu>
      }
    />
  );
};

export default DirectoryListItem;
