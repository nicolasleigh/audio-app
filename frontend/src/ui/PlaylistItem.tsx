import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Playlist} from '../@types/audio';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from '../utils/colors';
interface Props {
  playlist: Playlist;
  onPress?(): void;
}

export default function PlaylistItem({playlist, onPress}: Props) {
  const {itemsCount, title, visibility} = playlist;
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.postContainer}>
        <MaterialCommunityIcons
          name="playlist-music"
          size={30}
          color={colors.WHITE}
        />
      </View>
      <View style={styles.contentContainer}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
          {title}
        </Text>
        <View style={styles.iconContainer}>
          <FontAwesome
            name={visibility === 'public' ? 'globe' : 'lock'}
            color={'tomato'}
            size={15}
          />
          <Text style={styles.count}>
            {itemsCount} {itemsCount > 1 ? 'Audios' : 'Audio'}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: colors.BLACK,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postContainer: {
    backgroundColor: colors.OVERLAY,
    height: 50,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    color: colors.WHITE,
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 5,
  },
  count: {
    // color: colors.RED,
    color: 'tomato',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  iconContainer: {
    flexDirection: 'row',
    paddingTop: 4,
  },
});
