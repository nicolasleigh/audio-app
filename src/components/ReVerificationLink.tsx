import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import colors from '../utils/colors';
import AppLink from '../ui/AppLink';
import {getClient} from '../api/client';
import {useDispatch, useSelector} from 'react-redux';
import {getAuthState} from '../store/auth';
import catchAsyncError from '../api/catchError';
import {updateNotification} from '../store/notification';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ProfileNavigatorStackParamList} from '../@types/navigation';

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
  const dispatch = useDispatch();

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
      dispatch(updateNotification({message: errorMessage, type: 'error'}));
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
      {countDown > 0 && !canSendNewOtpRequest ? (
        <Text style={styles.countDown}>{countDown} sec</Text>
      ) : null}
      <AppLink
        active={canSendNewOtpRequest}
        title={linkTitle}
        onPress={requestForOTP}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countDown: {
    color: colors.SECONDARY,
    marginRight: 7,
  },
});
