import { useApiClient } from '../../api/useApiClient';
import { useQuery } from 'react-query';

export const useDirectory = (directoryId?: string) => {
  const client = useApiClient();
  const { data, isLoading, refetch } = useQuery(
    ['listDirectory', directoryId],
    () => client.listDirectory(directoryId)
  );

  return { directory: data, isLoading, refresh: refetch };
};
