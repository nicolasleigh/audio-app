import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useFetchLatestAudios} from '../hooks/query';
import AudioCard from '../ui/AudioCard';
import PulseAnimationContainer from '../ui/PulseAnimationContainer';
import colors from '../utils/colors';

interface Props {}

export default function LatestUploads({}: Props) {
  const {data, isLoading} = useFetchLatestAudios();
  if (isLoading) {
    return (
      <PulseAnimationContainer>
        <Text style={{color: 'white', fontSize: 25}}>Loading</Text>
      </PulseAnimationContainer>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Latest Uploads</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data?.map(item => {
          return (
            <AudioCard key={item.id} title={item.title} poster={item.poster} />
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  title: {
    color: colors.CONTRAST,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
});
