import { useThemeSettings } from './ThemeSettingsProvider';
import { useColorScheme } from 'react-native-appearance';

export const useThemeName = () => {
  const themeSettings = useThemeSettings();

  let scheme = themeSettings.theme;

  const systemScheme = useColorScheme();

  if (scheme === 'no-preference') {
    scheme = systemScheme;
  }

  return scheme === 'dark' ? 'dark' : 'light';
};
