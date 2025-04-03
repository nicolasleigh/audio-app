import React, {useEffect, useState} from 'react';
import {
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useFetchHistories} from '../../hooks/query';
import EmptyRecords from '../../ui/EmptyRecords';
import AudioListLoadingUI from '../../ui/AudioListLoadingUI';
import colors from '../../utils/colors';
import {getClient} from '../../api/client';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {History, historyAudio} from '../../@types/audio';
import {useNavigation} from '@react-navigation/native';

interface Props {}

export default function HistoryTab({}: Props) {
  const {data, isLoading, isFetching} = useFetchHistories();
  const queryClient = useQueryClient();
  const [selectedHistories, setSelectedHistories] = useState<string[]>([]);
  const navigation = useNavigation();
  const noData = !data?.length;

  const removeHistories = async (histories: string[]) => {
    const client = await getClient();
    await client.delete('/history?histories=' + JSON.stringify(histories));
    queryClient.invalidateQueries({queryKey: ['histories']});
  };

  const removeMutate = useMutation({
    mutationFn: async historyIds => removeHistories(historyIds),
    onMutate: (historyIds: string[]) => {
      queryClient.setQueryData<History[]>(['histories'], oldData => {
        let newData: History[] = [];
        if (!oldData) return newData;

        for (let data of oldData) {
          const filteredData = data.audios.filter(
            item => !historyIds.includes(item.id),
          );
          if (filteredData.length) {
            newData.push({date: data.date, audios: filteredData});
          }
        }
        return newData;
      });
    },
  });

  const handleSingleHistoryRemove = async (history: historyAudio) => {
    removeMutate.mutate([history.id]);
  };

  const handleMultipleHistoryRemove = async () => {
    removeMutate.mutate([...selectedHistories]);
    setSelectedHistories([]);
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

  const handleOnRefresh = () => {
    queryClient.invalidateQueries({queryKey: ['histories']});
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

  if (data) console.log(data[0]?.audios); //{"audioId": "", "date": "", "id": "", "title": ""}
  // console.log(data);
  return (
    <>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={handleOnRefresh}
            tintColor={colors.BLUE}
          />
        }
        style={styles.container}>
        {noData ? <EmptyRecords title="There is no history" /> : null}
        {data?.map((item, mainIndex) => {
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
                            ? colors.BLACK
                            : colors.LIGHTGREY,
                        },
                      ]}>
                      <Text
                        style={[
                          styles.historyTitle,
                          {
                            color: selectedHistories.includes(audio.id)
                              ? colors.WHITE
                              : colors.BLACK,
                          },
                        ]}>
                        {audio.title}
                      </Text>
                      <Pressable
                        onPress={() => handleSingleHistoryRemove(audio)}>
                        <AntDesign
                          name="close"
                          color={
                            selectedHistories.includes(audio.id)
                              ? colors.WHITE
                              : 'black'
                          }
                        />
                      </Pressable>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          );
        })}
        {selectedHistories.length ? (
          <Pressable
            style={styles.removeBtn}
            onPress={handleMultipleHistoryRemove}>
            <Text style={styles.removeBtnText}>Remove</Text>
          </Pressable>
        ) : null}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.DARKWHITE,
    paddingRight: 12,
  },
  removeBtn: {
    // padding: 10,
    // alignSelf: 'flex-end',
    position: 'absolute',
    right: 0,
  },
  removeBtnText: {
    color: colors.BLACK,
    marginRight: 5,
    // fontSize: 16,
    fontWeight: '600',
  },
  date: {
    color: colors.BLACK,
    fontWeight: '500',
    // paddingLeft: 10,
  },
  historyTitle: {
    // color: colors.CONTRAST,
    paddingHorizontal: 5,
    fontWeight: '700',
    flex: 1,
  },
  history: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: colors.BLACK,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  listContainer: {
    marginTop: 10,
    // paddingLeft: 10,
    // paddingHorizontal: 10,
  },
});
