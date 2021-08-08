import React from 'react';
import Dialog from 'react-native-dialog';
import { StyleSheet, View } from 'react-native';
import { RadioGroup } from '../misc/RadioGroup';
import useTheme from '../../theme/useTheme';
import Typography from '../misc/Typography';
import {
  ThemeOption,
  useThemeSettings
} from '../../theme/ThemeSettingsProvider';

interface Props {
  onClose(): void;
  visible: boolean;
}

export const themeKeyNameMap: { [key in ThemeOption]: string } = {
  dark: 'Dark',
  light: 'Light',
  'no-preference': 'System'
};

const ThemeSettingsDialog = ({ onClose, visible }: Props) => {
  const { colors, spacing } = useTheme();
  const { theme, setTheme } = useThemeSettings();

  const selectedIndex = Object.keys(themeKeyNameMap).indexOf(theme!);

  const handleSelectedIndexChange = async (index: number) => {
    await setTheme!(Object.keys(themeKeyNameMap)[index] as ThemeOption);
    onClose();
  };

  return (
    <View>
      <Dialog.Container
        visible={visible}
        contentStyle={{ backgroundColor: colors.card }}
      >
        <Dialog.Title>
          <Typography>Change theme</Typography>
        </Dialog.Title>
        <RadioGroup
          selectedIndex={selectedIndex}
          onSelectedIndexChange={handleSelectedIndexChange}
          radios={Object.values(themeKeyNameMap)}
          style={{ marginLeft: spacing(1) }}
        />
        <Dialog.Button
          label="Cancel"
          onPress={onClose}
          color={colors.primary}
          style={styles.font}
        />
      </Dialog.Container>
    </View>
  );
};

const styles = StyleSheet.create({
  font: {
    fontFamily: 'Oswald_400Regular'
  }
});

export default ThemeSettingsDialog;
