import React from 'react';
import {StyleSheet, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Profile from '../views/Profile';
import ProfileSetting from '../components/profile/ProfileSetting';

interface Props {}

const Stack = createNativeStackNavigator();

export default function ProfileNavigator({}: Props) {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="ProfileSetting" component={ProfileSetting} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {},
});
