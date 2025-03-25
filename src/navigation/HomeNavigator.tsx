import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {HomeNavigatorStackParamList} from '../@types/navigation';
import Home from '../views/Home';
import PublicProfile from '../views/PublicProfile';

interface Props {}

const Stack = createNativeStackNavigator<HomeNavigatorStackParamList>();

export default function HomeNavigator({}: Props) {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="PublicProfile" component={PublicProfile} />
    </Stack.Navigator>
  );
}
