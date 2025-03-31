import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {PublicProfile} from '../../@types/user';
import AvatarField from '../../ui/AvatarField';
import colors from '../../utils/colors';
import {useFetchIsFollowing} from '../../hooks/query';
import {getClient} from '../../api/client';
import catchAsyncError from '../../api/catchError';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

interface Props {
  profile?: PublicProfile;
}

export default function PublicProfileContainer({profile}: Props) {
  const {data: isFollowing} = useFetchIsFollowing(profile?.id || '');
  const queryClient = useQueryClient();

  const followingMutation = useMutation({
    mutationFn: async id => toggleFollowing(id),
    onMutate: (id: string) => {
      queryClient.setQueryData<boolean>(
        ['is-following', id],
        oldData => !oldData,
      );
    },
  });

  const toggleFollowing = async (id: string) => {
    try {
      if (!id) return;

      const client = await getClient();
      await client.post('/profile/update-follower/' + id);
      queryClient.invalidateQueries({queryKey: ['profile', id]});
    } catch (error) {
      const errorMeg = catchAsyncError(error);
      Toast.show({type: 'error', text1: errorMeg});
      console.error(errorMeg);
    }
  };

  if (!profile) return null;
  return (
    <View style={styles.container}>
      <AvatarField source={profile.avatar} />
      <View style={styles.profileInfoContainer}>
        <Text style={styles.profileName}>{profile.name}</Text>
        <Text style={styles.followerText}>{profile.followers} Followers</Text>

        <Pressable
          onPress={() => followingMutation.mutate(profile.id)}
          style={styles.flexRow}>
          <Text style={styles.profileActionLink}>
            {isFollowing ? 'Unfollow' : 'Follow'}
          </Text>
        </Pressable>
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
    gap: 5,
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
    marginTop: 5,
  },
  followerText: {
    color: colors.CONTRAST,
    paddingVertical: 2,
    marginTop: 5,
  },
  settingBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
