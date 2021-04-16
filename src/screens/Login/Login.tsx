import { ScrollView, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import useTheme from '../../theme/useTheme';
import { useApiClient } from '../../api/useApiClient';
import { NavigationProp } from '@react-navigation/native';
import { MaterialIndicator } from 'react-native-indicators';
import LoginForm, { LoginValues } from '../../components/Login';
import LoginHeader from '../../components/Login/LoginHeader';

interface Props {
  navigation: NavigationProp<any>;
}

const Login: React.FC<Props> = ({ navigation }) => {
  const [isSigningIn, setIsSigningIn] = useState(false);

  const apiClient = useApiClient();
  const { colors } = useTheme();

  const handleSubmit = async ({
    emailAddress,
    password,
    instanceUrl
  }: LoginValues) => {
    setIsSigningIn(true);
    try {
      await apiClient.signIn({ emailAddress, password, instanceUrl });
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }]
      });
    } finally {
      setIsSigningIn(false);
    }
  };

  if (isSigningIn) {
    return (
      <View style={{ flex: 1 }}>
        <MaterialIndicator color={colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView style={{ backgroundColor: colors.background }}>
      <StatusBar style="light" translucent backgroundColor="transparent" />
      <View style={{ flex: 1 }}>
        <LoginHeader />
        <LoginForm onSubmit={handleSubmit} />
      </View>
    </ScrollView>
  );
};

export default Login;
