import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import colors from '../utils/colors';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

interface Props {
  delay: number;
  height: number;
}

export default function AnimatedStroke({delay, height}: Props) {
  const sharedValue = useSharedValue(5);
  const heightStyle = useAnimatedStyle(() => ({
    height: sharedValue.value,
  }));

  useEffect(() => {
    sharedValue.value = withDelay(
      delay,
      withRepeat(withTiming(height), -1, true),
    );
  }, [delay, height, sharedValue]);
  return <Animated.View style={[styles.stroke, heightStyle]} />;
}

const styles = StyleSheet.create({
  stroke: {
    width: 4,
    backgroundColor: colors.WHITE,
    marginRight: 5,
  },
});
