import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useFetchPublicUploads} from '../../hooks/query';
import AudioListItem from '../../ui/AudioListItem';
import AudioListLoadingUI from '../../ui/AudioListLoadingUI';
import EmptyRecords from '../../ui/EmptyRecords';
import useAudioController from '../../hooks/useAudioController';
import {useSelector} from 'react-redux';
import {getPlayerState} from '../../store/player';
import {PublicProfileTabParamsList} from '../../@types/navigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<
  PublicProfileTabParamsList,
  'PublicUploads'
>;

export default function PublicUploadsTab(props: Props) {
  const {data, isLoading} = useFetchPublicUploads(props.route.params.profileId);
  const {onAudioPress, isPlaying, isPaused} = useAudioController();
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
            isPlaying={isPlaying && onGoingAudio?.id === item.id}
            isPaused={isPaused && onGoingAudio?.id === item.id}
          />
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {},
});
