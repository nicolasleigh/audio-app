import React, {useState} from 'react';
import {Button, SafeAreaView, StyleSheet, View} from 'react-native';
import AuthInputField from '../../components/AuthInputField';
import colors from '../../utils/colors';

export default function SignUp() {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errorInfo, setErrorInfo] = useState({
    name: '',
    email: '',
    password: '',
  });
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <AuthInputField
          placeholder="John Doe"
          label="Name"
          containerStyle={styles.marginBottom}
          onChange={text => {
            setUserInfo({...userInfo, name: text});
          }}
          errorMsg={errorInfo.name}
        />
        <AuthInputField
          placeholder="john@email.com"
          label="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          containerStyle={styles.marginBottom}
          onChange={text => {
            setUserInfo({...userInfo, email: text});
          }}
          errorMsg={errorInfo.email}
        />
        <AuthInputField
          placeholder="********"
          label="Password"
          autoCapitalize="none"
          secureTextEntry
          onChange={text => {
            setUserInfo({...userInfo, password: text});
          }}
          errorMsg={errorInfo.password}
        />
        <Button
          title="Sign up"
          onPress={() => {
            if (!userInfo.name) {
              return setErrorInfo({
                name: 'Name is required',
                email: '',
                password: '',
              });
            }
            if (!userInfo.email) {
              return setErrorInfo({
                email: 'Email is required',
                name: '',
                password: '',
              });
            }
            if (!userInfo.password) {
              return setErrorInfo({
                password: 'Password is required',
                name: '',
                email: '',
              });
            }
            setErrorInfo({
              password: '',
              name: '',
              email: '',
            });
            console.log(userInfo);
          }}
        />
      </View>
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
