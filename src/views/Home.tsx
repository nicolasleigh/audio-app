import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useFetchLatestAudios} from '../hooks/query';

interface Props {}

export default function Home({}: Props) {
  const {data, isLoading} = useFetchLatestAudios();
  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={{color: 'white', fontSize: 25}}>Loading</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {data?.map(item => {
        return (
          <Text key={item.id} style={{color: 'white', paddingVertical: 10}}>
            {item.title}
          </Text>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
