import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {useSelector} from 'react-redux';
import {getAuthState} from '../store/auth';
import AuthNavigator from './AuthNavigator';
import TabNavigator from './TabNavigator';

interface Props {}

export default function AppNavigator({}: Props) {
  const {loggedIn} = useSelector(getAuthState);
  return (
    <NavigationContainer>
      {loggedIn ? <TabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
