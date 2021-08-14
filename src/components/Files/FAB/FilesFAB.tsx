import React from 'react';
import * as DocumentPicker from 'expo-document-picker';
import { useCurrentDirectoryId } from '../useCurrentDirectoryId';
import { ToastAndroid } from 'react-native';
import { useTusClient } from '../../../api/useTusClient';
import { useQueryClient } from 'react-query';
import ActionButton from 'react-native-action-button';
import useTheme from '../../../theme/useTheme';
import { Feather } from '@expo/vector-icons';

const FilesFAB = () => {
  const queryClient = useQueryClient();

  const directoryId = useCurrentDirectoryId();

  const { uploadFile } = useTusClient({
    onSuccess: () => {
      ToastAndroid.show('Upload success!', ToastAndroid.SHORT);
      queryClient.invalidateQueries('listDirectory');
    }
  });

  const handleMainPress = async () => {
    const res = await DocumentPicker.getDocumentAsync({});
    if (res.type === 'success') {
      await uploadFile(res, res.name, directoryId);
    }
  };

  const { colors } = useTheme();

  return (
    <ActionButton
      buttonColor={colors.primary}
      onPress={handleMainPress}
      renderIcon={() => <Feather size={24} name="upload-cloud" color="white" />}
      fixNativeFeedbackRadius
    />
  );
};

export default FilesFAB;
