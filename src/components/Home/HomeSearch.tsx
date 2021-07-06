import Surface from '../misc/Surface/Surface';
import OutlinedTextField from '../misc/TextField/OutlinedTextField';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import useTheme from '../../theme/useTheme';

interface Props {
  showShadow?: boolean;
  value: string;
  onChange(newValue: string): void;
}

const HomeSearch = ({ showShadow, value, onChange }: Props) => {
  const { spacing, gradients } = useTheme();

  return (
    <Surface card elevated={showShadow}>
      <Surface card p={[0, 2]}>
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
  );
};

export default HomeSearch;
