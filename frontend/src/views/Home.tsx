import React, {useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import {AudioData, Playlist} from '../@types/audio';
import catchAsyncError from '../api/catchError';
import {getClient} from '../api/client';
import AppView from '../components/AppView';
import LatestUploads from '../components/LatestUploads';
import OptionsModal from '../components/OptionsModal';
import PlaylistForm, {PlaylistInfo} from '../components/PlaylistForm';
import PlaylistModal from '../components/PlaylistModal';
import RecentlyPlayed from '../components/RecentlyPlayed';
import RecommendedAudios from '../components/RecommendedAudios';
import RecommendedPlaylist from '../components/RecommendedPlaylist';
import {useFetchPlaylist} from '../hooks/query';
import useAudioController from '../hooks/useAudioController';
import {updateNotification} from '../store/notification';
import colors from '../utils/colors';
import {
  updatePlaylistVisibility,
  updateSelectedListId,
} from '../store/playlistModal';
import Toast from 'react-native-toast-message';
import {useQueryClient} from '@tanstack/react-query';

interface Props {}

export default function Home({}: Props) {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedAudio, setSelectedAudio] = useState<AudioData>();
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [showPlaylistForm, setShowPlaylistForm] = useState(false);
  const {onAudioPress} = useAudioController();
  const [show, setShow] = useState(false);
  const queryClient = useQueryClient();

  const {data: list} = useFetchPlaylist();

  const dispatch = useDispatch();

  const handleOnFavPress = async () => {
    if (!selectedAudio) return;

    // send request with the audio id that we want to add to fav
    try {
      const client = await getClient();
      const {data} = await client.post(
        '/favorite/add?audioId=' + selectedAudio.id,
      );
      queryClient.invalidateQueries({queryKey: ['favorite', selectedAudio.id]});
      Toast.show({type: data.toast, text1: data.message});
    } catch (error) {
      const errorMsg = catchAsyncError(error);
      Toast.show({type: 'error', text1: errorMsg});
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
      queryClient.invalidateQueries({queryKey: ['playlist']});
      Toast.show({type: 'success', text1: 'Playlist created'});
      // console.log(data);
    } catch (error) {
      const errorMsg = catchAsyncError(error);
      Toast.show({type: 'error', text1: errorMsg});
      console.error(errorMsg);
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

      Toast.show({type: 'success', text1: 'Added to playlist'});
    } catch (error) {
      const errorMsg = catchAsyncError(error);
      console.log(errorMsg);
    }
  };

  const handleOnListPress = (playlist: Playlist) => {
    dispatch(updateSelectedListId(playlist.id));
    dispatch(updatePlaylistVisibility(true));
  };

  return (
    <AppView>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.space}>
          <RecentlyPlayed />
        </View>

        <View style={styles.space}>
          <LatestUploads
            onAudioPress={onAudioPress}
            onAudioLongPress={handleOnLongPress}
          />
        </View>

        <View style={styles.space}>
          <RecommendedAudios
            onAudioPress={onAudioPress}
            onAudioLongPress={handleOnLongPress}
          />
        </View>

        <View style={styles.space}>
          <RecommendedPlaylist onListPress={handleOnListPress} />
        </View>

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
      </ScrollView>
    </AppView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  space: {
    marginBottom: 15,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  optionLabel: {color: colors.PRIMARY, fontSize: 16, marginLeft: 5},
});
