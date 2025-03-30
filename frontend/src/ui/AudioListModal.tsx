import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import colors from '../utils/colors';
import AppModal from './AppModal';
import {AudioData} from '../@types/audio';
import AudioListItem from './AudioListItem';
import AudioListLoadingUI from './AudioListLoadingUI';
import {useSelector} from 'react-redux';
import {getPlayerState} from '../store/player';
import useAudioController from '../hooks/useAudioController';

interface Props {
  data: AudioData[];
  header?: string;
  visible: boolean;
  loading?: boolean;
  onItemPress(item: AudioData, data: AudioData[]): void;
  onRequestClose(): void;
}

export default function AudioListModal({
  header,
  data,
  visible,
  loading,
  onItemPress,
  onRequestClose,
}: Props) {
  const {isPlaying, isPaused} = useAudioController();
  const {onGoingAudio} = useSelector(getPlayerState);
  return (
    <AppModal visible={visible} onRequestClose={onRequestClose}>
      <View style={styles.container}>
        {loading ? (
          <AudioListLoadingUI />
        ) : (
          <>
            <Text style={styles.header}>{header}</Text>
            <FlatList
              data={data}
              keyExtractor={item => item.id}
              renderItem={({item}) => {
                return (
                  <AudioListItem
                    onPress={() => onItemPress(item, data)}
                    audio={item}
                    isPlaying={isPlaying && onGoingAudio?.id === item.id}
                    isPaused={isPaused && onGoingAudio?.id === item.id}
                  />
                );
              }}
            />
          </>
        )}
      </View>
    </AppModal>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.CONTRAST,
    paddingVertical: 10,
  },
});
