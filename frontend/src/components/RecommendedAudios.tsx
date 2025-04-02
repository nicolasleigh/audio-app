import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {AudioData} from '../@types/audio';
import {useFetchRecommendedAudios} from '../hooks/query';
import {getPlayerState} from '../store/player';
import AudioCard from '../ui/AudioCard';
import GridView from '../ui/GridView';
import PulseAnimationContainer from '../ui/PulseAnimationContainer';
import colors from '../utils/colors';
import useAudioController from '../hooks/useAudioController';

interface Props {
  onAudioPress(item: AudioData, data: AudioData[]): void;
  onAudioLongPress(item: AudioData, data: AudioData[]): void;
}

const dummyData = new Array(6).fill('');

export default function RecommendedAudios({
  onAudioLongPress,
  onAudioPress,
}: Props) {
  const {data = [], isLoading} = useFetchRecommendedAudios();
  const {onGoingAudio} = useSelector(getPlayerState);
  const {isPaused, isPlaying} = useAudioController();

  if (isLoading) {
    return (
      <PulseAnimationContainer>
        <View>
          <View style={styles.dummyTitleView} />
          <GridView
            col={3}
            data={dummyData}
            renderItem={() => {
              return <View style={styles.dummyView} />;
            }}
          />
        </View>
      </PulseAnimationContainer>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>You may like this</Text>
      <GridView
        col={3}
        data={data || []}
        renderItem={item => {
          return (
            <AudioCard
              title={item.title}
              poster={item.poster}
              onPress={() => onAudioPress(item, data)}
              onLongPress={() => onAudioLongPress(item, data)}
              containerStyle={{width: '100%'}}
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
    borderWidth: 1,
    borderRadius: 5,
    // paddingHorizontal: 5,
    paddingVertical: 10,
    backgroundColor: colors.DARKWHITE,
  },
  title: {
    color: colors.BLACK,
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 5,
    marginBottom: 15,
  },
  poster: {width: '100%', aspectRatio: 1, borderRadius: 7},
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
    width: '100%',
    aspectRatio: 1,
    backgroundColor: colors.LIGHTGREY,
    borderRadius: 7,
  },
  dummyContainer: {
    flexDirection: 'row',
  },
});
