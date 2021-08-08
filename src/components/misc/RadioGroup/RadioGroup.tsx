import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import Radio from './Radio';
import useTheme from '../../../theme/useTheme';

interface Props {
  selectedIndex: number;
  onSelectedIndexChange(index: number): void;
  radios: string[];
  style?: StyleProp<ViewStyle>;
}

const RadioGroup = ({
  selectedIndex,
  onSelectedIndexChange,
  radios,
  style
}: Props) => {
  const { spacing } = useTheme();

  const handleRadioPress = (index: number) => {
    onSelectedIndexChange(index);
  };

  if (selectedIndex > radios.length - 1 || selectedIndex < 0) {
    throw new Error('Invalid selected index');
  }

  return (
    <View style={style}>
      {radios.map((n, i) => (
        <Radio
          key={i}
          label={n}
          selected={selectedIndex === i}
          onPress={() => handleRadioPress(i)}
          style={{
            paddingVertical: spacing(1)
          }}
        />
      ))}
    </View>
  );
};

export default RadioGroup;
