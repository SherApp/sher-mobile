import React from 'react';
import ListItem, { ListItemProps } from '../ListItem/ListItem';
import Icon from '../Icon';

interface Props extends Omit<ListItemProps, 'menu' | 'icon'> {
  icon: React.ComponentProps<typeof Icon>['name'];
}

const SettingsItem = ({ text, secondaryText, icon, onPress }: Props) => {
  return (
    <ListItem
      text={text}
      secondaryText={secondaryText}
      icon={<Icon name={icon} />}
      onPress={onPress}
    />
  );
};

export default SettingsItem;
