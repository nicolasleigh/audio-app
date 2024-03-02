import React from 'react';
import {StyleSheet, View} from 'react-native';
import {UserProfile} from '../store/auth';
import AvatarField from '../ui/AvatarField';

interface Props {
  profile?: UserProfile | null;
}

export default function ProfileContainer({profile}: Props) {
  if (!profile) return null;
  return (
    <View style={styles.container}>
      <AvatarField source={profile.avatar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
