import React, {useState} from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import colors from '../utils/colors';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import PlayerController from './PlayerController';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  activeRate?: string;
  onPress?(rate: number): void;
  onListOptionPress?(): void;
}

const speedRates = ['0.25', '0.5', '0.75', '1', '1.25', '1.5', '1.75', '2'];
const selectorSize = 35;

export default function PlaybackRateSelector({
  containerStyle,
  activeRate,
  onPress,
  onListOptionPress,
}: Props) {
  const [showSelector, setShowSelector] = useState(false);
  const width = useSharedValue(0);
  const handleOnPress = () => {
    setShowSelector(prev => !prev);
    if (showSelector) {
      width.value = withTiming(selectorSize * speedRates.length, {
        duration: 300,
      });
    }
    if (!showSelector) {
      width.value = withTiming(0, {
        duration: 300,
      });
    }
  };

  const widthStyle = useAnimatedStyle(() => ({
    width: width.value,
  }));

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.btnContainer}>
        <Pressable onPress={handleOnPress}>
          <FontAwesome5 name="running" color={colors.CONTRAST} size={24} />
        </Pressable>
        <PlayerController ignoreContainer onPress={onListOptionPress}>
          <MaterialCommunityIcons
            name="playlist-music"
            size={24}
            color={colors.CONTRAST}
          />
        </PlayerController>
      </View>

      <Animated.View style={[styles.buttons, widthStyle]}>
        {speedRates.map(item => {
          return (
            <Selector
              value={item}
              key={item}
              active={activeRate === item}
              onPress={() => onPress && onPress(+item)}
            />
          );
        })}
      </Animated.View>
    </View>
  );
}

interface SelectorProps {
  value: string;
  active?: boolean;
  onPress?(): void;
}

function Selector({value, active, onPress}: SelectorProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.selector,
        active ? {backgroundColor: colors.SECONDARY} : undefined,
      ]}>
      <Text style={styles.selectorText}>{value}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttons: {
    flexDirection: 'row',
    backgroundColor: colors.OVERLAY,
    overflow: 'hidden',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  selector: {
    width: selectorSize,
    height: selectorSize,
    justifyContent: 'center',
    alignItems: 'center',
    // marginHorizontal: 2,
  },
  selectorText: {
    color: colors.CONTRAST,
  },
});
