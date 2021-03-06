import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Surface from '../../misc/Surface/Surface';
import Typography from '../../misc/Typography';
import React from 'react';
import useTheme from '../../../theme/useTheme';
import { TypographyProps } from '../Typography/Typography';

export interface ListItemProps {
  icon?: React.ReactNode;
  text?: string;
  secondaryText?: string;
  onPress?(): void;
  menu?: React.ReactNode;
  TypographyProps?: TypographyProps;
}

const ListItem = ({
  icon,
  text,
  secondaryText,
  onPress,
  menu,
  TypographyProps
}: ListItemProps) => {
  const { spacing } = useTheme();

  const content = (
    <Surface m={[1, 0]} p={[0, 1]} style={styles.container}>
      <View style={[styles.iconContainer, { marginLeft: spacing(1) }]}>
        {icon}
      </View>
      <View style={{ marginLeft: spacing(2), flex: 1 }}>
        <Typography numberOfLines={1} {...TypographyProps}>
          {text}
        </Typography>
        {typeof secondaryText === 'string' && (
          <Typography numberOfLines={1} color="textSecondary">
            {secondaryText}
          </Typography>
        )}
      </View>
      {menu}
    </Surface>
  );

  if (onPress) {
    return <TouchableOpacity onPress={onPress}>{content}</TouchableOpacity>;
  }

  return content;
};

const styles = StyleSheet.create({
  container: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconContainer: {
    justifyContent: 'center',
    aspectRatio: 1,
    height: 32
  }
});

export default ListItem;
