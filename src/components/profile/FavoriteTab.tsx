import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useFetchFavorite} from '../../hooks/query';
import AudioListLoadingUI from '../../ui/AudioListLoadingUI';
import EmptyRecords from '../../ui/EmptyRecords';
import AudioListItem from '../../ui/AudioListItem';
import useAudioController from '../../hooks/useAudioController';
import {useSelector} from 'react-redux';
import {getPlayerState} from '../../store/player';

interface Props {}

export default function FavoriteTab({}: Props) {
  const {data, isLoading} = useFetchFavorite();
  const {onAudioPress} = useAudioController();
  const {onGoingAudio} = useSelector(getPlayerState);

  if (isLoading) {
    return <AudioListLoadingUI />;
  }
  if (!data?.length) {
    return <EmptyRecords title="There is no favorite audio." />;
  }

  return (
    <ScrollView style={styles.container}>
      {data?.map(item => {
        return (
          <AudioListItem
            onPress={() => onAudioPress(item, data)}
            audio={item}
            key={item.id}
            isPlaying={onGoingAudio?.id === item.id}
          />
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {},
});
