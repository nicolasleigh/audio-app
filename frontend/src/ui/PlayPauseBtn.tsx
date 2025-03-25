import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../utils/colors';

interface Props {
  color?: string;
  playing?: boolean;
  onPress?(): void;
}

export default function PlayPauseBtn({
  color = colors.CONTRAST,
  playing,
  onPress,
}: Props) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      {playing ? (
        <AntDesign name="pause" size={24} color={color} />
      ) : (
        <AntDesign name="caretright" size={24} color={color} />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
