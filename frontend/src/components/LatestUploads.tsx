import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useFetchLatestAudios} from '../hooks/query';
import AudioCard from '../ui/AudioCard';
import PulseAnimationContainer from '../ui/PulseAnimationContainer';
import colors from '../utils/colors';
import {AudioData} from '../@types/audio';
import {useSelector} from 'react-redux';
import {getPlayerState} from '../store/player';
import useAudioController from '../hooks/useAudioController';

interface Props {
  onAudioPress(item: AudioData, data: AudioData[]): void;
  onAudioLongPress(item: AudioData, data: AudioData[]): void;
}

const dummyData = new Array(3).fill('');

export default function LatestUploads({onAudioLongPress, onAudioPress}: Props) {
  const {data, isLoading} = useFetchLatestAudios();
  const {onGoingAudio} = useSelector(getPlayerState);
  const {isPaused, isPlaying} = useAudioController();
  if (isLoading) {
    return (
      <PulseAnimationContainer>
        <View>
          <View style={styles.dummyTitleView} />
          <View style={styles.dummyContainer}>
            {dummyData.map((_, index) => {
              return <View key={index} style={styles.dummyView} />;
            })}
          </View>
        </View>
      </PulseAnimationContainer>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Latest Uploads</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data?.map(item => {
          return (
            <AudioCard
              key={item.id}
              title={item.title}
              poster={item.poster}
              onPress={() => onAudioPress(item, data)}
              onLongPress={() => onAudioLongPress(item, data)}
              isPlaying={isPlaying && onGoingAudio?.id === item.id}
              isPaused={isPaused && onGoingAudio?.id === item.id}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 10,
    backgroundColor: colors.DARKWHITE,
  },
  title: {
    color: colors.BLACK,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  dummyTitleView: {
    height: 20,
    width: 150,
    backgroundColor: colors.LIGHTGREY,
    marginBottom: 15,
    borderRadius: 5,
    marginLeft: 5,
    marginTop: 5,
  },
  dummyView: {
    height: 100,
    width: 100,
    backgroundColor: colors.LIGHTGREY,
    marginRight: 5,
    borderRadius: 5,
    marginLeft: 5,
  },
  dummyContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
});
