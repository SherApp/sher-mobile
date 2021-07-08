import React, { useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import HomeBrowser from '../../components/Home/HomeBrowser';
import { useNavigation } from '@react-navigation/native';
import HomeHeaderRight from '../../components/Home/Header/HomeHeaderRight';

const Home = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <HomeHeaderRight />
    });
  });

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <HomeBrowser />
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
