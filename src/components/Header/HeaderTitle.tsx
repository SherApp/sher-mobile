import Svg, { Defs, LinearGradient, Stop, Text } from 'react-native-svg';
import React from 'react';
import { processFontFamily } from 'expo-font';
import useTheme from '../../theme/useTheme';
import { StackHeaderTitleProps } from '@react-navigation/stack';
import { useRoute } from '@react-navigation/native';
import { View } from 'react-native';
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient';

interface RouteParams {
  name?: string;
}

const HeaderTitle = ({ children }: StackHeaderTitleProps) => {
  const { params } = useRoute();

  const { gradients } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        overflow: 'hidden'
      }}
    >
      <Svg height="50" width="200" style={{ flexGrow: 1 }}>
        <Text
          fill="url(#a)"
          fontSize="24"
          fontFamily={processFontFamily('Oswald_400Regular')!}
          textAnchor="start"
          y="50%"
          dy="0.3em"
        >
          {(params as RouteParams)?.name ?? children}
        </Text>
        <Defs>
          <LinearGradient id="a" x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0" stopColor={gradients.primary[0]} />
            <Stop offset="1" stopColor={gradients.primary[1]} />
          </LinearGradient>
        </Defs>
      </Svg>
      <ExpoLinearGradient
        colors={['transparent', 'white']}
        start={[0, 0]}
        end={[1, 0]}
        style={{ height: 50, width: 25, transform: [{ translateX: -25 }] }}
      />
    </View>
  );
};

export default HeaderTitle;
