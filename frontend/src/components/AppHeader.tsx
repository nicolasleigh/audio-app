import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../utils/colors';
import {useNavigation} from '@react-navigation/native';

interface Props {
  title: string;
}

export default function AppHeader({title}: Props) {
  const {goBack, canGoBack} = useNavigation();

  if (!canGoBack()) return null;
  return (
    <View style={styles.container}>
      <Pressable onPress={goBack}>
        <AntDesign name="arrowleft" size={20} color={colors.WHITE} />
      </Pressable>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    // justifyContent: 'space-between',
    backgroundColor: colors.BLUE,
    height: 45,
    // marginTop: 5,
    // borderWidth: 1,
    padding: 10,
  },
  title: {
    color: colors.WHITE,
    fontSize: 17,
    fontWeight: '600',
  },
});
