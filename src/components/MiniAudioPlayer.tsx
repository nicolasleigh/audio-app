import React, {useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../utils/colors';
import {useSelector} from 'react-redux';
import {getPlayerState} from '../store/player';
import PlayPauseBtn from '../ui/PlayPauseBtn';
import useAudioController from '../hooks/useAudioController';
import Loader from '../ui/Loader';
import {mapRange} from '../utils/math';
import {useProgress} from 'react-native-track-player';
import AudioPlayer from './AudioPlayer';
import CurrentAudioList from './CurrentAudioList';
import {useFetchIsFavorite} from '../hooks/query';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {getClient} from '../api/client';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {HomeNavigatorStackParamList} from '../@types/navigation';

interface Props {}

export const MiniPlayerHeight = 60;

export default function MiniAudioPlayer({}: Props) {
  const {onGoingAudio} = useSelector(getPlayerState);
  const {isPlaying, isBusy, togglePlayPause} = useAudioController();
  const [playerVisibility, setPlayerVisibility] = useState(false);
  const [showCurrentList, setShowCurrentList] = useState(false);
  const progress = useProgress();
  const {navigate} =
    useNavigation<NavigationProp<HomeNavigatorStackParamList>>();
  const {data: isFav} = useFetchIsFavorite(onGoingAudio?.id || '');

  // console.log(progress); //{"buffered": 90.69714285714285, "duration": 90.69714285714285, "position": 0.502803609}
  const poster = onGoingAudio?.poster;
  const source = poster ? {uri: poster} : require('../assets/music.png');
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
  const handleOnCurrentListClose = () => {
    setShowCurrentList(false);
  };
  const handleOnListOptionPress = () => {
    closePlayerModal();
    setShowCurrentList(true);
  };
  const handleOnProfileLinkPress = () => {
    closePlayerModal();
    navigate('PublicProfile', {
      profileId: onGoingAudio?.id || '',
    });
  };

  return (
    <>
      <View
        style={{
          height: 2,
          backgroundColor: colors.SECONDARY,
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
            color={colors.CONTRAST}
          />
        </Pressable>

        {isBusy ? (
          <Loader />
        ) : (
          <PlayPauseBtn playing={isPlaying} onPress={togglePlayPause} />
        )}
      </View>
      <AudioPlayer
        visible={playerVisibility}
        onRequestClose={closePlayerModal}
        onListOptionPress={handleOnListOptionPress}
        onProfileLinkPress={handleOnProfileLinkPress}
      />
      <CurrentAudioList
        visible={showCurrentList}
        onRequestClose={handleOnCurrentListClose}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: MiniPlayerHeight,
    backgroundColor: colors.PRIMARY,
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
    color: colors.CONTRAST,
    fontWeight: '700',
    paddingHorizontal: 5,
  },
  contentContainer: {
    flex: 1,
    height: '100%',
    padding: 5,
  },
  name: {
    color: colors.SECONDARY,
    fontWeight: '700',
    paddingHorizontal: 5,
  },
});
