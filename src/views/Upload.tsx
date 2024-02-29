import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface Props {}

export default function Upload({}: Props) {
  return (
    <View style={styles.container}>
      <Text>Upload</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
