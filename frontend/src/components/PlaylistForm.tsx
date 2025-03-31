import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BasicModalContainer from '../ui/BasicModalContainer';
import colors from '../utils/colors';

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

  const handleSubmit = () => {
    onSubmit(playlistInfo);
    handleClose();
  };

  const handleClose = () => {
    setPlaylistInfo({title: '', private: false});
    onRequestClose();
  };

  return (
    <BasicModalContainer visible={visible} onRequestClose={handleClose}>
      <View style={styles.container}>
        <Text style={styles.title}>Create New Playlist</Text>
        <TextInput
          placeholder="Title"
          style={styles.input}
          onChangeText={text => {
            setPlaylistInfo({...playlistInfo, title: text});
          }}
          value={playlistInfo.title}
        />

        <Pressable
          onPress={() => {
            setPlaylistInfo({...playlistInfo, private: !playlistInfo.private});
          }}
          style={styles.privateSelector}>
          {playlistInfo.private ? (
            <MaterialCommunityIcons
              name="checkbox-marked-outline"
              color={colors.PRIMARY}
              size={20}
            />
          ) : (
            <MaterialCommunityIcons
              name="checkbox-blank-outline"
              color={colors.PRIMARY}
              size={20}
            />
          )}
          <Text style={styles.privateLabel}>Private</Text>
        </Pressable>

        <Pressable style={styles.submitBtn} onPress={handleSubmit}>
          <Text>Create</Text>
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
    color: colors.PRIMARY,
  },
  input: {
    height: 45,
    paddingVertical: 10,
    borderBottomColor: colors.PRIMARY,
    borderBottomWidth: 1,
    color: colors.PRIMARY,
    fontSize: 15,
  },
  privateSelector: {
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
  },
  privateLabel: {
    color: colors.PRIMARY,
    marginLeft: 5,
    fontSize: 15,
    fontWeight: '600',
  },
  submitBtn: {
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: colors.PRIMARY,
    borderRadius: 7,
  },
});
