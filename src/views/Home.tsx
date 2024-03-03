import React, {useEffect, useState} from 'react';
import {
  Button,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import {AudioData, Playlist} from '../@types/audio';
import catchAsyncError from '../api/catchError';
import {getClient} from '../api/client';
import LatestUploads from '../components/LatestUploads';
import OptionsModal from '../components/OptionsModal';
import PlaylistForm, {PlaylistInfo} from '../components/PlaylistForm';
import PlaylistModal from '../components/PlaylistModal';
import RecommendedAudios from '../components/RecommendedAudios';
import {useFetchPlaylist} from '../hooks/query';
import {updateNotification} from '../store/notification';
import colors from '../utils/colors';
import TrackPlayer, {Track} from 'react-native-track-player';
import useAudioController from '../hooks/useAudioController';
import AppView from '../components/AppView';
import AppModal from '../ui/AppModal';

interface Props {}

export default function Home({}: Props) {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedAudio, setSelectedAudio] = useState<AudioData>();
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [showPlaylistForm, setShowPlaylistForm] = useState(false);
  const {onAudioPress} = useAudioController();
  const [show, setShow] = useState(false);

  const {data: list} = useFetchPlaylist();

  const dispatch = useDispatch();

  const handleOnFavPress = async () => {
    if (!selectedAudio) return;

    // send request with the audio id that we want to add to fav
    try {
      const client = await getClient();
      const {data} = await client.post('/favorite?audioId=' + selectedAudio.id);
    } catch (error) {
      const errorMsg = catchAsyncError(error);
      dispatch(updateNotification({message: errorMsg, type: 'error'}));
    }
    setSelectedAudio(undefined);
    setShowOptions(false);
  };

  const handleOnLongPress = (audio: AudioData) => {
    setSelectedAudio(audio);
    setShowOptions(true);
  };

  const handleOnAddToPlaylist = () => {
    setShowOptions(false);
    setShowPlaylistModal(true);
  };

  const handlePlaylistSubmit = async (value: PlaylistInfo) => {
    if (!value.title.trim()) return;
    try {
      const client = await getClient();
      const {data} = await client.post('/playlist/create', {
        resId: selectedAudio?.id,
        title: value.title,
        visibility: value.private ? 'private' : 'public',
      });
      console.log(data);
    } catch (error) {
      const errorMsg = catchAsyncError(error);
      console.log(errorMsg);
    }
  };

  const updatePlaylist = async (item: Playlist) => {
    try {
      const client = await getClient();
      const {data} = await client.patch('/playlist', {
        id: item.id,
        item: selectedAudio?.id,
        title: item.title,
        visibility: item.visibility,
      });
      setSelectedAudio(undefined);
      setShowPlaylistModal(false);
      dispatch(
        updateNotification({message: 'Added to playlist', type: 'success'}),
      );
    } catch (error) {
      const errorMsg = catchAsyncError(error);
      console.log(errorMsg);
    }
  };

  useEffect(() => {
    const setupPlayer = async () => {
      await TrackPlayer.setupPlayer();
    };
    setupPlayer();
  }, []);

  return (
    <AppView>
      <ScrollView contentContainerStyle={styles.container}>
        <LatestUploads
          onAudioPress={onAudioPress}
          onAudioLongPress={handleOnLongPress}
        />
        <RecommendedAudios
          onAudioPress={onAudioPress}
          onAudioLongPress={handleOnLongPress}
        />
        <OptionsModal
          visible={showOptions}
          onRequestClose={() => {
            setShowOptions(false);
          }}
          options={[
            {
              title: 'Add to playlist',
              icon: 'playlist-music',
              onPress: handleOnAddToPlaylist,
            },
            {
              title: 'Add to favorites',
              icon: 'cards-heart',
              onPress: handleOnFavPress,
            },
          ]}
          renderItem={item => {
            return (
              <Pressable onPress={item.onPress} style={styles.optionContainer}>
                <MaterialCommunityIcons
                  size={24}
                  color={colors.PRIMARY}
                  name={item.icon}
                />
                <Text style={styles.optionLabel}>{item.title}</Text>
              </Pressable>
            );
          }}
        />

        <PlaylistModal
          visible={showPlaylistModal}
          onRequestClose={() => {
            setShowPlaylistModal(false);
          }}
          list={list || []}
          onCreateNew={() => {
            setShowPlaylistModal(false);
            setShowPlaylistForm(true);
          }}
          onPlaylistPress={updatePlaylist}
        />
        <PlaylistForm
          visible={showPlaylistForm}
          onRequestClose={() => {
            setShowPlaylistForm(false);
          }}
          onSubmit={handlePlaylistSubmit}
        />
        <Button title="Open" onPress={() => setShow(true)} />
      </ScrollView>
      <AppModal animation visible={show} onRequestClose={() => setShow(false)}>
        <View />
      </AppModal>
    </AppView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  optionLabel: {color: colors.PRIMARY, fontSize: 16, marginLeft: 5},
});
