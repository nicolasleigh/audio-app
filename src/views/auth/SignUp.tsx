import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import * as yup from 'yup';
import AuthFormContainer from '../../components/AuthFormContainer';
import AuthInputField from '../../components/AuthInputField';
import Form from '../../components/form';
import SubmitBtn from '../../components/form/SubmitBtn';
import AppLink from '../../ui/AppLink';
import PasswordVisibilityIcon from '../../ui/PasswordVisibilityIcon';

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
    <Form
      initialValues={initialValues}
      validationSchema={signupSchema}
      onSubmit={values => {
        console.log(values);
      }}>
      <AuthFormContainer
        heading="Welcome"
        subHeading="Let's get started by creating your account.">
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
