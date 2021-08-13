import { EnhancedFile } from '../../../api/apiClient';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet
} from 'react-native';
import FileListItem from './FileListItem';
import React from 'react';
import DirectoryListItem from './DirectoryListItem';
import { Directory } from '@sherapp/sher-shared';

interface Props {
  directories?: Directory[];
  files?: EnhancedFile[];
  onScroll(e: NativeSyntheticEvent<NativeScrollEvent>): void;
  onRefresh?(): void;
  refreshing: boolean;
}

const DirectoryContentsBrowser = ({
  directories = [],
  files = [],
  onScroll,
  onRefresh,
  refreshing
}: Props) => {
  const data = [...directories, ...files];

  return (
    <FlatList
      data={data}
      renderItem={({ item }) =>
        'fileName' in item ? (
          <FileListItem
            id={item.id}
            name={item.fileName}
            contentType={item.contentType}
            size={item.length}
            link={item.url}
          />
        ) : (
          <DirectoryListItem id={item.id} name={item.name} />
        )
      }
      onScroll={onScroll}
      onRefresh={onRefresh}
      refreshing={refreshing}
      scrollEventThrottle={100}
      style={styles.root}
    />
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1
  }
});

export default DirectoryContentsBrowser;
