import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import AppModal from '../ui/AppModal';
import {useSelector} from 'react-redux';
import {getPlayerState} from '../store/player';
import colors from '../utils/colors';
import AppLink from '../ui/AppLink';
import {useProgress} from 'react-native-track-player';
import formatDuration from 'format-duration';

interface Props {
  visible: boolean;
  onRequestClose(): void;
}

const formattedDuration = (duration = 0) => {
  return formatDuration(duration, {
    leading: true,
  });
};

export default function AudioPlayer({visible, onRequestClose}: Props) {
  const {onGoingAudio} = useSelector(getPlayerState);
  const poster = onGoingAudio?.poster;
  const source = poster ? {uri: poster} : require('../assets/music.png');

  const {duration, position} = useProgress();

  return (
    <AppModal animation visible={visible} onRequestClose={onRequestClose}>
      <View style={styles.container}>
        <Image source={source} style={styles.poster} />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{onGoingAudio?.title}</Text>

          <AppLink title={onGoingAudio?.owner.name || ''} />

          <View style={styles.durationContainer}>
            <Text style={styles.duration}>
              {formattedDuration(position * 1000)}
            </Text>
            <Text style={styles.duration}>
              {formattedDuration(duration * 1000)}
            </Text>
          </View>
        </View>
      </View>
    </AppModal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    // backgroundColor: 'white',
  },
  poster: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  contentContainer: {
    width: '100%',
    flex: 1,
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.CONTRAST,
  },
  durationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  duration: {
    color: colors.CONTRAST,
  },
});
