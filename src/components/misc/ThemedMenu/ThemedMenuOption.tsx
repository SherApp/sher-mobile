import useTheme from '../../../theme/useTheme';
import { StyleSheet, View } from 'react-native';
import { MenuOption, MenuOptionProps } from 'react-native-popup-menu';
import React from 'react';
import Typography from '../Typography';
import Icon from '../Icon';
import { TypographyColor } from '../Typography/Typography';

interface Props extends MenuOptionProps {
  text: string;
  icon?: React.ComponentProps<typeof Icon>['name'];
  color?: TypographyColor;
}

const ThemedMenuOption = (
  { text, icon, color, style, ...rest }: Props,
  ref: any
) => {
  const { colors, spacing } = useTheme();

  return (
    <MenuOption
      style={[
        {
          padding: spacing(2),
          backgroundColor: colors.card
        },
        style
      ]}
      ref={ref}
      {...rest}
    >
      <View style={styles.container}>
        <View style={{ marginRight: spacing(1.5) }}>
          {icon && <Icon name={icon} color={color} />}
        </View>
        <Typography color={color}>{text}</Typography>
      </View>
    </MenuOption>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export default React.forwardRef(ThemedMenuOption);
