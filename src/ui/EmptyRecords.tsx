import React from 'react';
import {StyleSheet, View} from 'react-native';
import colors from '../utils/colors';
import {Text} from 'react-native';

interface Props {
  title: string;
}

export default function EmptyRecords({title}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.INACTIVE_CONTRAST,
  },
});
