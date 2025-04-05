import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import {getPlayerState} from '../store/player';
import colors from '../utils/colors';

interface Props {
  visible: boolean;
  closeHandler(state: boolean): void;
}

export default function AudioInfoContainer({visible, closeHandler}: Props) {
  const {onGoingAudio} = useSelector(getPlayerState);
  if (!visible) {
    return null;
  }

  const handleClose = () => {
    closeHandler(!visible);
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handleClose} style={styles.closeBtn}>
        <AntDesign name="close" color={colors.WHITE} size={24} />
      </Pressable>
      <ScrollView>
        <Text style={styles.title}>Title: {onGoingAudio?.title}</Text>
        <Text style={styles.title}>Category: {onGoingAudio?.category}</Text>
        <View style={styles.ownerInfo}>
          <Text style={styles.title}>
            Creator: {onGoingAudio?.owner.name || ''}
          </Text>
        </View>
        <Text style={styles.title}>Description: {onGoingAudio?.about}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.PLAYER_BLUE,
    zIndex: 1,
    padding: 10,
    marginTop: 50,
  },
  closeBtn: {
    alignSelf: 'flex-end',
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 15,
    color: colors.CONTRAST,
    fontWeight: '600',
    paddingVertical: 10,
  },
  about: {
    fontSize: 16,
    color: colors.CONTRAST,
    paddingVertical: 5,
  },
  ownerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
