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
  const [files, setFiles] = useState<EnhancedFile[]>();
  const [showShadow, setShowShadow] = useState(false);
  const apiClient = useApiClient();

  useEffect(() => {
    apiClient.getFiles().then((files) => setFiles(files));
  }, [apiClient]);

  const { spacing, gradients } = useTheme();

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setShowShadow(e.nativeEvent.contentOffset.y >= SHOW_SHADOW_MIN_OFFSET);
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <Surface card elevated={showShadow}>
        <Surface card p={[0, 2]}>
          <OutlinedTextField
            placeholder="Search"
            style={{ marginBottom: spacing(2) }}
          />
        </Surface>
        <View style={{ width: '100%', height: 2 }}>
          <LinearGradient
            colors={[gradients.primary[0], gradients.primary[1]]}
            start={[0, 0]}
            end={[1, 0]}
            style={{ flex: 1 }}
          />
        </View>
      </Surface>
      <FlatList
        data={files}
        renderItem={({ item }) => (
          <HomeFileListItem
            name={item.fileName}
            size={item.length}
            link={item.url}
          />
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
