import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useFetchLatestAudios} from '../hooks/query';
import PulseAnimationContainer from '../ui/PulseAnimationContainer';
import colors from '../utils/colors';

interface Props {}

export default function Home({}: Props) {
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
      <Text
        style={{
          color: colors.CONTRAST,
          fontSize: 20,
          fontWeight: 'bold',
          marginBottom: 15,
        }}>
        Latest Uploads
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data?.map(item => {
          return (
            <Pressable
              onPress={() => {
                console.log('on audio press');
              }}
              onLongPress={() => {
                console.log('on audio long press');
              }}
              key={item.id}
              style={{width: 100, marginRight: 15}}>
              <Image
                source={{uri: item.poster}}
                width={100}
                height={100}
                borderRadius={7}
              />
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={{
                  color: colors.CONTRAST,
                  fontWeight: '500',
                  fontSize: 16,
                  marginTop: 5,
                }}>
                {item.title}
              </Text>
            </Pressable>
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
});
