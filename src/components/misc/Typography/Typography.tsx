import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextProps,
  TextStyle
} from 'react-native';
import useTheme from '../../../theme/useTheme';

interface Props extends TextProps {
  color?: 'text' | 'textSecondary' | 'primary' | 'button' | 'border' | 'error';
  variant?: 'h1' | 'body' | 'caption';
  style?: StyleProp<TextStyle>;
}

const Typography = ({
  variant = 'body',
  color = 'text',
  style,
  children,
  ...rest
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
      {...rest}
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
