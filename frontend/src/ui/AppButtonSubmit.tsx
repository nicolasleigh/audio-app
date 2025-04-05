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

export default function SubmitButton({
  title,
  onPress,
  busy,
  borderRadius,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={busy}
      style={[
        styles.container,
        {
          borderRadius: borderRadius || 10,
        },
      ]}>
      {!busy ? (
        <Text style={styles.title}>{title}</Text>
      ) : (
        <Loader color={colors.BLUE} />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 45,
    backgroundColor: colors.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.LIGHTBLUE,
  },
  title: {
    color: colors.BLUE,
    fontSize: 18,
    fontWeight: '600',
  },
});
