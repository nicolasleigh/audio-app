import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useFetchUploadsByProfile} from '../../hooks/query';
import colors from '../../utils/colors';

interface Props {}

export default function UploadsTab({}: Props) {
  const {data, isLoading} = useFetchUploadsByProfile();
  const getSource = (poster?: string) => {
    return poster ? {uri: poster} : require('../../assets/music_small.png');
  };
  return (
    <ScrollView style={styles.container}>
      {data?.map(item => {
        return (
          <Pressable style={styles.listItem} key={item.id}>
            <Image source={getSource(item.poster)} style={styles.poster} />
            <View style={styles.titleContainer}>
              <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
                {item.title}
              </Text>
              <Text style={styles.owner} numberOfLines={1} ellipsizeMode="tail">
                {item.owner.name}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  listItem: {
    flexDirection: 'row',
    backgroundColor: colors.OVERLAY,
    marginBottom: 15,
    borderRadius: 5,
  },
  poster: {
    width: 50,
    height: 50,
  },
  title: {
    color: colors.CONTRAST,
    fontWeight: '700',
  },
  owner: {
    color: colors.SECONDARY,
    fontWeight: '700',
  },
  titleContainer: {
    flex: 1,
    padding: 5,
  },
});
