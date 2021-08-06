import React, { useEffect, useRef } from 'react';
import Surface, { SurfaceProps } from '../Surface';
import { Animated, LayoutChangeEvent, StyleSheet, View } from 'react-native';

interface Props extends SurfaceProps {
  collapse?: boolean;
}

const Collapsible = ({ collapse, children, ...rest }: Props) => {
  const wrapperRef = useRef<View>(null);
  const collapseAnim = useRef(new Animated.Value(0)).current;
  const baseHeightRef = useRef(0);

  const handleLayout = (e: LayoutChangeEvent) => {
    baseHeightRef.current = e.nativeEvent.layout.height;
  };

  useEffect(() => {
    const target = collapse ? 0 : baseHeightRef.current;

    Animated.timing(collapseAnim, {
      toValue: target,
      duration: 200,
      useNativeDriver: false
    }).start();
  }, [collapse]);

  return (
    <Surface style={[{ height: collapseAnim }, styles.container]} {...rest}>
      <Surface
        ref={wrapperRef}
        style={styles.contentWrapper}
        onLayout={handleLayout}
      >
        {children}
      </Surface>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    position: 'relative'
  },
  contentWrapper: {
    flex: 1,
    position: 'absolute',
    width: '100%'
  }
});

export default Collapsible;
