import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ThemeOption = 'dark' | 'light' | 'no-preference';

interface ThemeContextType {
  theme?: 'dark' | 'light' | 'no-preference';
  setTheme?(theme: ThemeOption): Promise<void>;
}

const ThemeContext = React.createContext<ThemeContextType>({});

export const useThemeSettings = () => React.useContext(ThemeContext);

export const ThemeSettingsProvider = ({
  children
}: React.PropsWithChildren<{}>) => {
  const queryClient = useQueryClient();

  const { data: theme, isLoading } = useQuery('theme', () =>
    AsyncStorage.getItem('theme')
  );

  const setThemeMutation = useMutation(
    (theme: ThemeOption) => AsyncStorage.setItem('theme', theme),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries('theme');
      }
    }
  );

  const setTheme = async (theme: ThemeOption) => {
    await setThemeMutation.mutateAsync(theme);
  };

  if (isLoading) return null;

  return (
    <ThemeContext.Provider
      value={{ theme: (theme ?? 'no-preference') as ThemeOption, setTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
