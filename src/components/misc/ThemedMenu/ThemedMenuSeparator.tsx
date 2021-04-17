import React from 'react';
import { StyleSheet, View } from 'react-native';
import useTheme from '../../../theme/useTheme';

const ThemedMenuSeparator = () => {
  const { colors } = useTheme();

  return <View style={[{ backgroundColor: colors.border }, styles.root]} />;
};

const styles = StyleSheet.create({
  root: {
    height: 1,
    flex: 1
  }
});

export default ThemedMenuSeparator;
