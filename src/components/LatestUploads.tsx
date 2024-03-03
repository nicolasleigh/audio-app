import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useFetchLatestAudios} from '../hooks/query';
import AudioCard from '../ui/AudioCard';
import PulseAnimationContainer from '../ui/PulseAnimationContainer';
import colors from '../utils/colors';
import {AudioData} from '../@types/audio';
import {useSelector} from 'react-redux';
import {getPlayerState} from '../store/player';

interface Props {
  onAudioPress(item: AudioData, data: AudioData[]): void;
  onAudioLongPress(item: AudioData, data: AudioData[]): void;
}

const dummyData = new Array(4).fill('');

export default function LatestUploads({onAudioLongPress, onAudioPress}: Props) {
  const {data, isLoading} = useFetchLatestAudios();
  const {onGoingAudio} = useSelector(getPlayerState);
  if (isLoading) {
    return (
      <PulseAnimationContainer>
        <View style={styles.container}>
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
              playing={item.id === onGoingAudio?.id}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  title: {
    color: colors.CONTRAST,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  dummyTitleView: {
    height: 20,
    width: 150,
    backgroundColor: colors.INACTIVE_CONTRAST,
    marginBottom: 15,
    borderRadius: 5,
  },
  dummyView: {
    height: 100,
    width: 100,
    backgroundColor: colors.INACTIVE_CONTRAST,
    marginRight: 15,
    borderRadius: 5,
  },
  dummyContainer: {
    flexDirection: 'row',
  },
});
