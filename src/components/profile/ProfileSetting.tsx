import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface Props {}

export default function ProfileSetting({}: Props) {
  return (
    <View style={styles.container}>
      <Text style={{color: 'white', fontSize: 25}}>Profile</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
