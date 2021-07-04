import React, { useEffect, useState } from 'react';
import { useApiClient } from '../../api/useApiClient';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View
} from 'react-native';
import HomeFileListItem from '../../components/Home/HomeFileListItem';
import useTheme from '../../theme/useTheme';
import OutlinedTextField from '../../components/misc/TextField/OutlinedTextField';
import { StatusBar } from 'expo-status-bar';
import Surface from '../../components/misc/Surface';
import { LinearGradient } from 'expo-linear-gradient';
import { EnhancedFile } from '../../api/apiClient';

const SHOW_SHADOW_MIN_OFFSET = 20;

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>();
  const [files, setFiles] = useState<EnhancedFile[]>();
  const [showShadow, setShowShadow] = useState(false);
  const apiClient = useApiClient();

  const loadFiles = async (query?: string) => {
    const criteria = query ? { requiredFileNamePart: query } : undefined;
    const files = await apiClient.getFiles(criteria);
    setFiles(files);
  };

  const refreshFiles = async () => {
    setRefreshing(true);

    try {
      await loadFiles();
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadFiles(searchQuery);
  }, [searchQuery]);

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
  };

  const { spacing, gradients } = useTheme();

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setShowShadow(e.nativeEvent.contentOffset.y >= SHOW_SHADOW_MIN_OFFSET);
  };

  const filteredOutFiles = files?.filter((f) => !f.isDeleted);

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <Surface card elevated={showShadow}>
        <Surface card p={[0, 2]}>
          <OutlinedTextField
            placeholder="Search"
            style={{ marginBottom: spacing(2) }}
            value={searchQuery}
            onChangeText={handleSearchChange}
          />
        </Surface>
        <View style={{ width: '100%', height: 2 }}>
          <LinearGradient
            colors={gradients.primary}
            start={[0, 0]}
            end={[1, 0]}
            style={{ flex: 1 }}
          />
        </View>
      </Surface>
      <FlatList
        data={filteredOutFiles}
        renderItem={({ item }) => (
          <HomeFileListItem
            name={item.fileName}
            size={item.length}
            link={item.url}
          />
        )}
        style={{ paddingHorizontal: spacing(2) }}
        onScroll={handleScroll}
        onRefresh={
          !searchQuery || searchQuery === '' ? refreshFiles : undefined
        }
        refreshing={refreshing}
        scrollEventThrottle={100}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden'
  }
});

export default Home;
