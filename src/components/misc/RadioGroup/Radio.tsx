import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle
} from 'react-native';
import useTheme from '../../../theme/useTheme';
import Typography from '../Typography';

interface Props {
  label: string;
  selected?: boolean;
  onPress?(): void;
  style?: StyleProp<ViewStyle>;
}

export const Radio = ({ label, selected, onPress, style }: Props) => {
  const { colors, spacing } = useTheme();

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.container, style]}>
        <View
          style={[
            styles.wrapper,
            {
              borderColor: colors.primary,
              marginRight: spacing(2)
            }
          ]}
        >
          {selected && (
            <View
              style={[
                styles.dot,
                {
                  backgroundColor: colors.primary
                }
              ]}
            />
          )}
        </View>
        <Typography>{label}</Typography>
      </View>
    </TouchableWithoutFeedback>
  );
};

const wrapperBorderWidth = 2;
const wrapperDiameter = 20;
const dotDiameter = 12;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  wrapper: {
    width: wrapperDiameter,
    height: wrapperDiameter,
    borderRadius: 999,
    borderWidth: wrapperBorderWidth,
    position: 'relative'
  },
  dot: {
    width: dotDiameter,
    height: dotDiameter,
    borderRadius: 999,
    left: wrapperDiameter / 2 - dotDiameter / 2 - wrapperBorderWidth,
    top: wrapperDiameter / 2 - dotDiameter / 2 - wrapperBorderWidth,
    position: 'absolute'
  }
});

export default Radio;
