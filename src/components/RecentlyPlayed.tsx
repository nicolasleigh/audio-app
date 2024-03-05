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
  const {onAudioPress} = useAudioController();
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
                  backgroundColor: colors.INACTIVE_CONTRAST,
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

  if (!data.length) return null;

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
                isPlaying={onGoingAudio?.id === item.id}
              />
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  dummyTitleView: {
    height: 20,
    width: 150,
    backgroundColor: colors.INACTIVE_CONTRAST,
    marginBottom: 15,
    borderRadius: 5,
  },
  title: {
    color: colors.CONTRAST,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  listStyle: {
    marginBottom: 10,
  },
});
