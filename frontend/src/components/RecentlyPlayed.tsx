import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useFetchRecentlyPlayed} from '../hooks/query';
import colors from '../utils/colors';
import RecentlyPlayedCard from '../ui/RecentlyPlayedCard';
import GridView from '../ui/GridView';
import PulseAnimationContainer from '../ui/PulseAnimationContainer';
import useAudioController from '../hooks/useAudioController';
import {useSelector} from 'react-redux';
import {getPlayerState} from '../store/player';

interface Props {}

const dummyData = new Array(4).fill('');

export default function RecentlyPlayed({}: Props) {
  const {data = [], isLoading} = useFetchRecentlyPlayed();
  const {onAudioPress, isPaused, isPlaying} = useAudioController();
  const {onGoingAudio} = useSelector(getPlayerState);
  if (isLoading) {
    return (
      <PulseAnimationContainer>
        <View style={styles.dummyTitleView} />
        <GridView
          data={dummyData}
          renderItem={() => {
            return (
              <View
                style={{
                  height: 50,
                  backgroundColor: colors.LIGHTGREY,
                  borderRadius: 5,
                  marginBottom: 10,
                }}
              />
            );
          }}
        />
      </PulseAnimationContainer>
    );
  }

  if (!data.length) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recently Played</Text>
      <GridView
        data={data}
        renderItem={item => {
          return (
            <View key={item.id} style={styles.listStyle}>
              <RecentlyPlayedCard
                title={item.title}
                poster={item.poster}
                onPress={() => {
                  onAudioPress(item, data);
                }}
                isPlaying={isPlaying && onGoingAudio?.id === item.id}
                isPaused={isPaused && onGoingAudio?.id === item.id}
              />
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    // paddingHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: colors.DARKWHITE,
  },
  dummyTitleView: {
    height: 20,
    width: 150,
    backgroundColor: colors.LIGHTGREY,
    marginBottom: 15,
    borderRadius: 5,
    marginTop: 5,
    marginLeft: 5,
  },
  title: {
    color: colors.BLACK,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    marginLeft: 5,
  },
  listStyle: {
    // marginBottom: 10,
    // paddingHorizontal: 5,
  },
});
