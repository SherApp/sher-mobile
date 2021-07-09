import Surface from '../misc/Surface/Surface';
import OutlinedTextField from '../misc/TextField/OutlinedTextField';
import { Animated, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useLayoutEffect, useRef } from 'react';
import useTheme from '../../theme/useTheme';
import { useHeaderShadow } from '../Header/HeaderShadowContext';

interface Props {
  value: string;
  onChange(newValue: string): void;
  visible?: boolean;
}

const HomeSearch = ({ value, onChange, visible }: Props) => {
  const surfaceRef = useRef<View>(null);
  const collapseAnim = useRef(new Animated.Value(0)).current;
  const baseHeightRef = useRef(0);
  const { spacing, gradients } = useTheme();

  useLayoutEffect(() => {
    surfaceRef.current?.measureInWindow((x, y, width, height) => {
      baseHeightRef.current = height;
    });
  });

  useEffect(() => {
    const target = visible ? baseHeightRef.current : 0;

    Animated.timing(collapseAnim, {
      toValue: target,
      duration: 200,
      useNativeDriver: false
    }).start();
  }, [visible]);

  const { shadowVisible } = useHeaderShadow();

  return (
    <Surface
      card
      elevated={visible && shadowVisible}
      style={{ height: collapseAnim, overflow: 'hidden', position: 'relative' }}
    >
      <Surface
        card
        ref={surfaceRef}
        style={{ flex: 1, position: 'absolute', width: '100%' }}
      >
        <Surface p={[0, 2]}>
          <OutlinedTextField
            placeholder="Search"
            style={{ marginBottom: spacing(2) }}
            value={value}
            onChangeText={onChange}
          />
        </Surface>
        <View style={{ width: '100%', height: 2 }}>
          <LinearGradient
            colors={gradients.primary}
            start={[0, 0]}
            end={[1, 0]}
            style={{ flex: 1 }}
          />
        </View>
      </Surface>
    </Surface>
  );
};

export default HomeSearch;
