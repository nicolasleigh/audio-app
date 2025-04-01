import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../utils/colors';

interface Props {
  title: string;
}

export default function AppHeaderNormal({title}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: colors.BLUE,
    height: 45,
    paddingHorizontal: 10,
    // marginTop: 5,
    // borderWidth: 1,
    // padding: 10,
  },
  title: {
    color: colors.WHITE,
    fontSize: 17,
    fontWeight: '600',
  },
});
