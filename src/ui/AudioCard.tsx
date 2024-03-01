import React from 'react';
import {Image, Pressable, StyleSheet, Text} from 'react-native';
import colors from '../utils/colors';

interface Props {
  title: string;
  poster?: string;
}

export default function AudioCard({title, poster}: Props) {
  const source = poster ? {uri: poster} : require('../assets/music.png');
  return (
    <Pressable
      onPress={() => {
        console.log('on audio press');
      }}
      onLongPress={() => {
        console.log('on audio long press');
      }}
      style={styles.container}>
      <Image source={source} style={styles.poster} />
      <Text numberOfLines={2} ellipsizeMode="tail" style={styles.title}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {width: 100, marginRight: 15},
  title: {
    color: colors.CONTRAST,
    fontWeight: '500',
    fontSize: 16,
    marginTop: 5,
  },
  poster: {
    width: 100,
    height: 100,
    borderRadius: 7,
  },
});
