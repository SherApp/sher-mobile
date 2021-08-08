import React from 'react';
import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';
import { Sacramento_400Regular, useFonts } from '@expo-google-fonts/sacramento';
import { Oswald_400Regular } from '@expo-google-fonts/oswald';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RootSiblingParent } from 'react-native-root-siblings';
import { ThemeSettingsProvider } from './theme/ThemeSettingsProvider';
import ThemedApp from './theme/ThemedApp';
import { AppearanceProvider } from 'react-native-appearance';

const queryClient = new QueryClient();

function App() {
  const [fontsLoaded] = useFonts({
    Sacramento_400Regular,
    Oswald_400Regular
  });

  // TODO: Show a splashscreen
  if (!fontsLoaded) return null;

  return (
    <RootSiblingParent>
      <QueryClientProvider client={queryClient}>
        <ThemeSettingsProvider>
          <AppearanceProvider>
            <ThemedApp />
          </AppearanceProvider>
        </ThemeSettingsProvider>
      </QueryClientProvider>
    </RootSiblingParent>
  );
}

export default registerRootComponent(App);
