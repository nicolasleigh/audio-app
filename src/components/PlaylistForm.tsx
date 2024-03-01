import React from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BasicModalContainer from '../ui/BasicModalContainer';
import colors from '../utils/colors';

interface Props {
  status: 'private';
}

export default function PlaylistForm({status}: Props) {
  return (
    <BasicModalContainer>
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

// {
//    <PlaylistModal
// visible
// list={[
//   {title: 'Playlist one', visibility: 'private', id: '1'},
//   {
//     title: 'Playlist two',
//     visibility: 'public',
//     id: '2',
//   },
// ]}
// />
// }

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
