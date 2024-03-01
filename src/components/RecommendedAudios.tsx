import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {useFetchRecommendedAudios} from '../hooks/query';
import colors from '../utils/colors';
import GridView from '../ui/GridView';

interface Props {}

export default function RecommendedAudios({}: Props) {
  const {data, isLoading} = useFetchRecommendedAudios();

  const getPoster = (poster?: string) => {
    return poster ? {uri: poster} : require('../assets/music.png');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recommend</Text>
      <GridView
        col={3}
        data={data || []}
        renderItem={item => {
          return (
            <Pressable>
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
});
