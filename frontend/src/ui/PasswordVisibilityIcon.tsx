import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import colors from '../utils/colors';

interface Props {
  privateIcon: boolean;
}

export default function PasswordVisibilityIcon({privateIcon}: Props) {
  return privateIcon ? (
    <Icon name="eye" color={colors.SECONDARY} size={16} />
  ) : (
    <Icon name="eye-with-line" color={colors.SECONDARY} size={16} />
  );
}
