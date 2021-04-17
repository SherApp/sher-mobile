import React from 'react';
import fileSize from 'filesize';
import { View, StyleSheet, TouchableOpacity, Share } from 'react-native';
import UploadedFileIcon from '../../../assets/svg/UploadedFileIcon';
import Typography from '../misc/Typography';
import useTheme from '../../theme/useTheme';
import Surface from '../misc/Surface';
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
import ThemedMenuOption, { ThemedMenuSeparator } from '../misc/ThemedMenu';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  name: string;
  size: number;
  link: string;
}

const HomeFileListItem = ({ name, size, link }: Props) => {
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
    <TouchableOpacity onPress={handlePress}>
      <Surface m={[1, 0]} style={styles.container}>
        <View style={styles.iconContainer}>
          <UploadedFileIcon />
        </View>
        <View style={{ marginLeft: spacing(3.5), flex: 1 }}>
          <Typography>{name}</Typography>
          <Typography color="textSecondary">{fileSize(size)}</Typography>
        </View>
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
      </Surface>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconContainer: {
    aspectRatio: 1,
    height: 32
  }
});

export default HomeFileListItem;
