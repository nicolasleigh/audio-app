import React, {useEffect, useRef, useState} from 'react';
import {Keyboard, StyleSheet, Text, TextInput, View} from 'react-native';
import AuthFormContainer from '../../components/AuthFormContainer';
import AppButton from '../../ui/AppButton';
import AppLink from '../../ui/AppLink';
import OTPField from '../../ui/OTPField';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../@types/navigation';
import client from '../../api/client';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import colors from '../../utils/colors';

const otpFields = new Array(6).fill('');

type Props = NativeStackScreenProps<AuthStackParamList, 'Verification'>;

export default function Verification(props: Props) {
  const [otp, setOtp] = useState([...otpFields]);
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [countDown, setCountDown] = useState(30);
  const [canSendNewOtpRequest, setCanSendNewOtpRequest] = useState(false);
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

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
      return;
    }
    setSubmitting(true);
    try {
      const {data} = await client.post('/auth/verify-email', {
        userId: userInfo.id,
        token: otp.join(''),
      });
      // navigate to sign in
      navigation.navigate('SignIn');
    } catch (error) {
      console.log('Verification error ', error.response.data.error);
    }
    setSubmitting(false);
  };

  const requestForOTP = async () => {
    setCountDown(30);
    setCanSendNewOtpRequest(false);
    try {
      await client.post('/auth/re-verify-email', {userId: userInfo.id});
    } catch (error) {
      console.log('Request for new otp ', error.response.data.error);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOtpIndex]);

  useEffect(() => {
    if (canSendNewOtpRequest) return;
    const intervalId = setInterval(() => {
      setCountDown(prev => {
        if (prev <= 0) {
          setCanSendNewOtpRequest(true);
          clearInterval(intervalId);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [canSendNewOtpRequest]);

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
        {countDown > 0 ? (
          <Text style={styles.countDown}>{countDown} sec</Text>
        ) : null}
        <AppLink
          active={canSendNewOtpRequest}
          title="Re-send OTP"
          onPress={requestForOTP}
        />
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
    flexDirection: 'row',
  },
  countDown: {
    color: colors.SECONDARY,
    marginRight: 10,
  },
});
