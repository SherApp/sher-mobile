import React from 'react';
import fileSize from 'filesize';
import { View, Share } from 'react-native';
import useTheme from '../../../theme/useTheme';
import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';
import { Platform } from 'react-native';
import { getContentUriAsync } from 'expo-file-system';
import { Entypo } from '@expo/vector-icons';
import {
  Menu,
  MenuOptions,
  MenuTrigger,
  renderers
} from 'react-native-popup-menu';
import Clipboard from 'expo-clipboard';
import ThemedMenuOption, { ThemedMenuSeparator } from '../../misc/ThemedMenu';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import ListItem from './ListItem';

interface Props {
  name: string;
  size: number;
  link: string;
}

const FileListItem = ({ name, size, link }: Props) => {
  const { spacing, colors } = useTheme();

  const handlePress = async () => {
    const fileUri = FileSystem.cacheDirectory + name;
    const { headers } = await FileSystem.downloadAsync(link, fileUri);

    if (Platform.OS === 'android') {
      await IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
        data: await getContentUriAsync(fileUri),
        flags: 1,
        type: headers['Content-Type']
      });
    } else if (Platform.OS === 'ios') {
      // TODO: Support iOS
    }
  };

  const handleCopyToClipboardSelect = () => {
    Clipboard.setString(link);
  };

  const handleShareSelect = async () => {
    await Share.share({ message: link });
  };

  return (
    <ListItem
      icon={<AntDesign name="file1" size={24} color={colors['primary']} />}
      name={name}
      secondary={fileSize(size)}
      onPress={handlePress}
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
              text="Export"
              icon={
                <AntDesign name="export" size={24} color={colors['text']} />
              }
            />
            <ThemedMenuSeparator />
            <ThemedMenuOption
              text="Copy link"
              icon={
                <Ionicons
                  name="clipboard-outline"
                  size={24}
                  color={colors['text']}
                />
              }
              onSelect={handleCopyToClipboardSelect}
            />
            <ThemedMenuOption
              text="Share link"
              icon={<AntDesign name="link" size={24} color={colors['text']} />}
              onSelect={handleShareSelect}
            />
          </MenuOptions>
        </Menu>
      }
    />
  );
};

export default FileListItem;
