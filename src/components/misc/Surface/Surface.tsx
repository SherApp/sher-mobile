import React from 'react';
import { View, ViewProps } from 'react-native';
import useTheme from '../../../theme/useTheme';

interface Props extends ViewProps {
  paddingHorizontal?: number;
  paddingVertical?: number;
  children?: React.ReactNode;
}

const Surface = (
  { paddingHorizontal = 0, paddingVertical = 0, style, ...rest }: Props,
  ref: React.Ref<View>
) => {
  const { colors, spacing } = useTheme();

  return (
    <View
      style={[
        {
          backgroundColor: colors.background,
          paddingHorizontal: spacing(paddingHorizontal),
          paddingVertical: spacing(paddingVertical)
        },
        style
      ]}
      ref={ref}
      {...rest}
    />
  );
};

export default React.forwardRef(Surface);
