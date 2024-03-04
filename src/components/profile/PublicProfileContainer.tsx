import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {PublicProfile} from '../../@types/user';
import AvatarField from '../../ui/AvatarField';
import colors from '../../utils/colors';

interface Props {
  profile?: PublicProfile;
}

export default function PublicProfileContainer({profile}: Props) {
  if (!profile) return null;
  return (
    <View style={styles.container}>
      <AvatarField source={profile.avatar} />
      <View style={styles.profileInfoContainer}>
        <Text style={styles.profileName}>{profile.name}</Text>

        <View style={styles.flexRow}>
          <Text style={styles.profileActionLink}>
            {profile.followers} Followers
          </Text>
        </View>
      </View>
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
