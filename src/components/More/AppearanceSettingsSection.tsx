import ThemeSettingsDialog, { themeKeyNameMap } from './ThemeSettingsDialog';
import React, { useState } from 'react';
import { SettingsItem, SettingsSection } from '../misc/Settings';
import { useThemeSettings } from '../../theme/ThemeSettingsProvider';

const AppearanceSettingsSection = () => {
  const [themeDialogVisible, setThemeDialogVisible] = useState(false);

  const handleThemePress = async () => {
    setThemeDialogVisible(true);
  };

  const { theme } = useThemeSettings();

  const currentThemeOption = themeKeyNameMap[theme!];

  return (
    <SettingsSection header="Appearance">
      <ThemeSettingsDialog
        onClose={() => setThemeDialogVisible(false)}
        visible={themeDialogVisible}
      />
      <SettingsItem
        icon="sun"
        text="Theme"
        secondaryText={currentThemeOption}
        onPress={handleThemePress}
      />
    </SettingsSection>
  );
};

export default AppearanceSettingsSection;
