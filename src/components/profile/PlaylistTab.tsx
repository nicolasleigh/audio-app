import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {Playlist} from '../../@types/audio';
import {useFetchPlaylist} from '../../hooks/query';
import {
  updatePlaylistVisibility,
  updateSelectedListId,
} from '../../store/playlistModal';
import EmptyRecords from '../../ui/EmptyRecords';
import PlaylistItem from '../../ui/PlaylistItem';

interface Props {}

export default function PlaylistTab({}: Props) {
  const {data} = useFetchPlaylist();
  const dispatch = useDispatch();

  const handleOnListPress = (playlist: Playlist) => {
    dispatch(updateSelectedListId(playlist.id));
    dispatch(updatePlaylistVisibility(true));
  };
  return (
    <ScrollView style={styles.container}>
      {!data?.length ? <EmptyRecords title="There is no playlist." /> : null}
      {data?.map(playlist => {
        return (
          <PlaylistItem
            onPress={() => handleOnListPress(playlist)}
            key={playlist.id}
            playlist={playlist}
          />
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {},
});
