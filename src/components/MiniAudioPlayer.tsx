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

interface Props {}

export const MiniPlayerHeight = 60;

export default function MiniAudioPlayer({}: Props) {
  const {onGoingAudio} = useSelector(getPlayerState);
  const {isPlaying, isBusy, togglePlayPause} = useAudioController();
  const [playerVisibility, setPlayerVisibility] = useState(false);
  const progress = useProgress();
  // console.log(progress); //{"buffered": 90.69714285714285, "duration": 90.69714285714285, "position": 0.502803609}
  const poster = onGoingAudio?.poster;
  const source = poster ? {uri: poster} : require('../assets/music.png');

  const closePlayerModal = () => {
    setPlayerVisibility(false);
  };
  const showPlayerModal = () => {
    setPlayerVisibility(true);
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
        <Pressable style={{paddingHorizontal: 10}}>
          <AntDesign name="hearto" size={24} color={colors.CONTRAST} />
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
