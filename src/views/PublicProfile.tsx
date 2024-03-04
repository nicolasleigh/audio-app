import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {HomeNavigatorStackParamList} from '../@types/navigation';
import AppView from '../components/AppView';
import PublicProfileContainer from '../components/profile/PublicProfileContainer';
import {useFetchPublicProfile} from '../hooks/query';

type Props = NativeStackScreenProps<
  HomeNavigatorStackParamList,
  'PublicProfile'
>;

export default function PublicProfile({route}: Props) {
  const {profileId} = route.params;
  const {data} = useFetchPublicProfile(profileId);
  return (
    <AppView>
      <View style={styles.container}>
        <PublicProfileContainer profile={data} />
      </View>
    </AppView>
  );
}

const styles = StyleSheet.create({
  container: {},
});
