import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { HeaderTitle } from '../../components/Header';
import FilesContent from '../../components/Files/FilesContent';

const FilesStack = createStackNavigator();

const Files = () => {
  return (
    <FilesStack.Navigator
      screenOptions={{ headerTitle: (props) => <HeaderTitle {...props} /> }}
    >
      <FilesStack.Screen name="Files" component={FilesContent} />
    </FilesStack.Navigator>
  );
};

export default Files;
