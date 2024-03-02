import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import ProfileSetting from '../components/profile/ProfileSetting';
import Profile from '../views/Profile';
import Verification from '../views/auth/Verification';
import {ProfileNavigatorStackParamList} from '../@types/navigation';

interface Props {}

const Stack = createNativeStackNavigator<ProfileNavigatorStackParamList>();

export default function ProfileNavigator({}: Props) {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="ProfileSetting" component={ProfileSetting} />
      <Stack.Screen name="Verification" component={Verification} />
    </Stack.Navigator>
  );
}
