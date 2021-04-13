import React, { useEffect, useState } from 'react';
import { UserFile } from '@sherapp/sher-shared/browseFiles';
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

const SHOW_SHADOW_MIN_OFFSET = 20;

const Home = () => {
  const [files, setFiles] = useState<UserFile[]>();
  const [showShadow, setShowShadow] = useState(false);
  const apiClient = useApiClient();

  useEffect(() => {
    apiClient.getFiles().then((files) => setFiles(files));
  }, [apiClient]);

  const { spacing } = useTheme();

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setShowShadow(e.nativeEvent.contentOffset.y >= SHOW_SHADOW_MIN_OFFSET);
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <Surface p={[0, 2]} elevated={showShadow}>
        <OutlinedTextField
          placeholder="Search"
          style={{ marginBottom: spacing(2) }}
        />
      </Surface>
      <FlatList
        data={files}
        renderItem={({ item }) => (
          <HomeFileListItem name={item.fileName} size={item.length} />
        )}
        style={{ paddingHorizontal: spacing(2) }}
        onScroll={handleScroll}
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
