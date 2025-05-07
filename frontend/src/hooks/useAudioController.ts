import deepEqual from 'deep-equal';
import RNFS from 'react-native-fs';
import Toast from 'react-native-toast-message';
import TrackPlayer, {
  State,
  Track,
  usePlaybackState,
} from 'react-native-track-player';
import {useDispatch, useSelector} from 'react-redux';
import {AudioData} from '../@types/audio';
import {
  getPlayerState,
  updateOnGoingAudio,
  updateOnGoingList,
} from '../store/player';

// let isReady = false;

const updateQueue = async (data: AudioData[]) => {
  const lists: Track[] = data.map(item => {
    return {
      id: item.id,
      title: item.title,
      // url: item.file,
      url: RNFS.CachesDirectoryPath + `/${item.publicId}.mp3`,
      artwork: item.poster || require('../assets/music.jpg'),
      artist: item.owner.name,
      genre: item.category,
      isLiveStream: true,
    };
  });
  await TrackPlayer.add([...lists]);
};

const downLoadFile = async (url: string, publicId: string) => {
  const filePath = RNFS.CachesDirectoryPath + `/${publicId}.mp3`;
  const isExists = await RNFS.exists(filePath);
  if (isExists) {
    return;
  }

  RNFS.downloadFile({
    fromUrl: url,
    toFile: filePath,
    background: true, // Enable downloading in the background (iOS only)
    discretionary: true, // Allow the OS to control the timing and speed (iOS only)
    begin: res => {
      console.log(res.contentLength);
    },
    progress: res => {
      const progress = (res.bytesWritten / res.contentLength) * 100;
      const progressText = `${progress.toFixed(2)}%`;
      Toast.show({
        type: 'info',
        text1: `Downloading progress: ${progressText}`,
      });
    },
  })
    .promise.then(response => {
      console.log('File downloaded!', response);
      Toast.show({type: 'success', text1: 'Audio downloaded successfully'});
    })
    .catch(err => {
      console.error('Download error:', err);
      Toast.show({type: 'error', text1: 'Failed to download'});
    });
};

const useAudioController = () => {
  const playbackState = usePlaybackState();
  const {onGoingAudio, onGoingList} = useSelector(getPlayerState);
  const dispatch = useDispatch();
  // console.log('playbackState--:', playbackState);

  const isPlayerReady = Boolean(playbackState.state);
  const isPlaying = playbackState.state === State.Playing;
  const isPaused = playbackState.state === State.Paused;
  const isBusy =
    playbackState.state === State.Buffering ||
    playbackState.state === State.Loading;

  const onAudioPress = async (item: AudioData, data: AudioData[]) => {
    await downLoadFile(item.file, item.publicId);

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
    if (!currentIndex) {
      return;
    }

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
    if (!currentIndex) {
      return;
    }

    const preIndex = currentIndex - 1;

    const prevAudio = currentList[preIndex];
    if (prevAudio) {
      await TrackPlayer.skipToPrevious();
      dispatch(updateOnGoingAudio(onGoingList[preIndex]));
    }
  };

  const setPlaybackRate = async (rate: number) => {
    await TrackPlayer.setRate(rate);
  };

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
    isPaused,
  };
};

export default useAudioController;
