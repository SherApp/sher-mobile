import Typography from '../misc/Typography';
import { Formik } from 'formik';
import { StyleSheet, View } from 'react-native';
import TextFieldGroup from '../misc/TextFieldGroup';
import TextField from '../misc/TextField/TextField';
import UserIcon from '../../../assets/svg/UserIcon';
import PasswordIcon from '../../../assets/svg/PasswordIcon';
import GlobeIcon from '../../../assets/svg/GlobeIcon';
import Button from '../misc/Button';
import React from 'react';
import useTheme from '../../theme/useTheme';
import Surface from '../misc/Surface';

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
      >
        {({ handleChange, handleSubmit }) => (
          <View>
            <TextFieldGroup>
              <TextField
                label="Email"
                textContentType="emailAddress"
                autoCompleteType="email"
                autoCapitalize="none"
                onChangeText={handleChange('emailAddress')}
                icon={<UserIcon />}
              />
              <TextField
                label="Password"
                secureTextEntry
                autoCompleteType="password"
                onChangeText={handleChange('password')}
                icon={<PasswordIcon />}
              />
              <TextField
                autoCompleteType="off"
                label="Instance URL"
                hint="e.g. https://sher.company.com"
                autoCapitalize="none"
                onChangeText={handleChange('instanceUrl')}
                icon={<GlobeIcon />}
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
