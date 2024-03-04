import React, {useEffect, useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useFetchHistories} from '../../hooks/query';
import EmptyRecords from '../../ui/EmptyRecords';
import AudioListLoadingUI from '../../ui/AudioListLoadingUI';
import colors from '../../utils/colors';
import {getClient} from '../../api/client';
import {useQueryClient} from '@tanstack/react-query';
import {historyAudio} from '../../@types/audio';
import {useNavigation} from '@react-navigation/native';

interface Props {}

export default function HistoryTab({}: Props) {
  const {data, isLoading} = useFetchHistories();
  const queryClient = useQueryClient();
  const [selectedHistories, setSelectedHistories] = useState<string[]>([]);
  const navigation = useNavigation();

  const removeHistories = async (histories: string[]) => {
    const client = await getClient();
    await client.delete('/history?histories=' + JSON.stringify(histories));
    queryClient.invalidateQueries({queryKey: ['histories']});
  };

  const handleSingleHistoryRemove = async (history: historyAudio) => {
    await removeHistories([history.id]);
  };

  const handleMultipleHistoryRemove = async () => {
    setSelectedHistories([]);
    await removeHistories([...selectedHistories]);
  };

  const handleOnLongPress = (history: historyAudio) => {
    setSelectedHistories([history.id]);
  };

  const handleOnPress = (history: historyAudio) => {
    setSelectedHistories(old => {
      if (old.includes(history.id)) {
        return old.filter(item => item !== history.id);
      }
      return [...old, history.id];
    });
  };

  useEffect(() => {
    const unselectHistories = () => {
      setSelectedHistories([]);
    };
    navigation.addListener('blur', unselectHistories);

    return () => {
      navigation.removeListener('blur', unselectHistories);
    };
  }, []);

  if (isLoading) {
    return <AudioListLoadingUI />;
  }

  if (!data || !data[0]?.audios.length) {
    return <EmptyRecords title="There is no history" />;
  }
  if (data) console.log(data[0].audios); //{"audioId": "", "date": "", "id": "", "title": ""}
  // console.log(data);
  return (
    <>
      {selectedHistories.length ? (
        <Pressable
          style={styles.removeBtn}
          onPress={handleMultipleHistoryRemove}>
          <Text style={styles.removeBtnText}>Remove</Text>
        </Pressable>
      ) : null}
      <ScrollView style={styles.container}>
        {data.map((item, mainIndex) => {
          return (
            <View key={item.date + mainIndex}>
              <Text style={styles.date}>{item.date}</Text>
              <View style={styles.listContainer}>
                {item.audios.map((audio, index) => {
                  return (
                    <Pressable
                      onLongPress={() => handleOnLongPress(audio)}
                      onPress={() => handleOnPress(audio)}
                      key={audio.id + index}
                      style={[
                        styles.history,
                        {
                          backgroundColor: selectedHistories.includes(audio.id)
                            ? colors.INACTIVE_CONTRAST
                            : colors.OVERLAY,
                        },
                      ]}>
                      <Text style={styles.historyTitle}>{audio.title}</Text>
                      <Pressable
                        onPress={() => handleSingleHistoryRemove(audio)}>
                        <AntDesign name="close" color={colors.CONTRAST} />
                      </Pressable>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
  removeBtn: {
    padding: 10,
    alignSelf: 'flex-end',
  },
  removeBtnText: {
    color: colors.CONTRAST,
  },
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
