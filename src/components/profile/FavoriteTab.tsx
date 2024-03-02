import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useFetchFavorite} from '../../hooks/query';
import AudioListLoadingUI from '../../ui/AudioListLoadingUI';
import EmptyRecords from '../../ui/EmptyRecords';
import AudioListItem from '../../ui/AudioListItem';

interface Props {}

export default function FavoriteTab({}: Props) {
  const {data, isLoading} = useFetchFavorite();

  if (isLoading) {
    return <AudioListLoadingUI />;
  }
  if (!data?.length) {
    return <EmptyRecords title="There is no favorite audio." />;
  }

  return (
    <ScrollView style={styles.container}>
      {data?.map(item => {
        return <AudioListItem audio={item} key={item.id} />;
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {},
});
