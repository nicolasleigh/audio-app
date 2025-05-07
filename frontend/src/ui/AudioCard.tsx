import React from 'react';
import {
  Image,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import colors from '../utils/colors';
import PlayAnimation from './PlayAnimation';

interface Props {
  title: string;
  poster?: string;
  onPress?(): void;
  onLongPress?(): void;
  isPlaying?: boolean;
  isPaused?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

export default function AudioCard({
  title,
  poster,
  playing = false,
  containerStyle,
  onPress,
  onLongPress,
  isPlaying = false,
  isPaused = true,
}: Props) {
  const source = poster ? {uri: poster} : require('../assets/music.jpg');
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={[styles.container, containerStyle]}>
      <View style={styles.posterContainer}>
        <Image source={source} style={styles.poster} />
        <PlayAnimation isPlaying={isPlaying} isPaused={isPaused} />
      </View>
      <Text numberOfLines={2} ellipsizeMode="tail" style={styles.title}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {width: 100, marginRight: 10},
  title: {
    color: colors.GREY,
    fontWeight: '600',
    fontSize: 14,
    marginTop: 5,
  },
  posterContainer: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 7,
    overflow: 'hidden',
  },
  poster: {
    width: '100%',
    height: '100%',
    borderRadius: 7,
  },
});
