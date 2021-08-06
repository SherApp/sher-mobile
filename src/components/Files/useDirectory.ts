import { useApiClient } from '../../api/useApiClient';
import { useQuery } from 'react-query';
import { errorHandler } from '../../utils/errorHandler';

export const useDirectory = (directoryId?: string) => {
  const client = useApiClient();
  const { data, isLoading, refetch } = useQuery(
    ['listDirectory', directoryId],
    () => client.listDirectory(directoryId),
    {
      onError: errorHandler
    }
  );

  return { directory: data, isLoading, refresh: refetch };
};
