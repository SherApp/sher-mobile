import React from 'react';
import { FloatingAction } from 'react-native-floating-action';
import * as DocumentPicker from 'expo-document-picker';
import { useCurrentDirectoryId } from '../useCurrentDirectoryId';
import { ToastAndroid } from 'react-native';
import { useTusClient } from '../../../api/useTusClient';

const HomeFAB = () => {
  const directoryId = useCurrentDirectoryId();
  const { uploadFile } = useTusClient({
    onSuccess: () => {
      ToastAndroid.show('Upload success!', ToastAndroid.SHORT);
    }
  });

  const handleMainPress = async () => {
    const res = await DocumentPicker.getDocumentAsync({});
    if (res.type === 'success') {
      await uploadFile(res, directoryId);
    }
  };

  return <FloatingAction onPressMain={handleMainPress} />;
};

export default HomeFAB;
