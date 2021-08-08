import useTheme from './useTheme';
import { HeaderShadowProvider } from '../components/Header/HeaderShadowContext';
import { MenuProvider } from 'react-native-popup-menu';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../screens/Home';
import Login from '../screens/Login';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { useThemeName } from './useThemeName';

const Stack = createStackNavigator();

const ThemedApp = () => {
  const theme = useTheme();
  const themeName = useThemeName();

  return (
    <>
      <StatusBar style={themeName === 'dark' ? 'light' : 'dark'} />
      <HeaderShadowProvider>
        <MenuProvider
          customStyles={{
            backdrop: { backgroundColor: 'black', opacity: 0.5 }
          }}
        >
          <NavigationContainer theme={theme}>
            <Stack.Navigator
              screenOptions={{
                headerShown: false
              }}
            >
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Login" component={Login} />
            </Stack.Navigator>
          </NavigationContainer>
        </MenuProvider>
      </HeaderShadowProvider>
    </>
  );
};

export default ThemedApp;
