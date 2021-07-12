import { useApiClient } from './useApiClient';
import { getSavedBaseUrl, getSavedJwtToken } from './apiClientUtils';
import * as tus from 'tus-js-client';
import { config } from '../utils/config';
import { UploadOptions } from 'tus-js-client';

type UseFileUploadOptions = Pick<
  UploadOptions,
  'onProgress' | 'onError' | 'onSuccess'
>;

export const useTusClient = (options: UseFileUploadOptions = {}) => {
  const apiClient = useApiClient();

  const uploadFile = async (file: any, directoryId?: string) => {
    const url = await getSavedBaseUrl();

    if (!url) {
      throw new Error("Base url isn't set");
    }

    await apiClient.refreshToken();
    const authToken = await getSavedJwtToken();

    let shouldRefreshToken = false;

    const upload = new tus.Upload(file, {
      endpoint: new URL(`/api${config.api.endpoints.fileUpload}`, url).href,
      metadata: {
        directoryId: directoryId ?? ''
      },
      onError: (e) => console.error(e),
      onBeforeRequest: async () => {
        if (shouldRefreshToken) {
          await apiClient.refreshToken();
        }
      },
      onShouldRetry: (err: any) => {
        const statusCode = err.originalResponse?.getStatus() ?? 0;

        if (statusCode === 401) {
          shouldRefreshToken = true;
          return true;
        }

        return false;
      },
      headers: {
        Authorization: `Bearer ${authToken}`
      },
      ...options
    });

    upload.start();
  };

  return { uploadFile };
};
