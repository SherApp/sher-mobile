import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

enum SecureStoreKeys {
  JwtToken = 'JWT_TOKEN',
  RefreshToken = 'REFRESH_TOKEN'
}

enum AsyncStoreKeys {
  BaseUrl = 'API_BASE_URL'
}

export const saveTokens = async (jwtToken: string, refreshToken: string) => {
  await SecureStore.setItemAsync(SecureStoreKeys.JwtToken, jwtToken);
  await SecureStore.setItemAsync(SecureStoreKeys.RefreshToken, refreshToken);
};

export const getSavedJwtToken = async () => {
  return await SecureStore.getItemAsync(SecureStoreKeys.JwtToken);
};

export const getSavedRefreshToken = async () => {
  return await SecureStore.getItemAsync(SecureStoreKeys.RefreshToken);
};

export const getSavedBaseUrl = async () => {
  return await AsyncStorage.getItem(AsyncStoreKeys.BaseUrl);
};

export const saveBaseUrl = async (baseUrl: string) => {
  await AsyncStorage.setItem(AsyncStoreKeys.BaseUrl, baseUrl);
};
