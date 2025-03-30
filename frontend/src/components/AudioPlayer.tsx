import React, {useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import AppModal from '../ui/AppModal';
import {useDispatch, useSelector} from 'react-redux';
import {getPlayerState, updatePlaybackRate} from '../store/player';
import colors from '../utils/colors';
import AppLink from '../ui/AppLink';
import {useProgress} from 'react-native-track-player';
import formatDuration from 'format-duration';
import Slider from '@react-native-community/slider';
import useAudioController from '../hooks/useAudioController';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PlayPauseBtn from '../ui/PlayPauseBtn';
import PlayerController from '../ui/PlayerController';
import Loader from '../ui/Loader';
import PlaybackRateSelector from '../ui/PlaybackRateSelector';
import AudioInfoContainer from './AudioInfoContainer';

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
    <AppModal animation visible={visible} onRequestClose={onRequestClose}>
      <View style={styles.container}>
        <Pressable
          style={styles.infoBtn}
          onPress={() => setShowAudioInfo(true)}>
          <AntDesign name="infocirlceo" color={colors.CONTRAST} size={24} />
        </Pressable>
        <AudioInfoContainer
          visible={showAudioInfo}
          closeHandler={setShowAudioInfo}
        />
        <Image source={source} style={styles.poster} />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{onGoingAudio?.title}</Text>

          <AppLink
            onPress={onProfileLinkPress}
            title={onGoingAudio?.owner.name || ''}
          />

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
            minimumTrackTintColor={colors.CONTRAST}
            maximumTrackTintColor={colors.INACTIVE_CONTRAST}
            value={position}
            onSlidingComplete={updateSeek}
          />

          <View style={styles.controls}>
            <PlayerController ignoreContainer onPress={handleOnPreviousPress}>
              <AntDesign
                name="stepbackward"
                size={24}
                color={colors.CONTRAST}
              />
            </PlayerController>

            <PlayerController
              onPress={() => handleSkipTo('reverse')}
              ignoreContainer>
              <FontAwesome
                name="rotate-left"
                size={18}
                color={colors.CONTRAST}
              />
              <Text style={styles.skipText}>-10s</Text>
            </PlayerController>

            <PlayerController>
              {isBusy ? (
                <Loader color={colors.PRIMARY} />
              ) : (
                <PlayPauseBtn
                  playing={isPlaying}
                  color={colors.PRIMARY}
                  onPress={togglePlayPause}
                />
              )}
            </PlayerController>

            <PlayerController
              ignoreContainer
              onPress={() => handleSkipTo('forward')}>
              <FontAwesome
                name="rotate-right"
                size={18}
                color={colors.CONTRAST}
              />
              <Text style={styles.skipText}>+10s</Text>
            </PlayerController>

            <PlayerController ignoreContainer onPress={handleOnNextPress}>
              <AntDesign name="stepforward" size={24} color={colors.CONTRAST} />
            </PlayerController>
          </View>

          <PlaybackRateSelector
            onPress={onPlaybackRatePress}
            activeRate={playbackRate.toString()}
            onListOptionPress={onListOptionPress}
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
    // backgroundColor: 'white',
  },
  poster: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  contentContainer: {
    width: '100%',
    flex: 1,
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.CONTRAST,
  },
  durationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  duration: {
    color: colors.CONTRAST,
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
    color: colors.CONTRAST,
  },
  infoBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  listOptionBtnContainer: {
    alignItems: 'flex-end',
  },
});
