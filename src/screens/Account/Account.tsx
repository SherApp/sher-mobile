import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AccountContent from '../../components/Account/AccountContent';
import { HeaderTitle } from '../../components/Header';

const AccountStack = createStackNavigator();

const Account = () => {
  return (
    <AccountStack.Navigator
      screenOptions={{
        headerTitle: (props) => <HeaderTitle {...props} />
      }}
    >
      <AccountStack.Screen name="Account" component={AccountContent} />
    </AccountStack.Navigator>
  );
};

export default Account;
