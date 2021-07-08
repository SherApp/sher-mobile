import { useRoute } from '@react-navigation/native';

interface RouteParams {
  directoryId: string;
}

export const useCurrentDirectoryId = () => {
  const { params } = useRoute();

  return (params as RouteParams)?.directoryId;
};
