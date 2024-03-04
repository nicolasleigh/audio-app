import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useFetchHistories} from '../../hooks/query';
import EmptyRecords from '../../ui/EmptyRecords';

interface Props {}

export default function HistoryTab({}: Props) {
  const {data, isLoading} = useFetchHistories();
  if (!data || !data[0]?.audios.length) {
    return <EmptyRecords title="There is no history" />;
  }
  if (data) console.log(data[0].audios); //{"audioId": "", "date": "", "id": "", "title": ""}
  // console.log(data);
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 20, color: 'white'}}>UploadTab</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
