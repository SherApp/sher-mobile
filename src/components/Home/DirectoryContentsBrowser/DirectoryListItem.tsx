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

interface Props {
  name: string;
  onPress(): void;
}

const DirectoryListItem = ({ name, onPress }: Props) => {
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
            />
            <ThemedMenuSeparator />
          </MenuOptions>
        </Menu>
      }
    />
  );
};

export default DirectoryListItem;
