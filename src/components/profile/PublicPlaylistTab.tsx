import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useFetchPublicPlaylist} from '../../hooks/query';
import PlaylistItem from '../../ui/PlaylistItem';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PublicProfileTabParamsList} from '../../@types/navigation';

type Props = NativeStackScreenProps<
  PublicProfileTabParamsList,
  'PublicPlaylist'
>;

export default function PublicPlaylistTab(props: Props) {
  const {data} = useFetchPublicPlaylist(props.route.params.profileId);
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
