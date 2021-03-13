import { useColorScheme } from 'react-native-appearance';
import { darkTheme, defaultTheme } from './themes';

const useTheme = () => {
  const colorScheme = useColorScheme();
  if (colorScheme === 'dark') {
    return darkTheme;
  } else {
    return defaultTheme;
  }
};

export default useTheme;
