import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import LostPassword from '../views/auth/LostPassword';
import SignIn from '../views/auth/SignIn';
import SignUp from '../views/auth/SignUp';
import Verification from '../views/auth/Verification';
import {AuthStackParamList} from '../@types/navigation';
import {useSelector} from 'react-redux';
import {getAuthState} from '../store/auth';

interface Props {}

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthNavigator({}: Props) {
  const authState = useSelector(getAuthState);
  console.log(authState);
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="LostPassword" component={LostPassword} />
      <Stack.Screen name="Verification" component={Verification} />
    </Stack.Navigator>
  );
}
