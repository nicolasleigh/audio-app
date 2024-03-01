import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface Props {}

export default function Home({}: Props) {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
