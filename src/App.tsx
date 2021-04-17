import React from 'react';
import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './screens/Login';
import { AppearanceProvider } from 'react-native-appearance';
import { Sacramento_400Regular, useFonts } from '@expo-google-fonts/sacramento';
import { Oswald_400Regular } from '@expo-google-fonts/oswald';
import useTheme from './theme/useTheme';
import Home from './screens/Home';
import { HeaderTitle } from './components/Header';
import { MenuProvider } from 'react-native-popup-menu';

const Stack = createStackNavigator();

function App() {
  const [fontsLoaded] = useFonts({
    Sacramento_400Regular,
    Oswald_400Regular
  });

  const theme = useTheme();

  // TODO: Show a splashscreen
  if (!fontsLoaded) return null;

  return (
    <AppearanceProvider>
      <MenuProvider>
        <NavigationContainer theme={theme}>
          <Stack.Navigator
            screenOptions={{
              headerTitle: (props) => <HeaderTitle {...props} />
            }}
          >
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                title: 'My files',
                headerStyle: {
                  elevation: 0,
                  shadowOpacity: 0
                }
              }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerShown: false
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </MenuProvider>
    </AppearanceProvider>
  );
}

export default registerRootComponent(App);
