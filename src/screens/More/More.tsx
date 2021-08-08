import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MoreContent from '../../components/More';
import { HeaderTitle } from '../../components/Header';

const MoreStack = createStackNavigator();

const More = () => {
  return (
    <MoreStack.Navigator
      screenOptions={{
        headerTitle: (props) => <HeaderTitle {...props} />
      }}
    >
      <MoreStack.Screen name="More" component={MoreContent} />
    </MoreStack.Navigator>
  );
};

export default More;
