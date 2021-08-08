import { darkTheme, defaultTheme } from './themes';
import { useThemeName } from './useThemeName';

const useTheme = () => {
  const scheme = useThemeName();

  if (scheme === 'dark') {
    return darkTheme;
  } else {
    return defaultTheme;
  }
};

export default useTheme;
