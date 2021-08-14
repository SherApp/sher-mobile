import React from 'react';
import fileSize from 'filesize';
import { View, Share } from 'react-native';
import useTheme from '../../../theme/useTheme';
import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';
import { Platform } from 'react-native';
import { getContentUriAsync } from 'expo-file-system';
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
import Toast from 'react-native-root-toast';
import FileIcon from './FileIcon';
import Icon from '../../misc/Icon';

interface Props {
  id: string;
  name: string;
  contentType: string;
  size: number;
  link: string;
}

const FileListItem = ({ id, name, contentType, size, link }: Props) => {
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
      try {
        await IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
          data: await getContentUriAsync(fileUri),
          flags: 1,
          type: headers['Content-Type']
        });
      } catch (e) {
        if (
          e.message.includes(
            'ExpoIntentLauncher: No Activity found to handle Intent'
          )
        ) {
          Toast.show('No installed app can open this file', {
            duration: Toast.durations.LONG
          });
        } else {
          throw e;
        }
      }
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
      icon={<FileIcon contentType={contentType} />}
      text={name}
      secondaryText={fileSize(size)}
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
              text="Download"
              icon="download"
              onSelect={handleDownloadSelect}
            />
            <ThemedMenuSeparator />
            <ThemedMenuOption
              text="Copy link"
              icon="clipboard"
              onSelect={handleCopyToClipboardSelect}
            />
            <ThemedMenuOption
              text="Share link"
              icon="link"
              onSelect={handleShareSelect}
            />
            <ThemedMenuSeparator />
            <ThemedMenuOption
              text="Delete"
              icon="trash-2"
              color="error"
              onSelect={handleDeleteSelect}
            />
          </MenuOptions>
        </Menu>
      }
    />
  );
};

export default FileListItem;
