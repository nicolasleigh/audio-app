import React from 'react';
import {StyleSheet, View} from 'react-native';
import MiniAudioPlayer from './MiniAudioPlayer';
import useAudioController from '../hooks/useAudioController';
import PlaylistAudioModal from './PlaylistAudioModal';

interface Props {
  children: React.ReactNode;
}

export default function AppView({children}: Props) {
  const {isPlayerReady} = useAudioController();
  return (
    <View style={styles.container}>
      <View style={styles.children}>{children}</View>
      {isPlayerReady ? <MiniAudioPlayer /> : null}
      <PlaylistAudioModal />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  children: {
    flex: 1,
  },
});
