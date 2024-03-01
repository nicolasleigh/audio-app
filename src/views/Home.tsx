import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useFetchLatestAudios} from '../hooks/query';
import PulseAnimationContainer from '../ui/PulseAnimationContainer';

interface Props {}

export default function Home({}: Props) {
  const {data, isLoading} = useFetchLatestAudios();
  // if (isLoading) {
  return (
    <PulseAnimationContainer>
      <Text style={{color: 'white', fontSize: 25}}>Loading</Text>
    </PulseAnimationContainer>
  );
  // }

  // return (
  //   <View style={styles.container}>
  //     {data?.map(item => {
  //       return (
  //         <Text key={item.id} style={{color: 'white', paddingVertical: 10}}>
  //           {item.title}
  //         </Text>
  //       );
  //     })}
  //   </View>
  // );
}

const styles = StyleSheet.create({
  container: {},
});
