import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import React, {useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import Toast from 'react-native-toast-message';
import {useProgress} from 'react-native-track-player';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import {HomeNavigatorStackParamList} from '../@types/navigation';
import {getClient} from '../api/client';
import {useFetchIsFavorite} from '../hooks/query';
import useAudioController from '../hooks/useAudioController';
import {getAuthState} from '../store/auth';
import {getPlayerState} from '../store/player';
import Loader from '../ui/Loader';
import PlayPauseBtn from '../ui/PlayPauseBtn';
import colors from '../utils/colors';
import {mapRange} from '../utils/math';
import AudioPlayer from './AudioPlayer';

interface Props {}

export const MiniPlayerHeight = 60;

export default function MiniAudioPlayer({}: Props) {
  const {onGoingAudio} = useSelector(getPlayerState);
  const {profile} = useSelector(getAuthState);
  const {isPlaying, isBusy, togglePlayPause} = useAudioController();
  const [playerVisibility, setPlayerVisibility] = useState(false);
  const progress = useProgress();
  const {navigate} =
    useNavigation<NavigationProp<HomeNavigatorStackParamList>>();
  const {data: isFav} = useFetchIsFavorite(onGoingAudio?.id || '');

  // console.log(progress); //{"buffered": 90.69714285714285, "duration": 90.69714285714285, "position": 0.502803609}
  const poster = onGoingAudio?.poster;
  const source = poster ? {uri: poster} : require('../assets/music.jpg');
  const queryClient = useQueryClient();

  const toggleIsFav = async (id: string) => {
    if (!id) {
      return;
    }
    const client = await getClient();
    await client.post('/favorite?audioId=' + id);
  };

  const favoriteMutate = useMutation({
    mutationFn: async id => toggleIsFav(id),
    onMutate: (_: string) => {
      if (!profile?.verified) {
        return Toast.show({type: 'error', text1: 'User is not verified'});
      }
      queryClient.setQueryData<boolean>(
        ['favorite', onGoingAudio?.id],
        oldData => !oldData,
      );
    },
  });

  const closePlayerModal = () => {
    setPlayerVisibility(false);
  };
  const showPlayerModal = () => {
    setPlayerVisibility(true);
  };

  const handleOnListOptionPress = () => {
    closePlayerModal();
  };
  const handleOnProfileLinkPress = () => {
    closePlayerModal();
    navigate('PublicProfile', {
      profileId: onGoingAudio?.owner.id || '',
    });
    // if (profile?.id === onGoingAudio?.owner.id) {
    //   navigate('Profile');
    // } else {
    //   navigate('PublicProfile', {
    //     profileId: onGoingAudio?.owner.id || '',
    //   });
    // }
  };

  return (
    <>
      <View
        style={{
          height: 2,
          backgroundColor: colors.PLAYER_BLUE,
          width: `${mapRange({
            outputMin: 0,
            outputMax: 100,
            inputMin: 0,
            inputMax: progress.duration,
            inputValue: progress.position,
          })}%`,
        }}></View>

      <View style={styles.container}>
        <Image source={source} style={styles.poster} />

        <Pressable onPress={showPlayerModal} style={styles.contentContainer}>
          <Text style={styles.title}>{onGoingAudio?.title}</Text>
          <Text style={styles.name}>{onGoingAudio?.owner.name}</Text>
        </Pressable>
        <Pressable
          onPress={() => favoriteMutate.mutate(onGoingAudio?.id || '')}
          style={{paddingHorizontal: 10}}>
          <AntDesign
            name={isFav ? 'heart' : 'hearto'}
            size={24}
            // color={colors.RED}
            color={'tomato'}
          />
        </Pressable>

        {isBusy ? (
          <Loader />
        ) : (
          <PlayPauseBtn
            playing={isPlaying}
            onPress={togglePlayPause}
            color={colors.WHITE}
          />
        )}
      </View>
      <AudioPlayer
        visible={playerVisibility}
        onRequestClose={closePlayerModal}
        onListOptionPress={handleOnListOptionPress}
        onProfileLinkPress={handleOnProfileLinkPress}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: MiniPlayerHeight,
    backgroundColor: colors.PLAYER_BLUE,
    // backgroundColor: 'lightskyblue',
    // backgroundColor: 'powderblue',
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  poster: {
    height: MiniPlayerHeight - 10,
    width: MiniPlayerHeight - 10,
    // aspectRatio: 1,
    borderRadius: 5,
  },
  title: {
    color: colors.WHITE,
    fontWeight: '700',
    paddingHorizontal: 5,
    fontSize: 17,
  },
  contentContainer: {
    flex: 1,
    height: '100%',
    padding: 5,
  },
  name: {
    color: colors.LIGHTGREY,
    fontWeight: '500',
    paddingHorizontal: 5,
    fontSize: 13,
  },
});
