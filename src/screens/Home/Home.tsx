import React, { useEffect, useState } from 'react';
import { UserFile } from '@sherapp/sher-shared/browseFiles';
import { useApiClient } from '../../api/useApiClient';
import { View, FlatList, StyleSheet } from 'react-native';
import HomeFileListItem from '../../components/Home/HomeFileListItem';
import useTheme from '../../theme/useTheme';
import OutlinedTextField from '../../components/misc/TextField/OutlinedTextField';

const Home = () => {
  const [files, setFiles] = useState<UserFile[]>();
  const apiClient = useApiClient();

  useEffect(() => {
    apiClient.getFiles().then((files) => setFiles(files));
  }, [apiClient]);

  const { spacing } = useTheme();

  return (
    <View style={[styles.container, { marginHorizontal: spacing(2) }]}>
      <OutlinedTextField
        placeholder="Search"
        style={{ marginVertical: spacing(2) }}
      />
      <FlatList
        data={files}
        renderItem={({ item }) => (
          <HomeFileListItem name={item.fileName} size={item.length} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default Home;
