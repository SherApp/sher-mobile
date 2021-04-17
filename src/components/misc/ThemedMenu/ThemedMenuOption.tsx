import useTheme from '../../../theme/useTheme';
import { StyleSheet, Text, View } from 'react-native';
import { MenuOption, MenuOptionProps } from 'react-native-popup-menu';
import React from 'react';

interface Props extends MenuOptionProps {
  text: string;
  icon?: JSX.Element;
}

const ThemedMenuOption = ({ text, icon, style, ...rest }: Props, ref: any) => {
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
        <View style={{ marginRight: spacing(1.5) }}>{icon}</View>
        <Text style={{ color: colors.text }}>{text}</Text>
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
