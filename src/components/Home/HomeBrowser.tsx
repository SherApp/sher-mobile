import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import React, { useState } from 'react';
import HomeSearch from './HomeSearch';
import { useDirectory } from './useDirectory';
import { useFileSearch } from './useFileSearch';
import DirectoryContentsBrowser from './DirectoryContentsBrowser/DirectoryContentsBrowser';
import { useCurrentDirectoryId } from './useCurrentDirectoryId';
import { useHeaderShadow } from '../Header/HeaderShadowContext';

const SHOW_SHADOW_MIN_OFFSET = 20;

interface Props {
  showSearch?: boolean;
}

const HomeBrowser = ({ showSearch }: Props) => {
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

  if (!directory) return null;

  const isSearching = searchQuery !== '';

  return (
    <>
      <HomeSearch
        value={searchQuery}
        onChange={handleSearchChange}
        visible={showSearch}
      />
      <DirectoryContentsBrowser
        directories={isSearching ? [] : directory.directories}
        files={isSearching ? files : directory.files}
        onScroll={handleScroll}
        onRefresh={
          !searchQuery || searchQuery === '' ? handleRefresh : undefined
        }
        refreshing={isLoadingDir || isLoadingSearch}
      />
    </>
  );
};

export default HomeBrowser;
