import { EnhancedFile } from '../../../api/apiClient';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent
} from 'react-native';
import FileListItem from './FileListItem';
import React from 'react';
import useTheme from '../../../theme/useTheme';
import DirectoryListItem from './DirectoryListItem';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Directory } from '@sherapp/sher-shared';

interface Props {
  directories: Directory[];
  files: EnhancedFile[];
  onScroll(e: NativeSyntheticEvent<NativeScrollEvent>): void;
  onRefresh?(): void;
  refreshing: boolean;
}

const DirectoryContentsBrowser = ({
  directories,
  files,
  onScroll,
  onRefresh,
  refreshing
}: Props) => {
  const { spacing } = useTheme();
  const navigation = useNavigation<StackNavigationProp<any>>();

  const handleDirectoryPress = (directoryId: string) => {
    navigation.push('Home', {
      directoryId
    });
  };

  const data = [...directories, ...files].filter((i) => !i.isDeleted);

  return (
    <FlatList
      data={data}
      renderItem={({ item }) =>
        'fileName' in item ? (
          <FileListItem
            name={item.fileName}
            size={item.length}
            link={item.url}
          />
        ) : (
          <DirectoryListItem
            id={item.id}
            name={item.name}
            onPress={() => handleDirectoryPress(item.id)}
          />
        )
      }
      style={{ paddingHorizontal: spacing(2) }}
      onScroll={onScroll}
      onRefresh={onRefresh}
      refreshing={refreshing}
      scrollEventThrottle={100}
    />
  );
};

export default DirectoryContentsBrowser;
