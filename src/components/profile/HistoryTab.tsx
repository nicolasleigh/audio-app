import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useFetchHistories} from '../../hooks/query';
import EmptyRecords from '../../ui/EmptyRecords';
import AudioListLoadingUI from '../../ui/AudioListLoadingUI';
import colors from '../../utils/colors';

interface Props {}

export default function HistoryTab({}: Props) {
  const {data, isLoading} = useFetchHistories();

  if (isLoading) {
    return <AudioListLoadingUI />;
  }

  if (!data || !data[0]?.audios.length) {
    return <EmptyRecords title="There is no history" />;
  }
  if (data) console.log(data[0].audios); //{"audioId": "", "date": "", "id": "", "title": ""}
  // console.log(data);
  return (
    <ScrollView style={styles.container}>
      {data.map((item, mainIndex) => {
        return (
          <View key={item.date + mainIndex}>
            <Text style={styles.date}>{item.date}</Text>
            <View style={styles.listContainer}>
              {item.audios.map((audio, index) => {
                return (
                  <View key={audio.id + index} style={styles.history}>
                    <Text style={styles.historyTitle}>{audio.title}</Text>
                    <Pressable>
                      <AntDesign name="close" color={colors.CONTRAST} />
                    </Pressable>
                  </View>
                );
              })}
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {},
  date: {
    color: colors.SECONDARY,
    paddingLeft: 10,
  },
  historyTitle: {
    color: colors.CONTRAST,
    paddingHorizontal: 5,
    fontWeight: '700',
    flex: 1,
  },
  history: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.OVERLAY,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  listContainer: {
    marginTop: 10,
    // paddingLeft: 10,
    paddingHorizontal: 10,
  },
});
