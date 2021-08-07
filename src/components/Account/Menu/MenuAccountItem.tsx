import React from 'react';
import { useQuery } from 'react-query';
import { useApiClient } from '../../../api/useApiClient';
import { View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import useTheme from '../../../theme/useTheme';
import { getSavedBaseUrl } from '../../../api/apiClientUtils';
import ListItem from '../../misc/ListItem';

const MenuAccountItem = () => {
  const apiClient = useApiClient();

  const { data: user } = useQuery('user', () => apiClient.getUser());

  const { data: instanceUrl } = useQuery('instanceUrl', () =>
    getSavedBaseUrl()
  );

  const { colors, spacing } = useTheme();

  return (
    <View style={{ paddingVertical: spacing(1) }}>
      <ListItem
        text="Email"
        secondaryText={user?.emailAddress ?? ''}
        icon={<Feather name="mail" size={24} color={colors.text} />}
      />
      <ListItem
        text="Connected instance URL"
        secondaryText={instanceUrl ?? ''}
        icon={<Feather name="link" size={24} color={colors.text} />}
      />
    </View>
  );
};

export default MenuAccountItem;
