import React, { useEffect, useRef } from 'react';
import { Animated, View, ViewProps } from 'react-native';
import useTheme from '../../../theme/useTheme';

type SpaceValue = [number, number] | number;

export interface Props extends Animated.AnimatedProps<ViewProps> {
  m?: SpaceValue;
  p?: SpaceValue;
  children?: React.ReactNode;
  elevated?: boolean;
  card?: boolean;
}

const Surface = (
  { p = 0, m = 0, style, elevated, card, ...rest }: Props,
  ref: React.Ref<View>
) => {
  const { spacing, colors } = useTheme();
  const shadowAnim = useRef(new Animated.Value(elevated ? 3 : 0)).current;

  const calcValueWithSpacing = (key: string, value: SpaceValue) => {
    switch (typeof value) {
      case 'number':
        return { [key]: spacing(value as number) };
      case 'object':
        return {
          [`${key}Vertical`]: spacing(value[0]),
          [`${key}Horizontal`]: spacing(value[1])
        };
    }
  };

  useEffect(() => {
    Animated.timing(shadowAnim, {
      toValue: elevated ? 3 : 0,
      duration: 100,
      useNativeDriver: false
    }).start();
  }, [elevated]);

  return (
    <Animated.View
      style={[
        {
          ...calcValueWithSpacing('margin', m),
          ...calcValueWithSpacing('padding', p),
          backgroundColor: card ? colors.card : colors.background,
          elevation: shadowAnim
        },
        style
      ]}
      ref={ref}
      {...rest}
    />
  );
};

export default React.forwardRef(Surface);
