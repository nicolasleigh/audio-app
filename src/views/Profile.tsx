import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import FavoriteTab from '../components/profile/FavoriteTab';
import HistoryTab from '../components/profile/HistoryTab';
import PlaylistTab from '../components/profile/PlaylistTab';
import UploadsTab from '../components/profile/UploadsTab';
import colors from '../utils/colors';
import ProfileContainer from '../components/ProfileContainer';
import {useSelector} from 'react-redux';
import {getAuthState} from '../store/auth';

const Tab = createMaterialTopTabNavigator();

interface Props {}

export default function Profile({}: Props) {
  const {profile} = useSelector(getAuthState);
  return (
    <View style={styles.container}>
      <ProfileContainer profile={profile} />
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: styles.tabBarStyle,
          tabBarLabelStyle: styles.tabBarLabelStyle,
        }}>
        <Tab.Screen name="Uploads" component={UploadsTab} />
        <Tab.Screen name="Playlist" component={PlaylistTab} />
        <Tab.Screen name="Favorites" component={FavoriteTab} />
        <Tab.Screen name="History" component={HistoryTab} />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBarStyle: {
    marginBottom: 20,
    backgroundColor: 'transparent',
    elevation: 0, // remove shadow on Android
    shadowRadius: 0, // remove shadow on iOS
    shadowColor: 'transparent',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0,
  },
  tabBarLabelStyle: {
    color: colors.CONTRAST,
    fontSize: 12,
  },
});
