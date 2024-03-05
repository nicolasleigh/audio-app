import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useFetchPlaylist} from '../../hooks/query';
import PlaylistItem from '../../ui/PlaylistItem';
import EmptyRecords from '../../ui/EmptyRecords';
import {Playlist} from '../../@types/audio';
import {useDispatch} from 'react-redux';
import {
  updatePlaylistVisibility,
  updateSelectedListId,
} from '../../store/playlistModal';

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
