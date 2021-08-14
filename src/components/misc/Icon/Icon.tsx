import React from 'react';
import { Feather } from '@expo/vector-icons';
import useTheme from '../../../theme/useTheme';
import { TypographyColor } from '../Typography/Typography';

interface Props extends React.ComponentProps<typeof Feather> {
  color?: TypographyColor;
}

const Icon = ({ size = 24, color = 'text', ...rest }: Props) => {
  const { colors } = useTheme();
  return <Feather size={size} color={colors[color]} {...rest} />;
};

export default Icon;
