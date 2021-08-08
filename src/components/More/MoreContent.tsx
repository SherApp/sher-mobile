import React from 'react';
import Constants from 'expo-constants';
import Surface from '../misc/Surface';
import * as Linking from 'expo-linking';
import { SettingsItem, SettingsSection } from '../misc/Settings';
import AppearanceSettingsSection from './AppearanceSettingsSection';

const MoreContent = () => {
  const handleOpenGithubPagePress = async () => {
    await Linking.openURL('https://github.com/SherApp/sher-mobile');
  };

  return (
    <Surface p={[1, 0]}>
      <SettingsSection header="About">
        <SettingsItem
          icon="github"
          text={`Sher v${Constants.manifest.version}`}
          secondaryText="Open GitHub page"
          onPress={handleOpenGithubPagePress}
        />
      </SettingsSection>
      <AppearanceSettingsSection />
    </Surface>
  );
};

export default MoreContent;
