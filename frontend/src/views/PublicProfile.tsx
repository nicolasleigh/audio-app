import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  HomeNavigatorStackParamList,
  PublicProfileTabParamsList,
} from '../@types/navigation';
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

const Tab = createMaterialTopTabNavigator<PublicProfileTabParamsList>();

export default function PublicProfile({route}: Props) {
  const {profileId} = route.params;
  const {data} = useFetchPublicProfile(profileId);
  return (
    <AppView>
      <View style={styles.container}>
        <PublicProfileContainer profile={data} />

        <Tab.Navigator
          style={styles.nav}
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
    marginHorizontal: 7,
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
    color: colors.BLACK,
    fontSize: 12,
    fontWeight: '600',
  },
  nav: {
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 10,
    backgroundColor: colors.DARKWHITE,
    marginBottom: 5,
  },
});
