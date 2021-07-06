import React from 'react';
import { View } from 'react-native';
import useTheme from '../../../theme/useTheme';
import { Entypo } from '@expo/vector-icons';
import {
  Menu,
  MenuOptions,
  MenuTrigger,
  renderers
} from 'react-native-popup-menu';
import ThemedMenuOption, { ThemedMenuSeparator } from '../../misc/ThemedMenu';
import { AntDesign, Feather } from '@expo/vector-icons';
import ListItem from './ListItem';
import { useMutation, useQueryClient } from 'react-query';
import { useApiClient } from '../../../api/useApiClient';

interface Props {
  id: string;
  name: string;
  onPress(): void;
}

const DirectoryListItem = ({ id, name, onPress }: Props) => {
  const apiClient = useApiClient();
  const queryClient = useQueryClient();
  const deleteMutation = useMutation(() => apiClient.deleteDirectory(id), {
    onSuccess: async () => {
      await queryClient.invalidateQueries('listDirectory');
    }
  });

  const handleDeleteSelect = async () => {
    await deleteMutation.mutateAsync();
  };

  const { spacing, colors } = useTheme();

  return (
    <ListItem
      icon={<Feather name="folder" size={24} color={colors['primary']} />}
      name={name}
      onPress={onPress}
      menu={
        <Menu renderer={renderers.SlideInMenu}>
          <MenuTrigger>
            <View style={{ padding: spacing(1) }}>
              <Entypo
                name="dots-three-vertical"
                size={spacing(2)}
                style={{
                  color: colors['text']
                }}
              />
            </View>
          </MenuTrigger>
          <MenuOptions optionsContainerStyle={{ backgroundColor: colors.card }}>
            <ThemedMenuOption
              text="Delete"
              icon={
                <AntDesign name="delete" size={24} color={colors['text']} />
              }
              onSelect={handleDeleteSelect}
            />
            <ThemedMenuSeparator />
          </MenuOptions>
        </Menu>
      }
    />
  );
};

export default DirectoryListItem;
