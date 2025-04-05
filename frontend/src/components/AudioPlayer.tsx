import Slider from '@react-native-community/slider';
import formatDuration from 'format-duration';
import React, {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useProgress} from 'react-native-track-player';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import useAudioController from '../hooks/useAudioController';
import {getPlayerState, updatePlaybackRate} from '../store/player';
import AppModal from '../ui/AppModal';
import Loader from '../ui/Loader';
import PlayPauseBtn from '../ui/PlayPauseBtn';
import PlaybackRateSelector from '../ui/PlaybackRateSelector';
import PlayerController from '../ui/PlayerController';
import colors from '../utils/colors';
import AudioInfoContainer from './AudioInfoContainer';
import AudioListContainer from './AudioListContainer';

interface Props {
  visible: boolean;
  onRequestClose(): void;
  onListOptionPress?(): void;
  onProfileLinkPress?(): void;
}

const formattedDuration = (duration = 0) => {
  return formatDuration(duration, {
    leading: true,
  });
};

export default function AudioPlayer({
  visible,
  onRequestClose,
  onListOptionPress,
  onProfileLinkPress,
}: Props) {
  const [showAudioInfo, setShowAudioInfo] = useState(false);
  const [showAudioList, setShowAudioList] = useState(false);
  const {onGoingAudio, playbackRate} = useSelector(getPlayerState);
  const {
    isPlaying,
    isBusy,
    seekTo,
    skipTo,
    togglePlayPause,
    onNextPress,
    onPreviousPress,
    setPlaybackRate,
  } = useAudioController();
  const poster = onGoingAudio?.poster;
  const source = poster ? {uri: poster} : require('../assets/music.png');

  const {duration, position} = useProgress();
  const dispatch = useDispatch();

  const updateSeek = async (value: number) => {
    await seekTo(value);
  };

  const handleOnNextPress = async () => {
    await onNextPress();
  };

  const handleOnPreviousPress = async () => {
    await onPreviousPress();
  };

  const handleSkipTo = async (skipType: 'forward' | 'reverse') => {
    if (skipType === 'forward') await skipTo(10);
    if (skipType === 'reverse') await skipTo(-10);
  };

  const onPlaybackRatePress = async (rate: number) => {
    await setPlaybackRate(rate);
    dispatch(updatePlaybackRate(rate));
  };

  return (
    <AppModal
      animation
      visible={visible}
      onRequestClose={onRequestClose}
      modalColor={colors.PLAYER_BLUE}
      backdropColor="">
      <AudioInfoContainer
        visible={showAudioInfo}
        closeHandler={setShowAudioInfo}
      />
      <AudioListContainer
        visible={showAudioList}
        closeHandler={setShowAudioList}
      />

      <View style={styles.container}>
        <Image source={source} style={styles.poster} />

        <View style={styles.contentContainer}>
          <View style={styles.infoContainer}>
            <View style={styles.titleWrapper}>
              <Text style={styles.title} onPress={() => setShowAudioInfo(true)}>
                {onGoingAudio?.title}
                <MaterialCommunityIcons
                  name="dots-vertical"
                  color={colors.WHITE}
                  size={18}
                />
              </Text>
            </View>

            <View style={styles.titleWrapper}>
              <Text style={styles.name} onPress={onProfileLinkPress}>
                {onGoingAudio?.owner.name || ''}
                <MaterialCommunityIcons
                  name="dots-vertical"
                  color={colors.YELLOW}
                  size={15}
                />
              </Text>
            </View>
          </View>

          <View style={styles.durationContainer}>
            <Text style={styles.duration}>
              {formattedDuration(position * 1000)}
            </Text>
            <Text style={styles.duration}>
              {formattedDuration(duration * 1000)}
            </Text>
          </View>
          <Slider
            minimumValue={0}
            maximumValue={duration}
            minimumTrackTintColor={colors.WHITE}
            maximumTrackTintColor={colors.INACTIVE_CONTRAST}
            value={position}
            onSlidingComplete={updateSeek}
          />

          <View style={styles.controls}>
            <PlayerController ignoreContainer onPress={handleOnPreviousPress}>
              <AntDesign name="stepbackward" size={24} color={colors.WHITE} />
            </PlayerController>

            <PlayerController
              onPress={() => handleSkipTo('reverse')}
              ignoreContainer>
              <FontAwesome name="rotate-left" size={18} color={colors.WHITE} />
              <Text style={styles.skipText}>-10s</Text>
            </PlayerController>

            <PlayerController>
              {isBusy ? (
                <Loader color={colors.BLACK} />
              ) : (
                <PlayPauseBtn
                  playing={isPlaying}
                  color={colors.BLACK}
                  onPress={togglePlayPause}
                />
              )}
            </PlayerController>

            <PlayerController
              ignoreContainer
              onPress={() => handleSkipTo('forward')}>
              <FontAwesome name="rotate-right" size={18} color={colors.WHITE} />
              <Text style={styles.skipText}>+10s</Text>
            </PlayerController>

            <PlayerController ignoreContainer onPress={handleOnNextPress}>
              <AntDesign name="stepforward" size={24} color={colors.WHITE} />
            </PlayerController>
          </View>

          <PlaybackRateSelector
            onPress={onPlaybackRatePress}
            activeRate={playbackRate.toString()}
            onListOptionPress={setShowAudioList}
          />
        </View>
      </View>
    </AppModal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    marginTop: 80,
  },
  titleWrapper: {
    flexDirection: 'row',
  },
  infoContainer: {
    gap: 5,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    color: colors.YELLOW,
    fontSize: 15,
    fontWeight: '600',
    alignItems: 'center',
    justifyContent: 'center',
  },
  poster: {
    width: 330,
    height: 250,
    borderRadius: 10,
    marginBottom: 10,
  },
  contentContainer: {
    width: '100%',
    flex: 1,
    marginTop: 20,
  },
  durationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  duration: {
    color: colors.WHITE,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  skipText: {
    fontSize: 12,
    marginTop: 2,
    color: colors.WHITE,
  },
  listOptionBtnContainer: {
    alignItems: 'flex-end',
  },
});
