import React from 'react';
import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {useFetchRecommendedPlaylist} from '../hooks/query';
import colors from '../utils/colors';
import {Playlist} from '../@types/audio';

interface Props {
  onListPress(playlist: Playlist): void;
}

export default function RecommendedPlaylist({onListPress}: Props) {
  const {data} = useFetchRecommendedPlaylist();
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Playlist for you</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => {
          return (
            <Pressable
              style={styles.pressContainer}
              onPress={() => onListPress(item)}
              // key={item.id}
              key={index}>
              <Image
                source={require('../assets/music.jpg')}
                style={styles.image}
              />
              <View style={styles.overlay}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.title}>{item.itemsCount}</Text>
              </View>
            </Pressable>
          );
        }}
      />
    </View>
  );
}

const cardSize = 150;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 10,
    backgroundColor: colors.DARKWHITE,
  },
  pressContainer: {
    width: cardSize,
    marginRight: 10,
  },
  image: {
    width: cardSize,
    height: cardSize,
    borderRadius: 5,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.OVERLAY_DARK,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  title: {
    color: colors.WHITE,
    fontWeight: '700',
    fontSize: 18,
  },
  header: {
    color: colors.BLACK,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
});
