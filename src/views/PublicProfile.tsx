import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {HomeNavigatorStackParamList} from '../@types/navigation';
import AppView from '../components/AppView';
import PublicProfileContainer from '../components/profile/PublicProfileContainer';
import {useFetchPublicProfile} from '../hooks/query';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import colors from '../utils/colors';
import PublicUploadsTab from '../components/profile/PublicUploadsTab';
import PublicPlaylistTab from '../components/profile/PublicPlaylistTab';

type Props = NativeStackScreenProps<
  HomeNavigatorStackParamList,
  'PublicProfile'
>;

const Tab = createMaterialTopTabNavigator();

export default function PublicProfile({route}: Props) {
  const {profileId} = route.params;
  const {data} = useFetchPublicProfile(profileId);
  return (
    <AppView>
      <View style={styles.container}>
        <PublicProfileContainer profile={data} />

        <Tab.Navigator
          screenOptions={{
            tabBarStyle: styles.tabBarStyle,
            tabBarLabelStyle: styles.tabBarLabelStyle,
          }}>
          <Tab.Screen
            name="PublicUploads"
            component={PublicUploadsTab}
            options={{
              tabBarLabel: 'Uploads',
            }}
            initialParams={{profileId}}
          />
          <Tab.Screen
            name="PublicPlaylist"
            component={PublicPlaylistTab}
            options={{
              tabBarLabel: 'Playlist',
            }}
            initialParams={{profileId}}
          />
        </Tab.Navigator>
      </View>
    </AppView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
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
