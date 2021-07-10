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
import { Feather } from '@expo/vector-icons';
import ListItem from './ListItem';
import { useMutation, useQueryClient } from 'react-query';
import { useApiClient } from '../../../api/useApiClient';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

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
    navigation.push('Home', {
      directoryId: id,
      name
    });
  };

  const { spacing, colors } = useTheme();

  return (
    <ListItem
      icon={<Feather name="folder" size={24} color={colors['primary']} />}
      name={name}
      onPress={handlePress}
      menu={
        <Menu renderer={renderers.SlideInMenu}>
          <MenuTrigger>
            <View style={{ padding: spacing(1) }}>
              <Feather
                name="more-vertical"
                size={24}
                style={{
                  color: colors['text']
                }}
              />
            </View>
          </MenuTrigger>
          <MenuOptions optionsContainerStyle={{ backgroundColor: colors.card }}>
            <ThemedMenuOption
              text="Delete"
              icon={<Feather name="trash-2" size={24} color={colors['text']} />}
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
