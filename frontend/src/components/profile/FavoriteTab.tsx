import {useQueryClient} from '@tanstack/react-query';
import React from 'react';
import {RefreshControl, ScrollView, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {useFetchFavorite} from '../../hooks/query';
import useAudioController from '../../hooks/useAudioController';
import {getPlayerState} from '../../store/player';
import AudioListItem from '../../ui/AudioListItem';
import AudioListLoadingUI from '../../ui/AudioListLoadingUI';
import EmptyRecords from '../../ui/EmptyRecords';
import colors from '../../utils/colors';

interface Props {}

export default function FavoriteTab({}: Props) {
  const {data, isLoading, isFetching} = useFetchFavorite();
  const {onAudioPress, isPlaying, isPaused} = useAudioController();
  const {onGoingAudio} = useSelector(getPlayerState);

  const queryClient = useQueryClient();

  const handleOnRefresh = () => {
    queryClient.invalidateQueries({queryKey: ['favorite']});
  };

  if (isLoading) {
    return <AudioListLoadingUI />;
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={isFetching}
          onRefresh={handleOnRefresh}
          tintColor={colors.BLUE}
        />
      }>
      {!data?.length ? (
        <EmptyRecords title="There is no favorite audio." />
      ) : null}
      {data?.map(item => {
        return (
          <AudioListItem
            onPress={() => onAudioPress(item, data)}
            audio={item}
            key={item.id}
            isPlaying={isPlaying && onGoingAudio?.id === item.id}
            isPaused={isPaused && onGoingAudio?.id === item.id}
          />
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.DARKWHITE,
    paddingRight: 12,
  },
});
