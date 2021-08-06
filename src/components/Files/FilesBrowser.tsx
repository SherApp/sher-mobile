import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import React, { useState } from 'react';
import FilesSearch from './FilesSearch';
import { useDirectory } from './useDirectory';
import { useFileSearch } from './useFileSearch';
import DirectoryContentsBrowser from './DirectoryContentsBrowser/DirectoryContentsBrowser';
import { useCurrentDirectoryId } from './useCurrentDirectoryId';
import { useHeaderShadow } from '../Header/HeaderShadowContext';

const SHOW_SHADOW_MIN_OFFSET = 20;

interface Props {
  showSearch?: boolean;
}

const FilesBrowser = ({ showSearch }: Props) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { setShadowVisible: setHeaderShadowVisible } = useHeaderShadow();

  const directoryId = useCurrentDirectoryId();

  const { directory, isLoading: isLoadingDir, refresh } = useDirectory(
    directoryId
  );

  const { files = [], isLoading: isLoadingSearch } = useFileSearch(searchQuery);

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
  };

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const visible = e.nativeEvent.contentOffset.y >= SHOW_SHADOW_MIN_OFFSET;
    setHeaderShadowVisible?.(visible);
  };

  const handleRefresh = () => {
    refresh();
  };

  const isSearching = searchQuery !== '';

  return (
    <>
      <FilesSearch
        value={searchQuery}
        onChange={handleSearchChange}
        visible={showSearch}
      />
      <DirectoryContentsBrowser
        directories={isSearching ? [] : directory?.directories}
        files={isSearching ? files : directory?.files}
        onScroll={handleScroll}
        onRefresh={
          !searchQuery || searchQuery === '' ? handleRefresh : undefined
        }
        refreshing={isLoadingDir || isLoadingSearch}
      />
    </>
  );
};

export default FilesBrowser;
