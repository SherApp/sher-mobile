import { useApiClient } from '../../api/useApiClient';
import { useQuery } from 'react-query';

export const useFileSearch = (requiredFileNamePart: string) => {
  const apiClient = useApiClient();
  const { data, isLoading } = useQuery(['search', requiredFileNamePart], () =>
    apiClient.getFiles({ requiredFileNamePart })
  );

  return { files: data, isLoading };
};
