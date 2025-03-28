import React, {useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text} from 'react-native';
import {useSelector} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useFetchUploadsByProfile} from '../../hooks/query';
import useAudioController from '../../hooks/useAudioController';
import {getPlayerState} from '../../store/player';
import AudioListItem from '../../ui/AudioListItem';
import AudioListLoadingUI from '../../ui/AudioListLoadingUI';
import EmptyRecords from '../../ui/EmptyRecords';
import colors from '../../utils/colors';
import {AudioData} from '../../@types/audio';
import OptionsModal from '../OptionsModal';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ProfileNavigatorStackParamList} from '../../@types/navigation';

interface Props {}

export default function UploadsTab({}: Props) {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedAudio, setSelectedAudio] = useState<AudioData>();
  const {data, isLoading} = useFetchUploadsByProfile();
  const {onAudioPress} = useAudioController();
  const {onGoingAudio} = useSelector(getPlayerState);
  const {navigate} =
    useNavigation<NavigationProp<ProfileNavigatorStackParamList>>();

  const handleOnLongPress = (audio: AudioData) => {
    setSelectedAudio(audio);
    setShowOptions(true);
  };
  const handleOnEditPress = () => {
    setShowOptions(false);
    if (selectedAudio) {
      navigate('UpdateAudio', {
        audio: selectedAudio,
      });
    }
  };

  if (isLoading) {
    return <AudioListLoadingUI />;
  }
  if (!data?.length) {
    return <EmptyRecords title="There is no audio." />;
  }

  return (
    <>
      <ScrollView style={styles.container}>
        {data?.map(item => {
          return (
            <AudioListItem
              onPress={() => onAudioPress(item, data)}
              audio={item}
              key={item.id}
              isPlaying={onGoingAudio?.id === item.id}
              onLongPress={() => handleOnLongPress(item)}
            />
          );
        })}
      </ScrollView>
      <OptionsModal
        visible={showOptions}
        onRequestClose={() => {
          setShowOptions(false);
        }}
        options={[
          {
            title: 'Edit',
            icon: 'edit',
            onPress: handleOnEditPress,
          },
        ]}
        renderItem={item => {
          return (
            <Pressable onPress={item.onPress} style={styles.optionContainer}>
              <AntDesign size={24} color={colors.PRIMARY} name={item.icon} />
              <Text style={styles.optionLabel}>{item.title}</Text>
            </Pressable>
          );
        }}
      />
    </>
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
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  optionLabel: {color: colors.PRIMARY, fontSize: 16, marginLeft: 5},
});
