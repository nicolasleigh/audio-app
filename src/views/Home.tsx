import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LatestUploads from '../components/LatestUploads';
import RecommendedAudios from '../components/RecommendedAudios';
import OptionsModal from '../components/OptionsModal';
import colors from '../utils/colors';
import {AudioData, Playlist} from '../@types/audio';
import client from '../api/client';
import {Keys, getFromAsyncStorage} from '../utils/asyncStorage';
import catchAsyncError from '../api/catchError';
import {useDispatch} from 'react-redux';
import {updateNotification} from '../store/notification';
import PlaylistModal from '../components/PlaylistModal';
import PlaylistForm, {PlaylistInfo} from '../components/PlaylistForm';
import {useFetchPlaylist} from '../hooks/query';

interface Props {}

export default function Home({}: Props) {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedAudio, setSelectedAudio] = useState<AudioData>();
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [showPlaylistForm, setShowPlaylistForm] = useState(false);

  const {data: list} = useFetchPlaylist();

  const dispatch = useDispatch();

  const handleOnFavPress = async () => {
    if (!selectedAudio) return;

    // send request with the audio id that we want to add to fav
    try {
      const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
      const {data} = await client.post(
        '/favorite?audioId=' + selectedAudio.id,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
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
      const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
      const {data} = await client.post(
        '/playlist/create',
        {
          resId: selectedAudio?.id,
          title: value.title,
          visibility: value.private ? 'private' : 'public',
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(data);
    } catch (error) {
      const errorMsg = catchAsyncError(error);
      console.log(errorMsg);
    }
  };

  const updatePlaylist = async (item: Playlist) => {
    try {
      const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
      const {data} = await client.patch(
        '/playlist',
        {
          id: item.id,
          item: selectedAudio?.id,
          title: item.title,
          visibility: item.visibility,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
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
  return (
    <View style={styles.container}>
      <LatestUploads
        onAudioPress={item => {
          console.log(item);
        }}
        onAudioLongPress={handleOnLongPress}
      />
      <RecommendedAudios
        onAudioPress={item => {
          console.log(item);
        }}
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
    </View>
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
