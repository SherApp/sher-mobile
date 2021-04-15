import React from 'react';
import { LinearGradient, Stop } from 'react-native-svg';
import useTheme from '../../src/theme/useTheme';

const PrimarySvgGradientDefinition = () => {
  const { gradients } = useTheme();
  return (
    <LinearGradient id="a" x1="0" y1="0" x2="1" y2="0">
      <Stop offset="0" stopColor={gradients.primary[0]} />
      <Stop offset="1" stopColor={gradients.primary[1]} />
    </LinearGradient>
  );
};

export default PrimarySvgGradientDefinition;
