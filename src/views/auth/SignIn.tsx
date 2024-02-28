import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import * as yup from 'yup';
import AuthFormContainer from '../../components/AuthFormContainer';
import AuthInputField from '../../components/AuthInputField';
import Form from '../../components/form';
import SubmitBtn from '../../components/form/SubmitBtn';
import AppLink from '../../ui/AppLink';
import PasswordVisibilityIcon from '../../ui/PasswordVisibilityIcon';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AuthStackParamList} from '../../@types/navigation';

const initialValues = {
  email: '',
  password: '',
};

const signinSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email('Invalid email')
    .required('Email is required'),
  password: yup
    .string()
    .trim()
    .min(6, 'Password is too short')
    .required('Password is required'),
});

export default function SignIn({}) {
  const [secureEntry, setSecureEntry] = useState(true);
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  return (
    <Form
      initialValues={initialValues}
      validationSchema={signinSchema}
      onSubmit={values => {
        console.log(values);
      }}>
      <AuthFormContainer heading="Welcome back!">
        <View style={styles.formContainer}>
          <AuthInputField
            name="email"
            placeholder="john@email.com"
            label="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            containerStyle={styles.marginBottom}
          />
          <AuthInputField
            name="password"
            placeholder="********"
            label="Password"
            autoCapitalize="none"
            secureTextEntry={secureEntry}
            containerStyle={styles.marginBottom}
            rightIcon={<PasswordVisibilityIcon privateIcon={secureEntry} />}
            onRightIconPress={() => setSecureEntry(prev => !prev)}
          />
          <SubmitBtn title="Sign in" />

          <View style={styles.linkContainer}>
            <AppLink
              title="I Lost My Password"
              onPress={() => {
                navigation.navigate('LostPassword');
              }}
            />
            <AppLink
              title="Sign up"
              onPress={() => {
                navigation.navigate('SignUp');
              }}
            />
          </View>
        </View>
      </AuthFormContainer>
    </Form>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
    // paddingHorizontal: 15,
  },
  marginBottom: {
    marginBottom: 20,
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
});
