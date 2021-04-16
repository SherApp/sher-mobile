import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Constants from 'expo-constants';
import useTheme from '../../theme/useTheme';

const LoginHeader = () => {
  const { gradients } = useTheme();

  return (
    <>
      <LinearGradient
        style={styles.gradient}
        colors={gradients.primary}
        start={[0, 0]}
        end={[1, 0]}
      />
      <View style={styles.header}>
        <Text
          style={{
            color: 'white',
            fontSize: 48,
            fontFamily: 'Sacramento_400Regular'
          }}
        >
          Sher
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    paddingTop: Constants.statusBarHeight,
    height: 150
  },
  gradient: {
    position: 'absolute',
    height: '100%',
    width: '100%'
  }
});

export default LoginHeader;
