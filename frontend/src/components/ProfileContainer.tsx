import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {UserProfile} from '../store/auth';
import AvatarField from '../ui/AvatarField';
import colors from '../utils/colors';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ProfileNavigatorStackParamList} from '../@types/navigation';

interface Props {
  profile?: UserProfile | null;
}

export default function ProfileContainer({profile}: Props) {
  const {navigate} =
    useNavigation<NavigationProp<ProfileNavigatorStackParamList>>();
  if (!profile) {
    return null;
  }
  return (
    <View style={styles.container}>
      <AvatarField source={profile.avatar} />
      <View style={styles.profileInfoContainer}>
        <Text style={styles.profileName}>{profile.name}</Text>
        <View style={styles.flexRow}>
          <Text style={styles.email}>{profile.email}</Text>
          {profile.verified ? (
            <MaterialIcons name="verified" size={15} color={colors.SECONDARY} />
          ) : (
            <Octicons name="unverified" size={15} color={colors.SECONDARY} />
          )}
        </View>
        <View style={styles.flexRow}>
          <Text style={styles.profileActionLink}>
            {profile.followers} Followers
          </Text>
          <Text style={styles.profileActionLink}>
            {profile.followings} Followings
          </Text>
        </View>
      </View>

      <Pressable
        onPress={() => navigate('ProfileSetting')}
        style={styles.settingBtn}>
        <AntDesign name="setting" size={22} color={colors.CONTRAST} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  profileName: {
    color: colors.CONTRAST,
    fontSize: 18,
    fontWeight: '700',
  },
  email: {
    color: colors.CONTRAST,
    marginRight: 5,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileInfoContainer: {
    // paddingHorizontal: 10,
    paddingLeft: 10,
  },
  profileActionLink: {
    backgroundColor: colors.SECONDARY,
    color: colors.PRIMARY,
    paddingHorizontal: 4,
    paddingVertical: 2,
    margin: 5,
  },
  settingBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
