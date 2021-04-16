import React from 'react';
import fileSize from 'filesize';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import UploadedFileIcon from '../../../assets/svg/UploadedFileIcon';
import Typography from '../misc/Typography';
import useTheme from '../../theme/useTheme';
import Surface from '../misc/Surface';
import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';
import { Platform } from 'react-native';
import { getContentUriAsync } from 'expo-file-system';
import { Entypo } from '@expo/vector-icons';

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
        <TouchableOpacity>
          <Entypo
            name="dots-three-vertical"
            size={8 * 2}
            style={{ color: colors['text'] }}
          />
        </TouchableOpacity>
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
