import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import colors from '../utils/colors';
import Loader from './Loader';

interface Props {
  title: string;
  onPress?: () => void;
  busy?: boolean;
  borderRadius?: number;
}

export default function AppButton({title, onPress, busy, borderRadius}: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={busy}
      style={[
        styles.container,
        {
          borderRadius: borderRadius || 25,
        },
      ]}>
      {!busy ? <Text style={styles.title}>{title}</Text> : <Loader />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 45,
    backgroundColor: colors.SECONDARY,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  title: {
    color: colors.CONTRAST,
    fontSize: 18,
  },
});
