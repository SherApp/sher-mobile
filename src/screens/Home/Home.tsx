import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import HomeBrowser from '../../components/Home/HomeBrowser';
import { useNavigation } from '@react-navigation/native';
import HomeHeaderRight from '../../components/Home/Header/HomeHeaderRight';
import { useHeaderShadow } from '../../components/Header/HeaderShadowContext';
import HomeFAB from '../../components/Home/FAB/HomeFAB';

const Home = () => {
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
      <StatusBar translucent backgroundColor="transparent" />
      <HomeBrowser showSearch={showSearch} />
      <HomeFAB />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden'
  }
});

export default Home;
