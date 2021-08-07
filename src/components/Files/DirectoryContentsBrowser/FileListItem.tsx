import React from 'react';
import fileSize from 'filesize';
import { View, Share } from 'react-native';
import useTheme from '../../../theme/useTheme';
import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';
import { Platform } from 'react-native';
import { getContentUriAsync } from 'expo-file-system';
import { Feather } from '@expo/vector-icons';
import {
  Menu,
  MenuOptions,
  MenuTrigger,
  renderers
} from 'react-native-popup-menu';
import Clipboard from 'expo-clipboard';
import ThemedMenuOption, { ThemedMenuSeparator } from '../../misc/ThemedMenu';
import ListItem from '../../misc/ListItem';
import { useApiClient } from '../../../api/useApiClient';
import { useMutation, useQueryClient } from 'react-query';
import * as Linking from 'expo-linking';

interface Props {
  id: string;
  name: string;
  size: number;
  link: string;
}

const FileListItem = ({ id, name, size, link }: Props) => {
  const apiClient = useApiClient();
  const queryClient = useQueryClient();

  const deleteFileMutation = useMutation(() => apiClient.deleteFile(id), {
    onSuccess: async () => {
      await queryClient.invalidateQueries('listDirectory');
    }
  });

  const { spacing, colors } = useTheme();

  const handleDownloadSelect = async () => {
    await Linking.openURL(link);
  };

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

  const handleDeleteSelect = async () => {
    await deleteFileMutation.mutateAsync();
  };

  return (
    <ListItem
      icon={<Feather name="file" size={24} color={colors['primary']} />}
      text={name}
      secondaryText={fileSize(size)}
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
              text="Download"
              icon={
                <Feather name="download" size={24} color={colors['text']} />
              }
              onSelect={handleDownloadSelect}
            />
            <ThemedMenuSeparator />
            <ThemedMenuOption
              text="Copy link"
              icon={
                <Feather name="clipboard" size={24} color={colors['text']} />
              }
              onSelect={handleCopyToClipboardSelect}
            />
            <ThemedMenuOption
              text="Share link"
              icon={<Feather name="link" size={24} color={colors['text']} />}
              onSelect={handleShareSelect}
            />
            <ThemedMenuSeparator />
            <ThemedMenuOption
              text="Delete"
              icon={<Feather name="trash-2" size={24} color={colors['text']} />}
              onSelect={handleDeleteSelect}
            />
          </MenuOptions>
        </Menu>
      }
    />
  );
};

export default FileListItem;
