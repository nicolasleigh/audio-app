import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../utils/colors';
import Upload from '../views/Upload';
import HomeNavigator from './HomeNavigator';
import ProfileNavigator from './ProfileNavigator';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      // tabBar={props => <MyTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.ABSOLUTEWHITE,
        },
      }}>
      <Tab.Screen
        name="HomeNavigator"
        key="home"
        component={HomeNavigator}
        options={{
          tabBarIcon: props => {
            // console.log(props);
            return (
              <AntDesign name="home" size={props.size} color={props.color} />
            );
          },
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="ProfileNavigator"
        component={ProfileNavigator}
        key="profile"
        options={{
          tabBarIcon: props => {
            return (
              <AntDesign name="user" size={props.size} color={props.color} />
            );
          },
          tabBarLabel: 'Profile',
        }}
      />
      <Tab.Screen
        name="UploadScreen"
        component={Upload}
        key="upload"
        options={{
          tabBarIcon: props => {
            return (
              <MaterialCommunityIcons
                name="account-music-outline"
                size={props.size}
                color={props.color}
              />
            );
          },
          tabBarLabel: 'Upload',
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
