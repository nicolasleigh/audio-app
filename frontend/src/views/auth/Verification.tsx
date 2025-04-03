import {NavigationProp, useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useRef, useState} from 'react';
import {Keyboard, StyleSheet, TextInput, View} from 'react-native';
import Toast from 'react-native-toast-message';
import {
  AuthStackParamList,
  ProfileNavigatorStackParamList,
} from '../../@types/navigation';
import catchAsyncError from '../../api/catchError';
import client from '../../api/client';
import AuthFormContainer from '../../components/AuthFormContainer';
import ReVerificationLink from '../../components/ReVerificationLink';
import AppButton from '../../ui/AppButton';
import OTPField from '../../ui/OTPField';

const otpFields = new Array(6).fill('');

type Props = NativeStackScreenProps<
  AuthStackParamList | ProfileNavigatorStackParamList,
  'Verification'
>;

type PossibleScreens = {
  ProfileSetting: undefined;
  SignIn: undefined;
};

export default function Verification(props: Props) {
  const [otp, setOtp] = useState([...otpFields]);
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const navigation = useNavigation<NavigationProp<PossibleScreens>>();

  const {userInfo} = props.route.params;

  const inputRef = useRef<TextInput>(null);

  const handleChange = (value: string, index: number) => {
    const newOtp = [...otp];
    if (value === 'Backspace') {
      // move to previous input only if the current input is empty
      if (!newOtp[index]) {
        setActiveOtpIndex(index - 1);
      }
      newOtp[index] = '';
    } else {
      // update the current input and move to the next input
      setActiveOtpIndex(index + 1);
      newOtp[index] = value;
    }

    setOtp([...newOtp]);
  };

  const handlePaste = (value: string) => {
    if (value.length >= 6) {
      Keyboard.dismiss();
      const newOtp = value.split('');
      setOtp([...newOtp]);
    }
  };

  const isValidOtp = otp.every(value => value.trim());

  const handleSubmit = async () => {
    if (!isValidOtp) {
      return Toast.show({type: 'error', text1: 'Invalid OTP'});
    }
    setSubmitting(true);
    try {
      const {data} = await client.post('/auth/verify-email', {
        userId: userInfo.id,
        token: otp.join(''),
      });

      Toast.show({type: 'success', text1: data.message});

      const {routeNames} = navigation.getState();

      if (routeNames.includes('SignIn')) {
        // navigate to sign in
        navigation.navigate('SignIn');
      }

      if (routeNames.includes('ProfileSetting')) {
        navigation.navigate('ProfileSetting');
      }
    } catch (error) {
      const errorMessage = catchAsyncError(error);
      Toast.show({type: 'error', text1: errorMessage});
    }
    setSubmitting(false);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOtpIndex]);

  return (
    <AuthFormContainer heading="Please check your email">
      <View style={styles.inputContainer}>
        {otpFields.map((_, index) => {
          return (
            <OTPField
              ref={activeOtpIndex === index ? inputRef : null}
              key={index}
              placeholder="*"
              keyboardType="number-pad"
              onKeyPress={({nativeEvent}) => {
                handleChange(nativeEvent.key, index);
              }}
              onChangeText={handlePaste}
              value={otp[index] || ''}
            />
          );
        })}
      </View>

      <AppButton busy={submitting} title="Submit" onPress={handleSubmit} />
      <View style={styles.linkContainer}>
        <ReVerificationLink linkTitle="Re-send OTP" userId={userInfo.id} />
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
    justifyContent: 'flex-end',
  },
});
