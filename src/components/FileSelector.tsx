import React from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import colors from '../utils/colors';

interface Props {
  icon?: React.ReactNode;
  btnTitle?: string;
  style?: StyleProp<ViewStyle>;
}

export default function FileSelector({icon, btnTitle, style}: Props) {
  return (
    <Pressable style={[styles.btnContainer, style]}>
      <View style={styles.iconContainer}>{icon}</View>
      <Text style={styles.btnTitle}>{btnTitle}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {},
  btnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    height: 70,
    aspectRatio: 1,
    borderWidth: 2,
    borderColor: colors.SECONDARY,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTitle: {
    color: colors.CONTRAST,
    marginTop: 5,
  },
});
