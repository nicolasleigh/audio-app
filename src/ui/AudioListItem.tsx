import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {AudioData} from '../@types/audio';
import colors from '../utils/colors';

interface Props {
  audio: AudioData;
  onPress?(): void;
}

export default function AudioListItem({audio, onPress}: Props) {
  const getSource = (poster?: string) => {
    return poster ? {uri: poster} : require('../assets/music_small.png');
  };
  return (
    <Pressable onPress={onPress} style={styles.listItem} key={audio.id}>
      <Image source={getSource(audio.poster)} style={styles.poster} />
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
    backgroundColor: colors.OVERLAY,
    marginBottom: 15,
    borderRadius: 5,
  },
  poster: {
    width: 50,
    height: 50,
  },
  title: {
    color: colors.CONTRAST,
    fontWeight: '700',
  },
  owner: {
    color: colors.SECONDARY,
    fontWeight: '700',
  },
  titleContainer: {
    flex: 1,
    padding: 5,
  },
});
