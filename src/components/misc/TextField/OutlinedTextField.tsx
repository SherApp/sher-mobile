import React from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';
import useTheme from '../../../theme/useTheme';

interface Props extends TextInputProps {
  placeholder: string;
}

const OutlinedTextField = ({ placeholder, style, ...rest }: Props) => {
  const { colors, spacing } = useTheme();

  return (
    <TextInput
      style={[
        {
          backgroundColor: colors['border'],
          paddingHorizontal: spacing(2),
          paddingVertical: spacing(1)
        },
        styles.input,
        style
      ]}
      placeholder={placeholder}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 60,
    fontFamily: 'Oswald_400Regular'
  }
});

export default OutlinedTextField;
