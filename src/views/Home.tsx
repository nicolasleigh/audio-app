import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LatestUploads from '../components/LatestUploads';
import RecommendedAudios from '../components/RecommendedAudios';
import OptionsModal from '../components/OptionsModal';
import colors from '../utils/colors';

interface Props {}

export default function Home({}: Props) {
  const [showOptions, setShowOptions] = useState(false);
  return (
    <View style={styles.container}>
      <LatestUploads
        onAudioPress={item => {
          console.log(item);
        }}
        onAudioLongPress={() => {
          setShowOptions(true);
        }}
      />
      <RecommendedAudios
        onAudioPress={item => {
          console.log(item);
        }}
        onAudioLongPress={() => {
          setShowOptions(true);
        }}
      />
      <OptionsModal
        visible={showOptions}
        onRequestClose={() => {
          setShowOptions(false);
        }}
        options={[
          {title: 'Add to playlist', icon: 'playlist-music'},
          {title: 'Add to favorites', icon: 'cards-heart'},
        ]}
        renderItem={item => {
          return (
            <Pressable style={styles.optionContainer}>
              <MaterialCommunityIcons
                size={24}
                color={colors.PRIMARY}
                name={item.icon}
              />
              <Text style={styles.optionLabel}>{item.title}</Text>
            </Pressable>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  optionLabel: {color: colors.PRIMARY, fontSize: 16, marginLeft: 5},
});
