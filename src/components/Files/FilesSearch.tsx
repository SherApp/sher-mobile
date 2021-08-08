import Surface from '../misc/Surface/Surface';
import OutlinedTextField from '../misc/TextField/OutlinedTextField';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import useTheme from '../../theme/useTheme';
import { useHeaderShadow } from '../Header/HeaderShadowContext';
import Collapsible from '../misc/Collapsible';

interface Props {
  value: string;
  onChange(newValue: string): void;
  visible?: boolean;
}

const FilesSearch = ({ value, onChange, visible }: Props) => {
  const { spacing, gradients } = useTheme();

  const { shadowVisible } = useHeaderShadow();

  return (
    <Collapsible collapse={!visible} card elevated={visible && shadowVisible}>
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
    </Collapsible>
  );
};

export default FilesSearch;
