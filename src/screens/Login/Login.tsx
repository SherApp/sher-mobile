import { ScrollView, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import useTheme from '../../theme/useTheme';
import { useApiClient } from '../../api/useApiClient';
import { NavigationProp } from '@react-navigation/native';
import { MaterialIndicator } from 'react-native-indicators';
import LoginForm, { LoginValues } from '../../components/Login';
import LoginHeader from '../../components/Login/LoginHeader';
import { useMutation } from 'react-query';
import Toast from 'react-native-root-toast';
import { errorHandler } from '../../utils/errorHandler';
import { AxiosError } from 'axios';

interface Props {
  navigation: NavigationProp<any>;
}

const Login: React.FC<Props> = ({ navigation }) => {
  const apiClient = useApiClient();

  const { isLoading, ...signInMutation } = useMutation(
    (values: LoginValues) => apiClient.signIn(values),
    {
      onError: (e: AxiosError) => {
        if (e.message === 'Network Error') {
          Toast.show('Network Error, is instance URL correct?');
        } else {
          errorHandler(e);
        }
      },
      onSuccess: () => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }]
        });
      }
    }
  );

  const { colors } = useTheme();

  const handleSubmit = async (values: LoginValues) => {
    await signInMutation.mutateAsync(values);
  };

  return (
    <>
      {isLoading && (
        <View style={{ flex: 1 }}>
          <MaterialIndicator color={colors.primary} />
        </View>
      )}
      <ScrollView
        style={{
          backgroundColor: colors.background,
          display: isLoading ? 'none' : 'flex'
        }}
      >
        <StatusBar style="light" translucent backgroundColor="transparent" />
        <View style={{ flex: 1 }}>
          <LoginHeader />
          <LoginForm onSubmit={handleSubmit} />
        </View>
      </ScrollView>
    </>
  );
};

export default Login;
