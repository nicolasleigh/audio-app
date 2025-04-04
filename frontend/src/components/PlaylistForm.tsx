import React, {useRef, useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BasicModalContainer from '../ui/BasicModalContainer';
import colors from '../utils/colors';
import Toast from 'react-native-toast-message';
import {toastConfig} from '../utils/toastConfig';

interface Props {
  visible: boolean;
  onRequestClose(): void;
  onSubmit(value: PlaylistInfo): void;
}

export interface PlaylistInfo {
  title: string;
  private: boolean;
}

export default function PlaylistForm({
  visible,
  onRequestClose,
  onSubmit,
}: Props) {
  const [playlistInfo, setPlaylistInfo] = useState({
    title: '',
    private: false,
  });
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = () => {
    if (!playlistInfo.title) {
      return setErrorMsg('Title cannot be empty');
    }
    onSubmit(playlistInfo);
    handleClose();
  };

  const handleClose = () => {
    setPlaylistInfo({title: '', private: false});
    setErrorMsg('');
    onRequestClose();
  };

  return (
    <BasicModalContainer visible={visible} onRequestClose={handleClose}>
      <View style={styles.container}>
        <Text style={styles.title}>Create New Playlist</Text>
        <View>
          <TextInput
            placeholder="Title"
            style={styles.input}
            onChangeText={text => {
              setPlaylistInfo({...playlistInfo, title: text});
              setErrorMsg('');
            }}
            value={playlistInfo.title}
            placeholderTextColor={colors.LIGHTGREY}
            selectionColor={colors.WHITE}
          />
          <Text style={styles.errorMsg}>{errorMsg}</Text>
        </View>

        <Pressable
          onPress={() => {
            setPlaylistInfo({...playlistInfo, private: !playlistInfo.private});
          }}
          style={styles.privateSelector}>
          {playlistInfo.private ? (
            <MaterialCommunityIcons
              name="checkbox-marked-outline"
              color={colors.WHITE}
              size={20}
            />
          ) : (
            <MaterialCommunityIcons
              name="checkbox-blank-outline"
              color={colors.WHITE}
              size={20}
            />
          )}
          <Text style={styles.privateLabel}>Private</Text>
        </Pressable>

        <Pressable style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.btnTitle}>Create</Text>
        </Pressable>
      </View>
    </BasicModalContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.WHITE,
  },
  input: {
    height: 45,
    paddingVertical: 10,
    borderBottomColor: colors.WHITE,
    borderBottomWidth: 1,
    color: colors.WHITE,
    fontSize: 17,
  },
  privateSelector: {
    // height: 30,
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20,
  },
  privateLabel: {
    color: colors.WHITE,
    marginLeft: 5,
    fontSize: 15,
    fontWeight: '600',
  },
  submitBtn: {
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: colors.WHITE,
    borderRadius: 7,
    color: colors.WHITE,
    backgroundColor: colors.WHITE,
  },
  btnTitle: {
    color: colors.BLUE,
    fontWeight: '600',
    fontSize: 18,
  },
  errorMsg: {
    color: 'tomato',
  },
});
