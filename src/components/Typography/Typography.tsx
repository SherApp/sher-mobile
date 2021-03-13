import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native';
import useTheme from '../../theme/useTheme';

interface Props {
  color?: 'text' | 'primary' | 'button' | 'border';
  variant?: 'h1' | 'body' | 'caption';
  style?: StyleProp<TextStyle>;
}

const Typography = ({
  variant = 'body',
  color = 'text',
  style,
  children
}: React.PropsWithChildren<Props>) => {
  const { colors } = useTheme();
  return (
    <Text
      style={[
        styles[variant],
        {
          color: colors[color]
        },
        style
      ]}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  h1: {
    fontFamily: 'Oswald_400Regular',
    fontSize: 24
  },
  body: {
    fontFamily: 'Oswald_400Regular',
    fontSize: 16
  },
  caption: {
    fontFamily: 'Oswald_400Regular',
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 16 * 0.1
  }
});

export default Typography;
