import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {useFetchRecommendedAudios} from '../hooks/query';
import colors from '../utils/colors';
import GridView from '../ui/GridView';
import PulseAnimationContainer from '../ui/PulseAnimationContainer';
import {AudioData} from '../@types/audio';

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

  const getPoster = (poster?: string) => {
    return poster ? {uri: poster} : require('../assets/music.png');
  };

  if (isLoading) {
    return (
      <PulseAnimationContainer>
        <View style={styles.container}>
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
      <Text style={styles.title}>Recommend</Text>
      <GridView
        col={3}
        data={data || []}
        renderItem={item => {
          return (
            <Pressable
              onPress={() => onAudioPress(item, data)}
              onLongPress={() => onAudioLongPress(item, data)}>
              <Image style={styles.poster} source={getPoster(item.poster)} />
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={styles.audioTitle}>
                {item.title}
              </Text>
            </Pressable>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    color: colors.CONTRAST,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  audioTitle: {
    color: colors.CONTRAST,
    fontWeight: '500',
    fontSize: 16,
    marginTop: 5,
  },
  poster: {width: '100%', aspectRatio: 1, borderRadius: 7},
  dummyTitleView: {
    height: 20,
    width: 150,
    backgroundColor: colors.INACTIVE_CONTRAST,
    marginBottom: 15,
    borderRadius: 5,
  },
  dummyView: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: colors.INACTIVE_CONTRAST,
    borderRadius: 7,
  },
  dummyContainer: {
    flexDirection: 'row',
  },
});
