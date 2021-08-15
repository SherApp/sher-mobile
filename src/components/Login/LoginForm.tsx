import Typography from '../misc/Typography';
import { Formik } from 'formik';
import { StyleSheet, View } from 'react-native';
import TextFieldGroup from 'react-native-text-input-group';
import TextField from '../misc/TextField/TextField';
import UserIcon from '../../../assets/svg/UserIcon';
import PasswordIcon from '../../../assets/svg/PasswordIcon';
import GlobeIcon from '../../../assets/svg/GlobeIcon';
import Button from '../misc/Button';
import React from 'react';
import useTheme from '../../theme/useTheme';
import Surface from '../misc/Surface';
import * as yup from 'yup';

const loginSchema = yup.object().shape({
  emailAddress: yup
    .string()
    .email('Invalid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password is too short')
    .required('Password is required'),
  instanceUrl: yup
    .string()
    .url('Invalid URL')
    .required('Instance URL is required')
});

export interface LoginValues {
  emailAddress: string;
  password: string;
  instanceUrl: string;
}

interface Props {
  onSubmit(values: LoginValues): void;
}

const LoginForm = ({ onSubmit }: Props) => {
  const { spacing } = useTheme();

  return (
    <Surface style={styles.loginContainer} p={[3, 4]}>
      <Typography
        variant="h1"
        style={[styles.heading, { marginVertical: spacing(3) }]}
      >
        Sign in to continue
      </Typography>
      <Formik
        onSubmit={onSubmit}
        initialValues={{ emailAddress: '', password: '', instanceUrl: '' }}
        validationSchema={loginSchema}
        validateOnChange={false}
      >
        {({ handleChange, handleSubmit, errors, setFieldTouched }) => (
          <View>
            <TextFieldGroup>
              <TextField
                label="Email"
                error={errors.emailAddress}
                textContentType="emailAddress"
                autoCompleteType="email"
                autoCapitalize="none"
                onChangeText={handleChange('emailAddress')}
                icon={<UserIcon />}
              />
              <TextField
                label="Password"
                error={errors.password}
                secureTextEntry
                autoCompleteType="password"
                onChangeText={handleChange('password')}
                icon={<PasswordIcon />}
              />
              <TextField
                autoCompleteType="off"
                label="Instance URL"
                error={errors.instanceUrl}
                placeholder="https://sher.company.com"
                autoCapitalize="none"
                onChangeText={handleChange('instanceUrl')}
                icon={<GlobeIcon />}
                onBlur={() => setFieldTouched('instanceUrl')}
              />
            </TextFieldGroup>
            <Button
              title="Sign in"
              onPress={handleSubmit}
              style={{ marginTop: spacing(6) }}
            />
          </View>
        )}
      </Formik>
    </Surface>
  );
};

const styles = StyleSheet.create({
  heading: {
    textAlign: 'center'
  },
  loginContainer: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flex: 1,
    textAlign: 'center'
  }
});

export default LoginForm;
