import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  ViewStyle
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Typography from '../Typography';
import useTheme from '../../theme/useTheme';

interface Props {
  title: string;
  onPress: () => void;
  style: ViewStyle;
}

const Button = ({ title, onPress, style }: Props) => {
  const theme = useTheme();
  const padding = theme.spacing(1.5);

  return (
    <TouchableOpacity
      style={{ ...styles.container, padding, ...style }}
      onPress={onPress}
    >
      <LinearGradient
        style={styles.gradient}
        colors={theme.gradients.primary}
        start={[0, 0]}
        end={[1, 0]}
      />
      <Typography variant="caption" color="button" style={{ fontSize: 18 }}>
        {title}
      </Typography>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    overflow: 'hidden'
  },
  gradient: {
    left: 0,
    top: 0,
    position: 'absolute',
    right: 0,
    bottom: 0
  }
});

export default Button;
