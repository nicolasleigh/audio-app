import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Toast from 'react-native-toast-message';
import {useSelector} from 'react-redux';
import {ProfileNavigatorStackParamList} from '../@types/navigation';
import catchAsyncError from '../api/catchError';
import {getClient} from '../api/client';
import {getAuthState} from '../store/auth';
import AppLink from '../ui/AppLink';
import colors from '../utils/colors';

interface Props {
  time?: number;
  activeAtFirst?: boolean;
  linkTitle: string;
  userId?: string;
}

export default function ReVerificationLink({
  time = 30,
  activeAtFirst = false,
  linkTitle,
  userId,
}: Props) {
  const [countDown, setCountDown] = useState(time);
  const [canSendNewOtpRequest, setCanSendNewOtpRequest] =
    useState(activeAtFirst);
  const {profile} = useSelector(getAuthState);
  const {navigate} =
    useNavigation<NavigationProp<ProfileNavigatorStackParamList>>();

  const requestForOTP = async () => {
    setCountDown(time);
    setCanSendNewOtpRequest(false);
    try {
      const client = await getClient();
      await client.post('/auth/re-verify-email', {
        userId: userId || profile?.id,
      });
      navigate('Verification', {
        userInfo: {
          email: profile?.email || '',
          name: profile?.name || '',
          id: userId || profile?.id || '',
        },
      });
    } catch (error) {
      // console.log('Request for new otp ', error.response.data.error);
      const errorMessage = catchAsyncError(error);
      Toast.show({type: 'error', text1: errorMessage});
    }
  };

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
    <View style={styles.container}>
      <AppLink
        active={canSendNewOtpRequest}
        title={linkTitle}
        onPress={requestForOTP}
      />
      {countDown > 0 && !canSendNewOtpRequest ? (
        <Text style={styles.countDown}>{countDown} second</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countDown: {
    color: colors.BLUE,
    marginLeft: 10,
  },
});
