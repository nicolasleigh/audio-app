import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {updateNotification} from '../store/notification';

interface Props {}

export default function Home({}: Props) {
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Button
        title="Test"
        onPress={() => {
          dispatch(updateNotification({message: 'Test', type: 'success'}));
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
