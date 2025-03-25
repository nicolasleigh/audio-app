import React from 'react';
import {StyleSheet, View} from 'react-native';
import * as yup from 'yup';
import AuthFormContainer from '../../components/AuthFormContainer';
import AuthInputField from '../../components/AuthInputField';
import Form from '../../components/form';
import SubmitBtn from '../../components/form/SubmitBtn';
import AppLink from '../../ui/AppLink';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AuthStackParamList} from '../../@types/navigation';
import {FormikHelpers} from 'formik';
import client from '../../api/client';
import catchAsyncError from '../../api/catchError';
import {useDispatch} from 'react-redux';
import {updateNotification} from '../../store/notification';

interface initialValues {
  email: string;
}

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
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

  const handleSubmit = async (
    values: initialValues,
    actions: FormikHelpers<initialValues>,
  ) => {
    actions.setSubmitting(true);
    try {
      const {data} = await client.post('auth/forget-password', values);
      console.log(data);
    } catch (error) {
      const errorMessage = catchAsyncError(error);
      dispatch(updateNotification({message: errorMessage, type: 'error'}));
    }
    actions.setSubmitting(false);
  };
  return (
    <Form
      initialValues={initialValues}
      validationSchema={lostPasswordSchema}
      onSubmit={handleSubmit}>
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
            <AppLink
              title="Sign in"
              onPress={() => {
                navigation.navigate('SignIn');
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
