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
    />
  );
}

const styles = StyleSheet.create({
  container: {},
  input: {
    borderWidth: 2,
    borderColor: colors.SECONDARY,
    height: 45,
    borderRadius: 25,
    color: colors.CONTRAST,
    padding: 10,
  },
});
