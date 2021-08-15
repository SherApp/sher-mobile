import React, { Ref, useEffect, useRef, useState } from 'react';
import {
  Animated,
  StyleSheet,
  TextInput,
  TextInputProps,
  View
} from 'react-native';
import Typography from '../Typography';
import useTheme from '../../../theme/useTheme';

interface Props extends TextInputProps {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const TextField = (
  { label, icon, error, ...rest }: Props,
  ref: Ref<TextInput>
) => {
  const [focus, setFocus] = useState(false);
  const focusAnim = useRef(new Animated.Value(0)).current;

  const { colors, spacing } = useTheme();

  useEffect(() => {
    Animated.timing(focusAnim, {
      toValue: focus ? 1 : 0,
      duration: 200,
      useNativeDriver: false
    }).start();
  }, [focus]);

  const handleFocus = () => {
    setFocus(true);
  };

  const handleBlur = () => {
    setFocus(false);
  };

  const color = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.border, colors.primary]
  });

  return (
    <View style={{ marginVertical: spacing(1) }}>
      <Typography color="primary" variant="caption">
        {label}
      </Typography>
      <View style={styles.inputContainer}>
        <TextInput
          ref={ref}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholderTextColor={colors.textSecondary}
          style={{
            color: colors.text,
            flexGrow: 1,
            fontFamily: 'Oswald_400Regular'
          }}
          {...rest}
        />
        <View style={[styles.iconContainer, { margin: spacing(0.5) }]}>
          {icon}
        </View>
      </View>
      <Animated.View style={[styles.border, { backgroundColor: color }]} />
      <Typography color="error" variant="body">
        {error}
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  border: {
    height: 2
  },
  inputContainer: {
    flexDirection: 'row'
  },
  iconContainer: {
    aspectRatio: 1,
    height: 24
  }
});

export default React.forwardRef(TextField);
