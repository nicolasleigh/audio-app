import React from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';
import colors from '../utils/colors';

interface Props extends TextInputProps {}

export default function AppInput(props: Props) {
  return (
    <TextInput
      {...props}
      placeholderTextColor={colors.INACTIVE_CONTRAST}
      style={[styles.input, props.style]}
      selectionColor={colors.BLUE}
    />
  );
}

const styles = StyleSheet.create({
  container: {},
  input: {
    borderWidth: 1,
    borderColor: colors.LIGHTBLUE,
    height: 45,
    borderRadius: 10,
    color: colors.BLUE,
    fontWeight: '600',
    padding: 10,
  },
});
