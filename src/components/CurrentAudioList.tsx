import React from 'react';
import {StyleSheet, View} from 'react-native';
import AudioListModal from '../ui/AudioListModal';

interface Props {
  visible: boolean;
  onRequestClose(): void;
}

export default function CurrentAudioList({visible, onRequestClose}: Props) {
  return (
    <AudioListModal
      header="Audios on the way"
      visible={visible}
      onRequestClose={onRequestClose}
    />
  );
}

const styles = StyleSheet.create({
  container: {},
});
