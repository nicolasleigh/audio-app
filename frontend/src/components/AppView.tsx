import {useRoute} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import useAudioController from '../hooks/useAudioController';
import MiniAudioPlayer from './MiniAudioPlayer';

interface Props {
  children: React.ReactNode;
}

export default function AppView({children}: Props) {
  const {isPlayerReady} = useAudioController();
  const route = useRoute();
  const isUploadScreen = route.name === 'UploadScreen';

  return (
    <View style={styles.container}>
      <View style={styles.children}>{children}</View>
      {isPlayerReady && !isUploadScreen ? <MiniAudioPlayer /> : null}
      {/* <PlaylistAudioModal /> */}
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
