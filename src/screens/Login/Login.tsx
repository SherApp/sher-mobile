import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import React from 'react';
import Typography from '../../components/Typography';
import TextField from '../../components/TextField';
import Button from '../../components/Button';
import TextFieldGroup from '../../components/TextFieldGroup';
import useTheme from '../../theme/useTheme';
import Surface from '../../components/Surface';
import UserIcon from '../../../assets/svg/UserIcon';
import PasswordIcon from '../../../assets/svg/PasswordIcon';
import GlobeIcon from '../../../assets/svg/GlobeIcon';

const Login = () => {
  const { spacing, colors } = useTheme();

  return (
    <ScrollView style={{ backgroundColor: colors.background }}>
      <StatusBar style="light" translucent backgroundColor="transparent" />
      <View style={{ flex: 1 }}>
        <LinearGradient
          style={styles.gradient}
          colors={['#8A0CE1', '#EC38BC']}
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

        <Surface
          style={styles.loginContainer}
          paddingHorizontal={4}
          paddingVertical={3}
        >
          <Typography
            variant="h1"
            style={[styles.heading, { marginVertical: spacing(3) }]}
          >
            Sign in to continue
          </Typography>
          <TextFieldGroup>
            <TextField
              label="Email"
              autoCompleteType="email"
              icon={<UserIcon />}
            />
            <TextField
              label="Password"
              secureTextEntry
              autoCompleteType="password"
              icon={<PasswordIcon />}
            />
            <TextField
              autoCompleteType="off"
              label="Instance URL"
              hint="e.g. https://sher.company.com"
              icon={<GlobeIcon />}
            />
          </TextFieldGroup>
          <Button
            title="Sign in"
            onPress={() => {}}
            style={{ marginTop: spacing(6) }}
          />
        </Surface>
      </View>
    </ScrollView>
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
  },
  loginContainer: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flex: 1,
    textAlign: 'center'
  },
  heading: {
    textAlign: 'center'
  }
});

export default Login;
