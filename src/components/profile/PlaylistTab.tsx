import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useFetchPlaylist} from '../../hooks/query';
import PlaylistItem from '../../ui/PlaylistItem';

interface Props {}

export default function PlaylistTab({}: Props) {
  const {data, isLoading} = useFetchPlaylist();
  return (
    <ScrollView style={styles.container}>
      {data?.map(playlist => {
        return <PlaylistItem key={playlist.id} playlist={playlist} />;
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {},
});
