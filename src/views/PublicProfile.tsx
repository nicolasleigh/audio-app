import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {HomeNavigatorStackParamList} from '../@types/navigation';
import AppView from '../components/AppView';

type Props = NativeStackScreenProps<
  HomeNavigatorStackParamList,
  'PublicProfile'
>;

export default function PublicProfile({route}: Props) {
  const {profileId} = route.params;
  console.log(profileId);
  return (
    <AppView>
      <View style={styles.container}>
        <Text style={{color: 'white'}}>Public Profile</Text>
      </View>
    </AppView>
  );
}

const styles = StyleSheet.create({
  container: {},
});
