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
          color: colors['text'],
          backgroundColor: colors['border'],
          paddingHorizontal: spacing(2),
          paddingVertical: spacing(1)
        },
        styles.input,
        style
      ]}
      placeholder={placeholder}
      placeholderTextColor={colors['textSecondary']}
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
