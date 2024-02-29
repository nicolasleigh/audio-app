import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface Props {}

export default function Profile({}: Props) {
  return (
    <View style={styles.container}>
      <Text>Profile</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
