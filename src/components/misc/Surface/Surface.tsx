import React from 'react';
import { View, ViewProps } from 'react-native';
import useTheme from '../../../theme/useTheme';

type SpaceValue = [number, number] | number;

interface Props extends ViewProps {
  m?: SpaceValue;
  p?: SpaceValue;
  children?: React.ReactNode;
}

const Surface = (
  { p = 0, m = 0, style, ...rest }: Props,
  ref: React.Ref<View>
) => {
  const { spacing } = useTheme();

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

  return (
    <View
      style={[
        {
          ...calcValueWithSpacing('margin', m),
          ...calcValueWithSpacing('padding', p)
        },
        style
      ]}
      ref={ref}
      {...rest}
    />
  );
};

export default React.forwardRef(Surface);
