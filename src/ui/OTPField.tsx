import React from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';
import colors from '../utils/colors';

interface Props extends TextInputProps {}

export default function OTPField(props: Props) {
  return (
    <TextInput
      {...props}
      style={[styles.input, props.style]}
      placeholderTextColor={colors.INACTIVE_CONTRAST}
    />
  );
}

const styles = StyleSheet.create({
  container: {},
  input: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: colors.SECONDARY,
    textAlign: 'center',
    color: colors.CONTRAST,
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 0,
  },
});
