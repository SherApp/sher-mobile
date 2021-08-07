import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import More from '../More';
import Files from '../Files';
import { Feather } from '@expo/vector-icons';
import Account from '../Account';

const Tab = createBottomTabNavigator();

const Home = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: {
          fontFamily: 'Oswald_400Regular'
        }
      }}
    >
      <Tab.Screen
        name="Files"
        component={Files}
        options={{
          title: 'My files',
          tabBarIcon: ({ size, color }) => (
            <Feather name="folder" size={size} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="user" size={size} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="More"
        component={More}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="more-horizontal" size={size} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  );
};

export default Home;
