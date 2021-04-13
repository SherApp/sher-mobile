import React from 'react';
import fileSize from 'filesize';
import { View, StyleSheet } from 'react-native';
import UploadedFileIcon from '../../../assets/svg/UploadedFileIcon';
import Typography from '../misc/Typography';
import useTheme from '../../theme/useTheme';
import Surface from '../misc/Surface';

interface Props {
  name: string;
  size: number;
}

const HomeFileListItem = ({ name, size }: Props) => {
  const { spacing } = useTheme();

  return (
    <Surface m={[1, 0]} style={styles.container}>
      <View style={styles.iconContainer}>
        <UploadedFileIcon />
      </View>
      <View style={{ marginLeft: spacing(3.5) }}>
        <Typography>{name}</Typography>
        <Typography color="textSecondary">{fileSize(size)}</Typography>
      </View>
    </Surface>
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
