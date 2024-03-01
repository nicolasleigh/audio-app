import React from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BasicModalContainer from '../ui/BasicModalContainer';
import colors from '../utils/colors';

interface Props {
  status?: 'private';
  visible: boolean;
  onRequestClose(): void;
}

export default function PlaylistForm({status, visible, onRequestClose}: Props) {
  return (
    <BasicModalContainer visible={visible} onRequestClose={onRequestClose}>
      <View>
        <Text style={styles.title}>Create New Playlist</Text>
        <TextInput placeholder="Title" style={styles.input} />
        <Pressable style={styles.privateSelector}>
          {status === 'private' ? (
            <MaterialCommunityIcons
              name="radiobox-marked"
              color={colors.PRIMARY}
            />
          ) : (
            <MaterialCommunityIcons
              name="radiobox-blank"
              color={colors.PRIMARY}
            />
          )}
          <Text style={styles.privateLabel}>Private</Text>
        </Pressable>

        <Pressable style={styles.submitBtn}>
          <Text>Create</Text>
        </Pressable>
      </View>
    </BasicModalContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.PRIMARY,
  },
  input: {
    height: 45,
    paddingVertical: 10,
    borderBottomColor: colors.PRIMARY,
    borderBottomWidth: 2,
    color: colors.PRIMARY,
  },
  privateSelector: {
    height: 45,
    alignItems: 'center',
    flexDirection: 'row',
  },
  privateLabel: {
    color: colors.PRIMARY,
    marginLeft: 5,
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
