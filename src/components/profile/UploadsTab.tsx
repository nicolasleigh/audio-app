import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface Props {}

export default function UploadsTab({}: Props) {
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 20, color: 'white'}}>UploadTab</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
