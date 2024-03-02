import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AppHeader from '../AppHeader';

interface Props {}

export default function ProfileSetting({}: Props) {
  return (
    <View style={styles.container}>
      <AppHeader title="Setting" />
      <Text style={{color: 'white', fontSize: 25}}>Profile</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
