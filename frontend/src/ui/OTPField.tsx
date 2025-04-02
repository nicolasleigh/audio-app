import React, {forwardRef} from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';
import colors from '../utils/colors';

interface Props extends TextInputProps {
  ref: any;
}

const OTPField = forwardRef<TextInput, Props>((props, ref) => {
  return (
    <TextInput
      {...props}
      ref={ref}
      style={[styles.input, props.style]}
      placeholderTextColor={colors.INACTIVE_CONTRAST}
    />
  );
});

const styles = StyleSheet.create({
  container: {},
  input: {
    width: 50,
    height: 50,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: colors.BLUE,
    textAlign: 'center',
    color: colors.BLACK,
    fontSize: 22,
    fontWeight: 'bold',
    lineHeight: 0,
  },
});

export default OTPField;
