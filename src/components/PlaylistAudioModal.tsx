import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  getPlaylistModalState,
  updatePlaylistVisibility,
} from '../store/playlistModal';
import AppModal from '../ui/AppModal';

interface Props {}

export default function PlaylistAudioModal({}: Props) {
  const {visible} = useSelector(getPlaylistModalState);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(updatePlaylistVisibility(false));
  };
  return (
    <AppModal visible={visible} onRequestClose={handleClose}>
      <View />
    </AppModal>
  );
}

const styles = StyleSheet.create({
  container: {},
});
