import React from 'react';
import {StyleSheet, View} from 'react-native';
import PulseAnimationContainer from './PulseAnimationContainer';
import colors from '../utils/colors';

interface Props {
  items?: number;
}

export default function AudioListLoadingUI({items = 8}: Props) {
  const dummyData = new Array(items).fill('');
  return (
    <PulseAnimationContainer>
      <View>
        {dummyData.map((_, index) => {
          return <View key={index} style={styles.dummyListItem} />;
        })}
      </View>
    </PulseAnimationContainer>
  );
}

const styles = StyleSheet.create({
  container: {},
  dummyListItem: {
    height: 50,
    width: '100%',
    backgroundColor: colors.INACTIVE_CONTRAST,
    borderRadius: 5,
    marginBottom: 15,
  },
});
