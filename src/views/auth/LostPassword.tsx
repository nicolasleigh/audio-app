import React from 'react';
import {StyleSheet, View} from 'react-native';
import * as yup from 'yup';
import AuthFormContainer from '../../components/AuthFormContainer';
import AuthInputField from '../../components/AuthInputField';
import Form from '../../components/form';
import SubmitBtn from '../../components/form/SubmitBtn';
import AppLink from '../../ui/AppLink';

const initialValues = {
  email: '',
};

const lostPasswordSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email('Invalid email')
    .required('Email is required'),
});

export default function LostPassword() {
  return (
    <Form
      initialValues={initialValues}
      validationSchema={lostPasswordSchema}
      onSubmit={values => {
        console.log(values);
      }}>
      <AuthFormContainer
        heading="Forget Password?"
        subHeading="Did you forget your password? Don't worry, we'll help you get it back.">
        <View style={styles.formContainer}>
          <AuthInputField
            name="email"
            placeholder="john@email.com"
            label="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            containerStyle={styles.marginBottom}
          />

          <SubmitBtn title="Send link" />

          <View style={styles.linkContainer}>
            <AppLink title="Sign in" />
            <AppLink title="Sign up" />
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
