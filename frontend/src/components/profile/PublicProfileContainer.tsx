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
      if (!id) {
        return;
      }

      const client = await getClient();
      await client.post('/profile/update-follower/' + id);
      queryClient.invalidateQueries({queryKey: ['profile', id]});
    } catch (error) {
      const errorMeg = catchAsyncError(error);
      Toast.show({type: 'error', text1: errorMeg});
      console.error(errorMeg);
    }
  };

  if (!profile) {
    return null;
  }
  return (
    <View style={styles.container}>
      <AvatarField source={profile.avatar} />
      <View style={styles.profileInfoContainer}>
        <Text style={styles.profileName}>{profile.name}</Text>
        <Text style={styles.followerText}>{profile.followers} Followers</Text>
      </View>
      <Pressable
        onPress={() => followingMutation.mutate(profile.id)}
        style={styles.flexRow}>
        <Text style={styles.profileActionLink}>
          {isFollowing ? 'Unfollow' : 'Follow'}
        </Text>
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
    gap: 20,
    borderWidth: 1,
    borderRadius: 5,
    // paddingHorizontal: 5,
    paddingVertical: 10,
    backgroundColor: colors.DARKWHITE,
    marginBottom: 10,
  },
  profileName: {
    color: colors.BLACK,
    fontSize: 18,
    fontWeight: '700',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  profileInfoContainer: {
    width: 75,
  },
  profileActionLink: {
    backgroundColor: colors.BLUE,
    // paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 5,
    overflow: 'hidden',
    color: colors.WHITE,
    borderRadius: 5,
    width: 70,
    textAlign: 'center',
  },
  followerText: {
    color: colors.BLACK,
    paddingVertical: 2,
    // marginTop: 5,
    fontSize: 12,
  },
});
