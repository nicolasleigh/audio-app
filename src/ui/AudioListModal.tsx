import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import colors from '../utils/colors';
import AppModal from './AppModal';

interface Props {
  header?: string;
  visible: boolean;
  onRequestClose(): void;
}

export default function AudioListModal({
  header,
  visible,
  onRequestClose,
}: Props) {
  return (
    <AppModal visible={visible} onRequestClose={onRequestClose}>
      <View style={styles.container}>
        <Text style={styles.header}>{header}</Text>
      </View>
    </AppModal>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.CONTRAST,
  },
});
