import React, { useEffect, useState } from 'react';
import { UserFile } from '@sherapp/sher-shared/browseFiles';
import { useApiClient } from '../../api/useApiClient';
import { View, Text } from 'react-native';

const Home = () => {
  const [files, setFiles] = useState<UserFile[]>();
  const apiClient = useApiClient();

  useEffect(() => {
    apiClient.getFiles().then((files) => setFiles(files));
  }, [apiClient]);

  return (
    <View>
      {files?.map((f) => (
        <View key={f.id}>
          <Text>{f.fileName}</Text>
        </View>
      ))}
    </View>
  );
};

export default Home;
