import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useFetchPublicUploads} from '../../hooks/query';
import AudioListItem from '../../ui/AudioListItem';
import AudioListLoadingUI from '../../ui/AudioListLoadingUI';
import EmptyRecords from '../../ui/EmptyRecords';
import useAudioController from '../../hooks/useAudioController';
import {useSelector} from 'react-redux';
import {getPlayerState} from '../../store/player';

interface Props {}

export default function PublicUploadsTab(props: Props) {
  const {data, isLoading} = useFetchPublicUploads(props.route.params.profileId);
  const {onAudioPress} = useAudioController();
  const {onGoingAudio} = useSelector(getPlayerState);

  if (isLoading) {
    return <AudioListLoadingUI />;
  }
  if (!data?.length) {
    return <EmptyRecords title="There is no audio." />;
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
