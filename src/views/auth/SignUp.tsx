import {Formik} from 'formik';
import React from 'react';
import {Button, SafeAreaView, StyleSheet, View} from 'react-native';
import AuthInputField from '../../components/AuthInputField';
import colors from '../../utils/colors';

const initialValues = {
  name: '',
  email: '',
  password: '',
};

export default function SignUp() {
  return (
    <SafeAreaView style={styles.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={values => {
          console.log(values);
        }}>
        {({handleSubmit, values, handleChange}) => {
          return (
            <View style={styles.formContainer}>
              <AuthInputField
                placeholder="John Doe"
                label="Name"
                containerStyle={styles.marginBottom}
                onChange={handleChange('name')}
                value={values.name}
              />
              <AuthInputField
                placeholder="john@email.com"
                label="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                containerStyle={styles.marginBottom}
                onChange={handleChange('email')}
                value={values.email}
              />
              <AuthInputField
                placeholder="********"
                label="Password"
                autoCapitalize="none"
                secureTextEntry
                onChange={handleChange('password')}
                value={values.password}
              />
              <Button title="Sign up" onPress={() => handleSubmit()} />
            </View>
          );
        }}
      </Formik>
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
});
