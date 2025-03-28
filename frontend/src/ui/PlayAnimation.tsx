import React from 'react';
import {StyleSheet, View} from 'react-native';
import colors from '../utils/colors';
import AnimatedStroke from './AnimatedStroke';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  isPlaying: boolean;
  isPaused: boolean;
}

export default function PlayAnimation({isPlaying, isPaused}: Props) {
  // if (!visible) return null;
  if (!isPaused && !isPlaying) {
    return null;
  }
  if (isPaused) {
    return (
      <View style={styles.container}>
        <View style={styles.strokeContainer}>
          <MaterialCommunityIcons
            name="play"
            size={25}
            color={colors.CONTRAST}
          />
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.strokeContainer}>
        <AnimatedStroke height={15} delay={0} />
        <AnimatedStroke height={20} delay={100} />
        <AnimatedStroke height={15} delay={150} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.OVERLAY,
  },

  strokeContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 20,
  },
});
