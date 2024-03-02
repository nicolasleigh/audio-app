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
import AudioListItem from '../../ui/AudioListItem';
import AudioListLoadingUI from '../../ui/AudioListLoadingUI';
import EmptyRecords from '../../ui/EmptyRecords';

interface Props {}

export default function UploadsTab({}: Props) {
  const {data, isLoading} = useFetchUploadsByProfile();

  if (isLoading) {
    return <AudioListLoadingUI />;
  }
  if (!data?.length) {
    return <EmptyRecords title="There is no audio." />;
  }

  return (
    <ScrollView style={styles.container}>
      {data?.map(item => {
        return <AudioListItem audio={item} />;
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
