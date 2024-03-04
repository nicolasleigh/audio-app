import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useFetchRecentlyPlayed} from '../hooks/query';
import colors from '../utils/colors';
import RecentlyPlayedCard from '../ui/RecentlyPlayedCard';
import GridView from '../ui/GridView';

interface Props {}

export default function RecentlyPlayed({}: Props) {
  const {data, isLoading} = useFetchRecentlyPlayed();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recently Played</Text>
      <GridView
        data={data || []}
        renderItem={item => {
          return (
            <View key={item.id} style={styles.listStyle}>
              <RecentlyPlayedCard
                title={item.title}
                poster={item.poster}
                onPress={() => {}}
              />
            </View>
          );
        }}
      />
      {/* {data?.map(item => {
        return (
          <View key={item.id} style={styles.listStyle}>
            <RecentlyPlayedCard
              title={item.title}
              poster={item.poster}
              onPress={() => {}}
            />
          </View>
        );
      })} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  title: {
    color: colors.CONTRAST,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  listStyle: {
    marginBottom: 10,
  },
});
