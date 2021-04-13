import Svg, { Defs, LinearGradient, Stop, Text } from 'react-native-svg';
import React from 'react';
import { processFontFamily } from 'expo-font';
import useTheme from '../../theme/useTheme';
import { StackHeaderTitleProps } from '@react-navigation/stack';

const HeaderTitle = ({ children }: StackHeaderTitleProps) => {
  const { spacing, gradients } = useTheme();
  return (
    <Svg height="100" width="200" style={{ marginLeft: spacing(1) }}>
      <Text
        fill="url(#a)"
        fontSize="24"
        fontFamily={processFontFamily('Oswald_400Regular')!}
        textAnchor="start"
        y="50%"
        dy="0.3em"
      >
        {children}
      </Text>
      <Defs>
        <LinearGradient id="a" x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0" stopColor={gradients.primary[0]} />
          <Stop offset="1" stopColor={gradients.primary[1]} />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default HeaderTitle;
