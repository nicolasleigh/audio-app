import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
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
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  titleWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: colors.YELLOW,
  },
  title: {
    color: colors.YELLOW,
    fontWeight: '600',
    lineHeight: 20,
  },
});
