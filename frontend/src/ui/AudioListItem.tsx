import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {AudioData} from '../@types/audio';
import colors from '../utils/colors';
import PlayAnimation from './PlayAnimation';

interface Props {
  audio: AudioData;
  isPlaying: boolean;
  onPress(): void;
  onLongPress?(): void;
  isPaused: boolean;
}

export default function AudioListItem({
  audio,
  isPlaying = false,
  onPress,
  onLongPress,
  isPaused = true,
}: Props) {
  const getSource = (poster?: string) => {
    return poster ? {uri: poster} : require('../assets/music.jpg');
  };
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.listItem}
      key={audio.id}>
      <View>
        <Image source={getSource(audio.poster)} style={styles.poster} />
        <PlayAnimation isPlaying={isPlaying} isPaused={isPaused} />
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {audio.title}
        </Text>
        <Text style={styles.owner} numberOfLines={1} ellipsizeMode="tail">
          {audio.owner.name}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  listItem: {
    flexDirection: 'row',
    backgroundColor: colors.GREY,
    marginBottom: 10,
    borderRadius: 5,
    overflow: 'hidden',
    gap: 5,
  },
  poster: {
    width: 60,
    height: 50,
  },
  title: {
    color: colors.WHITE,
    fontWeight: '700',
    fontSize: 15,
  },
  owner: {
    color: colors.LIGHTGREY,
    fontWeight: '400',
    fontSize: 13,
  },
  titleContainer: {
    flex: 1,
    padding: 5,
    justifyContent: 'center',
    gap: 2,
  },
});
