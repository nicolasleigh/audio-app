import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import BasicModalContainer from '../ui/BasicModalContainer';
import colors from '../utils/colors';
import {Playlist} from '../@types/audio';

interface Props {
  visible?: boolean;
  onRequestClose?(): void;
  list: Playlist[];
  onCreateNew(): void;
  onPlaylistPress(item: Playlist): void;
}

interface ListItemProps {
  title: string;
  icon: JSX.Element;
  onPress?(): void;
}

export default function PlaylistModal({
  visible,
  onRequestClose,
  list,
  onCreateNew,
  onPlaylistPress,
}: Props) {
  return (
    <BasicModalContainer visible={visible} onRequestClose={onRequestClose}>
      {/* render playlist */}
      <ScrollView>
        {list.map((item, index) => {
          return (
            <ListItem
              onPress={() => onPlaylistPress(item)}
              key={item.id}
              icon={
                <FontAwesome
                  size={20}
                  name={item.visibility === 'public' ? 'globe' : 'lock'}
                  color={colors.PRIMARY}
                />
              }
              title={item.title}
            />
          );
        })}
      </ScrollView>

      {/* create playlist button */}
      <ListItem
        icon={<AntDesign size={20} name="plus" color={colors.PRIMARY} />}
        title="Create New"
        onPress={onCreateNew}
      />
    </BasicModalContainer>
  );
}

const styles = StyleSheet.create({
  container: {},
  listItemContainer: {flexDirection: 'row', alignItems: 'center', height: 45},
  listItemTitle: {fontSize: 16, color: colors.PRIMARY, marginLeft: 5},
});

const ListItem = ({title, icon, onPress}: ListItemProps) => {
  return (
    <Pressable onPress={onPress} style={styles.listItemContainer}>
      {icon}
      <Text style={styles.listItemTitle}>{title}</Text>
    </Pressable>
  );
};
