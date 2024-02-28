import React, {useState} from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import * as yup from 'yup';
import AuthInputField from '../../components/AuthInputField';
import Form from '../../components/form';
import SubmitBtn from '../../components/form/SubmitBtn';
import colors from '../../utils/colors';
import PasswordVisibilityIcon from '../../ui/PasswordVisibilityIcon';
import AppLink from '../../ui/AppLink';
import CircleUi from '../../ui/CircleUi';

const initialValues = {
  name: '',
  email: '',
  password: '',
};

const signupSchema = yup.object({
  name: yup.string().trim().min(3, 'Invalid name').required('Name is required'),
  email: yup
    .string()
    .trim()
    .email('Invalid email')
    .required('Email is required'),
  password: yup
    .string()
    .trim()
    .min(6, 'Password is too short')
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])[a-zA-Z\d!@#\$%\^&\*]+$/,
      'Password is too simple',
    )
    .required('Password is required'),
});

export default function SignUp() {
  const [secureEntry, setSecureEntry] = useState(true);
  return (
    <SafeAreaView style={styles.container}>
      <CircleUi position="top-left" size={200} />
      <CircleUi position="top-right" size={100} />
      <CircleUi position="bottom-left" size={100} />
      <CircleUi position="bottom-right" size={200} />

      <View style={{width: '100%', paddingHorizontal: 15, marginBottom: 20}}>
        <Image source={require('../../assets/logo.png')} />
        <Text
          style={{
            color: colors.SECONDARY,
            fontSize: 25,
            fontWeight: 'bold',
            paddingVertical: 5,
          }}>
          Welcome!
        </Text>
        <Text style={{color: colors.CONTRAST, fontSize: 16}}>
          Let's get started by creating your account.
        </Text>
      </View>

      <Form
        initialValues={initialValues}
        validationSchema={signupSchema}
        onSubmit={values => {
          console.log(values);
        }}>
        <View style={styles.formContainer}>
          <AuthInputField
            name="name"
            placeholder="John Doe"
            label="Name"
            containerStyle={styles.marginBottom}
          />
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
          <SubmitBtn title="Sign Up" />

          <View style={styles.linkContainer}>
            <AppLink title="I Lost My Password" />
            <AppLink title="Sign in" />
          </View>
        </View>
      </Form>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    width: '100%',
    paddingHorizontal: 15,
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
