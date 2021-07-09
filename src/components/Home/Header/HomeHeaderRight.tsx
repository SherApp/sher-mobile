import {
  Menu,
  MenuOptions,
  MenuTrigger,
  renderers
} from 'react-native-popup-menu';
import { View } from 'react-native';
import { Entypo, Feather } from '@expo/vector-icons';
import ThemedMenuOption from '../../misc/ThemedMenu/ThemedMenuOption';
import { ThemedMenuSeparator } from '../../misc/ThemedMenu';
import React, { useState } from 'react';
import useTheme from '../../../theme/useTheme';
import CreateFolderDialog from './CreateFolderDialog';

const HomeHeaderRight = () => {
  const [createFolderVisible, setCreateFolderVisible] = useState(false);
  const { colors, spacing } = useTheme();

  const handleCreateFolderSelect = () => {
    setCreateFolderVisible(true);
  };

  return (
    <View style={{ marginRight: spacing(2) }}>
      <CreateFolderDialog
        onClose={() => setCreateFolderVisible(false)}
        visible={createFolderVisible}
      />
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
            text="Create folder"
            icon={
              <Feather name="folder-plus" size={24} color={colors['text']} />
            }
            onSelect={handleCreateFolderSelect}
          />
          <ThemedMenuSeparator />
        </MenuOptions>
      </Menu>
    </View>
  );
};

export default HomeHeaderRight;
