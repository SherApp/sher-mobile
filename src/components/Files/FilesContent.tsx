import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import FilesBrowser from '../../components/Files/FilesBrowser';
import { useNavigation } from '@react-navigation/native';
import HomeHeaderRight from '../../components/Files/Header/HomeHeaderRight';
import { useHeaderShadow } from '../Header/HeaderShadowContext';
import FilesFAB from '../../components/Files/FAB/FilesFAB';

const FilesContent = () => {
  const [showSearch, setShowSearch] = useState(false);
  const navigation = useNavigation();
  const { shadow } = useHeaderShadow();

  const handleSearchPress = () => {
    setShowSearch((p) => !p);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <HomeHeaderRight onSearchPress={handleSearchPress} />,
      headerStyle: {
        elevation: showSearch ? 0 : shadow
      }
    });
  });

  return (
    <View style={styles.container}>
      <FilesBrowser showSearch={showSearch} />
      <FilesFAB />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden'
  }
});

export default FilesContent;
