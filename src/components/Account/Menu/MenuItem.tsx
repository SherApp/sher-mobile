import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Surface from '../../misc/Surface';
import Typography, { TypographyProps } from '../../misc/Typography/Typography';

interface Props {
  onPress(): void;
  TypographyProps?: TypographyProps;
  text: string;
}

const MenuItem = ({ onPress, TypographyProps, text }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Surface m={[1, 0]} p={[0, 1]} style={styles.container}>
        <Typography {...TypographyProps}>{text}</Typography>
      </Surface>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 48,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export default MenuItem;
