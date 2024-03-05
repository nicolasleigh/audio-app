import React from 'react';
import {FlatList, StyleSheet, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useFetchPlaylistAudios} from '../hooks/query';
import {
  getPlaylistModalState,
  updatePlaylistVisibility,
} from '../store/playlistModal';
import AppModal from '../ui/AppModal';
import AudioListItem from '../ui/AudioListItem';
import AudioListLoadingUI from '../ui/AudioListLoadingUI';
import colors from '../utils/colors';
import {getPlayerState} from '../store/player';
import useAudioController from '../hooks/useAudioController';

interface Props {}

export default function PlaylistAudioModal({}: Props) {
  const {visible, selectedListId} = useSelector(getPlaylistModalState);
  const dispatch = useDispatch();
  const {data, isLoading} = useFetchPlaylistAudios(selectedListId || '');
  const {onGoingAudio} = useSelector(getPlayerState);
  const {onAudioPress} = useAudioController();
  const handleClose = () => {
    dispatch(updatePlaylistVisibility(false));
  };

  return (
    <AppModal visible={visible} onRequestClose={handleClose}>
      {isLoading ? (
        <AudioListLoadingUI />
      ) : (
        <>
          <Text style={styles.title}>{data?.title}</Text>
          <FlatList
            contentContainerStyle={styles.container}
            data={data?.audios}
            keyExtractor={item => item.id}
            renderItem={({item}) => {
              return (
                <AudioListItem
                  audio={item}
                  isPlaying={onGoingAudio?.id === item.id}
                  onPress={() => onAudioPress(item, data?.audios || [])}
                />
              );
            }}
          />
        </>
      )}
    </AppModal>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    color: colors.CONTRAST,
    fontWeight: '700',
    fontSize: 18,
    padding: 10,
  },
});
