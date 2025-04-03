import React from 'react';
import {FlexStyle, StyleSheet, View} from 'react-native';
import colors from '../utils/colors';

interface Props {
  size: number;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export default function CircleUi({size, position}: Props) {
  let viewPosition: FlexStyle = {};

  switch (position) {
    case 'top-left':
      viewPosition = {top: -size / 2, left: -size / 2};
      break;
    case 'top-right':
      viewPosition = {top: -size / 2, right: -size / 2};
      break;
    case 'bottom-left':
      viewPosition = {bottom: -size / 2, left: -size / 2};
      break;
    case 'bottom-right':
      viewPosition = {bottom: -size / 2, right: -size / 2};
  }

  const styles = StyleSheet.create({
    container: {
      width: size,
      height: size,
      position: 'absolute',
      ...viewPosition,
    },
    inner: {
      width: size / 1.5,
      height: size / 1.5,
      borderRadius: size / 2,
      backgroundColor: colors.LIGHTBLUE,
      opacity: 0.3,
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: [{translateX: -size / 3}, {translateY: -size / 3}],
    },
    outer: {
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: colors.LIGHTBLUE,
      opacity: 0.3,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.outer} />
      <View style={styles.inner} />
    </View>
  );
}
