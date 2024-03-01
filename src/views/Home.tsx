import React from 'react';
import {StyleSheet, View} from 'react-native';
import LatestUploads from '../components/LatestUploads';

interface Props {}

export default function Home({}: Props) {
  return (
    <View style={styles.container}>
      <LatestUploads />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
