import React from 'react';
import { ScrollView, View } from 'react-native';
import MenuAccountItem from './MenuAccountItem';
import useTheme from '../../../theme/useTheme';
import { Feather } from '@expo/vector-icons';
import ListItem from '../../misc/ListItem';
import { useApiClient } from '../../../api/useApiClient';
import { useNavigation } from '@react-navigation/native';

const Menu = () => {
  const apiClient = useApiClient();
  const navigation = useNavigation();

  const handleSignOutPress = async () => {
    await apiClient.signOut();
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  };

  const { colors } = useTheme();

  return (
    <ScrollView>
      <MenuAccountItem />
      <View
        style={{ height: 0.5, flex: 1, backgroundColor: colors.textSecondary }}
      />
      <ListItem
        icon={<Feather color={colors.text} name="log-out" size={24} />}
        onPress={handleSignOutPress}
        text="Sign out"
      />
    </ScrollView>
  );
};

export default Menu;
