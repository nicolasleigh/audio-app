import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import colors from '../utils/colors';

interface Props {
  children: React.ReactNode;
}

export default function PulseAnimationContainer({children}: Props) {
  const opacitySharedValue = useSharedValue(1);
  const opacity = useAnimatedStyle(() => {
    return {
      opacity: opacitySharedValue.value,
    };
  });

  useEffect(() => {
    opacitySharedValue.value = withRepeat(
      withTiming(0.3, {duration: 1000}),
      -1,
      true,
    );
  }, []);

  return (
    <Animated.View style={[styles.container, opacity]}>
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: colors.DARKWHITE,
    paddingTop: 5,
  },
});
