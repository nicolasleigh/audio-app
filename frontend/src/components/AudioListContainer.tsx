import React from 'react';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import colors from '../utils/colors';
// import AudioListItem from './AudioListItem';
// import AudioListLoadingUI from './AudioListLoadingUI';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import useAudioController from '../hooks/useAudioController';
import {getPlayerState} from '../store/player';
import AudioListItem from '../ui/AudioListItem';

// interface Props {
//   data: AudioData[];
//   header?: string;
//   visible: boolean;
//   loading?: boolean;
//   onItemPress(item: AudioData, data: AudioData[]): void;
//   onRequestClose(): void;
// }

interface Props {
  visible: boolean;
  closeHandler(state: boolean): void;
}

export default function AudioListContainer({visible, closeHandler}: Props) {
  const {isPlaying, isPaused} = useAudioController();
  const {onGoingAudio} = useSelector(getPlayerState);
  const {onGoingList} = useSelector(getPlayerState);
  const {onAudioPress} = useAudioController();

  if (!visible) {
    return null;
  }

  const handleClose = () => {
    closeHandler(!visible);
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.header}>Audios on the way</Text>
        <Pressable onPress={handleClose}>
          <AntDesign name="close" color={colors.WHITE} size={20} />
        </Pressable>
      </View>

      <FlatList
        data={onGoingList}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
            <AudioListItem
              onPress={() => onAudioPress(item, onGoingList)}
              audio={item}
              isPlaying={isPlaying && onGoingAudio?.id === item.id}
              isPaused={isPaused && onGoingAudio?.id === item.id}
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.PLAYER_BLUE,
    zIndex: 1,
    padding: 10,
    marginTop: 20,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
    marginBottom: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.WHITE,
  },
});
