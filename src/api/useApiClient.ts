import { useNavigation } from '@react-navigation/native';
import { ApiClient } from './apiClient';
import { useMemo } from 'react';

export const useApiClient = () => {
  const navigation = useNavigation();
  return useMemo(
    () =>
      new ApiClient(() => {
        navigation.navigate('Login');
      }),
    [navigation]
  );
};
