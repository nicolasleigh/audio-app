import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {Playlist} from '../../@types/audio';
import {PublicProfileTabParamsList} from '../../@types/navigation';
import {useFetchPublicPlaylist} from '../../hooks/query';
import {
  updatePlaylistVisibility,
  updateSelectedListId,
} from '../../store/playlistModal';
import PlaylistItem from '../../ui/PlaylistItem';

type Props = NativeStackScreenProps<
  PublicProfileTabParamsList,
  'PublicPlaylist'
>;

export default function PublicPlaylistTab(props: Props) {
  const {data} = useFetchPublicPlaylist(props.route.params.profileId);
  const dispatch = useDispatch();
  const handleOnListPress = (playlist: Playlist) => {
    dispatch(updateSelectedListId(playlist.id));
    dispatch(updatePlaylistVisibility(true));
  };
  return (
    <ScrollView style={styles.container}>
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
  container: {
    paddingRight: 12,
  },
});
