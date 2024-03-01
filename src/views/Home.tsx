import React from 'react';
import {StyleSheet, View} from 'react-native';
import LatestUploads from '../components/LatestUploads';
import RecommendedAudios from '../components/RecommendedAudios';

interface Props {}

export default function Home({}: Props) {
  return (
    <View style={styles.container}>
      <LatestUploads />
      <RecommendedAudios />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
