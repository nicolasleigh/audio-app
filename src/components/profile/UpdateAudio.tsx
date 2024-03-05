import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface Props {}

export default function UpdateAudio({}: Props) {
  return (
    <View style={styles.container}>
      <Text style={{color: 'white'}}>Update Audio</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
