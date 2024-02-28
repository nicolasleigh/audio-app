import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import colors from '../utils/colors';

interface Props {
  title: string;
  onPress?: () => void;
}

export default function AppLink({title, onPress}: Props) {
  return (
    <Pressable onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.SECONDARY,
  },
});
