import TrackPlayer, {
  Track,
  usePlaybackState,
  State,
  AppKilledPlaybackBehavior,
  Capability,
} from 'react-native-track-player';
import {AudioData} from '../@types/audio';
import {useDispatch, useSelector} from 'react-redux';
import {
  getPlayerState,
  updateOnGoingAudio,
  updateOnGoingList,
} from '../store/player';
import deepEqual from 'deep-equal';
import {useEffect} from 'react';

let isReady = false;

const updateQueue = async (data: AudioData[]) => {
  const lists: Track[] = data.map(item => {
    return {
      id: item.id,
      title: item.title,
      url: item.file,
      artwork: item.poster || require('../assets/music.png'),
      artist: item.owner.name,
      genre: item.category,
      isLiveStream: true,
    };
  });
  await TrackPlayer.add([...lists]);
};

const useAudioController = () => {
  const playbackState = usePlaybackState();
  const {onGoingAudio, onGoingList} = useSelector(getPlayerState);
  const dispatch = useDispatch();
  console.log(playbackState);

  // const isPlayerReady = playbackState.state !== State.None;
  // const isPlayerReady = playbackState.state === State.Ready;
  const isPlayerReady = Boolean(playbackState.state);
  const isPlaying = playbackState.state === State.Playing;
  const isPaused = playbackState.state === State.Paused;
  const isBusy =
    playbackState.state === State.Buffering ||
    playbackState.state === State.Loading;

  const onAudioPress = async (item: AudioData, data: AudioData[]) => {
    // console.log(playbackState);
    // if (isPlayerReady) {
    if (!playbackState.state) {
      await updateQueue(data);
      dispatch(updateOnGoingAudio(item)); // give us audio id before playing audio
      const index = data.findIndex(audio => audio.id === item.id);
      await TrackPlayer.skip(index);
      await TrackPlayer.play();
      return dispatch(updateOnGoingList(data));
    }
    if (playbackState.state === State.Playing && onGoingAudio?.id === item.id) {
      // same audio is already playing, then pause it
      return await TrackPlayer.pause();
    }
    if (playbackState.state === State.Paused && onGoingAudio?.id === item.id) {
      return await TrackPlayer.play();
    }
    if (playbackState.state) {
      await updateQueue(data);
      dispatch(updateOnGoingAudio(item));
      const index = data.findIndex(audio => audio.id === item.id);
      await TrackPlayer.skip(index);
      await TrackPlayer.play();
      return dispatch(updateOnGoingList(data));
    }
    if (onGoingAudio?.id !== item.id) {
      const fromSameList = deepEqual(onGoingList, data);

      await TrackPlayer.pause();
      const index = data.findIndex(audio => audio.id === item.id);

      if (!fromSameList) {
        // playing new audio from different list
        await TrackPlayer.reset();
        await updateQueue(data);
        dispatch(updateOnGoingList(data));
      }
      await TrackPlayer.skip(index);
      await TrackPlayer.play();
      dispatch(updateOnGoingAudio(item));
    }
  };

  const togglePlayPause = async () => {
    if (isPlaying) {
      await TrackPlayer.pause();
    }
    if (isPaused) {
      await TrackPlayer.play();
    }
  };

  const seekTo = async (position: number) => {
    await TrackPlayer.seekTo(position);
  };

  const skipTo = async (sec: number) => {
    const {position} = await TrackPlayer.getProgress();
    await TrackPlayer.seekTo(position + sec);
  };

  const onNextPress = async () => {
    const currentList = await TrackPlayer.getQueue();
    const currentIndex = await TrackPlayer.getActiveTrackIndex();
    if (!currentIndex) return;

    const nextIndex = currentIndex + 1;

    const nextAudio = currentList[nextIndex];
    if (nextAudio) {
      await TrackPlayer.skipToNext();
      dispatch(updateOnGoingAudio(onGoingList[nextIndex]));
    }
  };
  const onPreviousPress = async () => {
    const currentList = await TrackPlayer.getQueue();
    const currentIndex = await TrackPlayer.getActiveTrackIndex();
    if (!currentIndex) return;

    const preIndex = currentIndex - 1;

    const nextAudio = currentList[preIndex];
    if (nextAudio) {
      await TrackPlayer.skipToNext();
      dispatch(updateOnGoingAudio(onGoingList[preIndex]));
    }
  };

  const setPlaybackRate = async (rate: number) => {
    await TrackPlayer.setRate(rate);
  };

  useEffect(() => {
    const setupPlayer = async () => {
      if (isReady) return;

      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({
        progressUpdateEventInterval: 10, // in order to make Event.PlaybackProgressUpdated work, must set this value. Every 10s will emit event
        android: {
          appKilledPlaybackBehavior:
            AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
        },
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
        ],
        compactCapabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
        ],
      });
    };
    setupPlayer();
    isReady = true;
  }, []);

  return {
    onAudioPress,
    togglePlayPause,
    seekTo,
    skipTo,
    onNextPress,
    onPreviousPress,
    setPlaybackRate,
    isPlayerReady,
    isPlaying,
    isBusy,
  };
};

export default useAudioController;
