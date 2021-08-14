import {
  Menu,
  MenuOptions,
  MenuTrigger,
  renderers
} from 'react-native-popup-menu';
import { StyleSheet, View } from 'react-native';
import ThemedMenuOption from '../../misc/ThemedMenu/ThemedMenuOption';
import { ThemedMenuSeparator } from '../../misc/ThemedMenu';
import React, { useState } from 'react';
import useTheme from '../../../theme/useTheme';
import CreateFolderDialog from './CreateFolderDialog';
import IconButton from '../../misc/IconButton';
import Icon from '../../misc/Icon';

interface Props {
  onSearchPress?(): void;
}

const HomeHeaderRight = ({ onSearchPress }: Props) => {
  const [createFolderVisible, setCreateFolderVisible] = useState(false);
  const { colors, spacing } = useTheme();

  const handleCreateFolderSelect = () => {
    setCreateFolderVisible(true);
  };

  return (
    <View style={[{ marginRight: spacing(1) }, styles.container]}>
      <CreateFolderDialog
        onClose={() => setCreateFolderVisible(false)}
        visible={createFolderVisible}
      />
      <IconButton onPress={onSearchPress}>
        <Icon name="search" />
      </IconButton>
      <Menu renderer={renderers.SlideInMenu}>
        <MenuTrigger>
          <View style={{ padding: spacing(1) }}>
            <Icon name="more-vertical" />
          </View>
        </MenuTrigger>
        <MenuOptions optionsContainerStyle={{ backgroundColor: colors.card }}>
          <ThemedMenuOption
            text="Create folder"
            icon="folder-plus"
            onSelect={handleCreateFolderSelect}
          />
          <ThemedMenuSeparator />
        </MenuOptions>
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export default HomeHeaderRight;
