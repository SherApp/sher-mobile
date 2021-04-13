import React, { useEffect, useState } from 'react';
import { UserFile } from '@sherapp/sher-shared/browseFiles';
import { useApiClient } from '../../api/useApiClient';
import { FlatList, StyleSheet, View } from 'react-native';
import HomeFileListItem from '../../components/Home/HomeFileListItem';
import useTheme from '../../theme/useTheme';
import OutlinedTextField from '../../components/misc/TextField/OutlinedTextField';
import { StatusBar } from 'expo-status-bar';
import Surface from '../../components/misc/Surface';

const Home = () => {
  const [files, setFiles] = useState<UserFile[]>();
  const apiClient = useApiClient();

  useEffect(() => {
    apiClient.getFiles().then((files) => setFiles(files));
  }, [apiClient]);

  const { spacing } = useTheme();

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <Surface p={[0, 2]} style={styles.top}>
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
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden'
  },
  top: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowRadius: 10,
    elevation: 3,
    backgroundColor: 'white'
  }
});

export default Home;
