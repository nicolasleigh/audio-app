import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useFetchPlaylistAudios} from '../hooks/query';
import {
  getPlaylistModalState,
  updatePlaylistVisibility,
} from '../store/playlistModal';
import AudioListItem from '../ui/AudioListItem';
import AudioListLoadingUI from '../ui/AudioListLoadingUI';
import colors from '../utils/colors';
import {getPlayerState} from '../store/player';
import useAudioController from '../hooks/useAudioController';
import AppModal from '../ui/AppModal';

interface Props {}

export default function PlaylistAudioModal({}: Props) {
  const {visible, selectedListId} = useSelector(getPlaylistModalState);
  const dispatch = useDispatch();
  const {data, isLoading} = useFetchPlaylistAudios(selectedListId || '');
  console.log('useFetchPlaylistAudios--', data);
  const {onGoingAudio} = useSelector(getPlayerState);
  const {onAudioPress, isPlaying, isPaused} = useAudioController();
  const handleClose = () => {
    dispatch(updatePlaylistVisibility(false));
  };

  return (
    <AppModal
      animation
      visible={visible}
      onRequestClose={handleClose}
      heightOffset={150}
      modalColor={colors.BLACK}
      backdropColor={colors.INACTIVE_CONTRAST}>
      {isLoading ? (
        <View style={styles.container}>
          <AudioListLoadingUI />
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.title}>{data?.title}</Text>
          <FlatList
            // contentContainerStyle={styles.container}
            data={data?.audios}
            keyExtractor={item => item.id}
            renderItem={({item}) => {
              return (
                <AudioListItem
                  audio={item}
                  onPress={() => onAudioPress(item, data?.audios || [])}
                  isPlaying={isPlaying && onGoingAudio?.id === item.id}
                  isPaused={isPaused && onGoingAudio?.id === item.id}
                />
              );
            }}
          />
        </View>
      )}
    </AppModal>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  title: {
    color: colors.WHITE,
    fontWeight: '700',
    fontSize: 18,
    marginBottom: 10,
  },
});
