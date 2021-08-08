import React from 'react';
import ListItem, { ListItemProps } from '../ListItem/ListItem';
import { Feather } from '@expo/vector-icons';
import useTheme from '../../../theme/useTheme';

interface Props extends Omit<ListItemProps, 'menu' | 'icon'> {
  icon: React.ComponentProps<typeof Feather>['name'];
}

const SettingsItem = ({ text, secondaryText, icon, onPress }: Props) => {
  const { colors } = useTheme();

  return (
    <ListItem
      text={text}
      secondaryText={secondaryText}
      icon={<Feather name={icon} size={24} color={colors.text} />}
      onPress={onPress}
    />
  );
};

export default SettingsItem;
