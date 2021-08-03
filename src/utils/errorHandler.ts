import { AxiosError } from 'axios';
import Toast from 'react-native-root-toast';

export const errorHandler = (error: AxiosError) => {
  let errorText = error.response?.data?.message ?? error.message;

  if (error.response?.status) {
    errorText += ` (${error.response?.status})`;
  }

  Toast.show(`Error: ${errorText}`, {
    duration: Toast.durations.LONG
  });
};
