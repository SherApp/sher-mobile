import { AxiosRequestConfig } from 'axios';
import { getSavedJwtToken } from './apiClientUtils';

export const authTokenInterceptor = async (value: AxiosRequestConfig) => {
  const accessToken = await getSavedJwtToken();
  value.headers.Authorization = `Bearer ${accessToken}`;
  return value;
};
