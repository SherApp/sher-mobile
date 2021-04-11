import * as SecureStore from 'expo-secure-store';

enum SecureStoreKeys {
  JwtToken = 'JWT_TOKEN',
  RefreshToken = 'REFRESH_TOKEN'
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
