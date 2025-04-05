import React, {useEffect} from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../utils/colors';

interface Props {
  color?: string;
}

export default function Loader({color = colors.WHITE}: Props) {
  const initialRotation = useSharedValue(0);
  const transform = useAnimatedStyle(() => {
    return {
      transform: [{rotate: `${initialRotation.value}deg`}],
    };
  });

  useEffect(() => {
    initialRotation.value = withRepeat(withTiming(360), -1);
  });

  return (
    <Animated.View style={transform}>
      <AntDesign name="loading1" size={24} color={color} />
    </Animated.View>
  );
}
