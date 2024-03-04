import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {useFetchUploadsByProfile} from '../../hooks/query';
import useAudioController from '../../hooks/useAudioController';
import {getPlayerState} from '../../store/player';
import AudioListItem from '../../ui/AudioListItem';
import AudioListLoadingUI from '../../ui/AudioListLoadingUI';
import EmptyRecords from '../../ui/EmptyRecords';
import colors from '../../utils/colors';

interface Props {}

export default function UploadsTab({}: Props) {
  const {data, isLoading} = useFetchUploadsByProfile();
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
