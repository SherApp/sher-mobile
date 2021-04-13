import React from 'react';
import fileSize from 'filesize';
import { View, StyleSheet } from 'react-native';
import UploadedFileIcon from '../../../assets/svg/UploadedFileIcon';
import Typography from '../misc/Typography';
import useTheme from '../../theme/useTheme';

interface Props {
  name: string;
  size: number;
}

const HomeFileListItem = ({ name, size }: Props) => {
  const { spacing } = useTheme();

  return (
    <View style={[styles.container, { marginVertical: spacing(1) }]}>
      <View style={styles.iconContainer}>
        <UploadedFileIcon />
      </View>
      <View style={{ marginLeft: spacing(3.5) }}>
        <Typography>{name}</Typography>
        <Typography color="textSecondary">{fileSize(size)}</Typography>
      </View>
    </View>
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
