import { useNavigation } from '@react-navigation/native';
import { ApiClient } from './apiClient';
import { useMemo } from 'react';
import Toast from 'react-native-root-toast';

export const useApiClient = () => {
  const navigation = useNavigation();
  return useMemo(
    () =>
      new ApiClient(() => {
        Toast.show('Session expired', { duration: Toast.durations.LONG });
        navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
      }),
    [navigation]
  );
};
