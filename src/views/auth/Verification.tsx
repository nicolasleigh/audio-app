import React from 'react';
import {StyleSheet, View} from 'react-native';
import AuthFormContainer from '../../components/AuthFormContainer';
import AppButton from '../../ui/AppButton';
import AppLink from '../../ui/AppLink';
import OTPField from '../../ui/OTPField';

const otpFields = new Array(6).fill('');

export default function Verification() {
  return (
    <AuthFormContainer heading="Please check your email">
      <View style={styles.inputContainer}>
        {otpFields.map((_, index) => {
          return <OTPField key={index} placeholder="*" />;
        })}
      </View>

      <AppButton title="Submit" />
      <View style={styles.linkContainer}>
        <AppLink title="Re-send OTP" />
      </View>
    </AuthFormContainer>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  linkContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'flex-end',
  },
});
