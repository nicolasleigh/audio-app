import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import colors from '../utils/colors';

interface Props {
  title: string;
  onPress?: () => void;
  active?: boolean;
}

export default function AppLink({title, onPress, active = true}: Props) {
  return (
    <Pressable
      onPress={active ? onPress : null}
      style={{opacity: active ? 1 : 0.4}}>
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.SECONDARY,
  },
});
