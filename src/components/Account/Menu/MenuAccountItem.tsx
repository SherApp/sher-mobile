import React from 'react';
import { useQuery } from 'react-query';
import { useApiClient } from '../../../api/useApiClient';
import { View } from 'react-native';
import useTheme from '../../../theme/useTheme';
import { getSavedBaseUrl } from '../../../api/apiClientUtils';
import ListItem from '../../misc/ListItem';
import Icon from '../../misc/Icon';

const MenuAccountItem = () => {
  const apiClient = useApiClient();

  const { data: user } = useQuery('user', () => apiClient.getUser());

  const { data: instanceUrl } = useQuery('instanceUrl', () =>
    getSavedBaseUrl()
  );

  const { spacing } = useTheme();

  return (
    <View style={{ paddingVertical: spacing(1) }}>
      <ListItem
        text="Email"
        secondaryText={user?.emailAddress ?? ''}
        icon={<Icon name="mail" />}
      />
      <ListItem
        text="Connected instance URL"
        secondaryText={instanceUrl ?? ''}
        icon={<Icon name="link" />}
      />
    </View>
  );
};

export default MenuAccountItem;
