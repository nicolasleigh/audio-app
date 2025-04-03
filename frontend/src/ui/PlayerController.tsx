import React from 'react';
import {Pressable} from 'react-native';
import colors from '../utils/colors';

interface Props {
  size?: number;
  children?: React.ReactNode;
  ignoreContainer?: boolean;
  onPress?(): void;
}

export default function PlayerController({
  size = 45,
  children,
  ignoreContainer,
  onPress,
}: Props) {
  return (
    <Pressable
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: ignoreContainer ? 'transparent' : colors.WHITE,
      }}
      onPress={onPress}>
      {children}
    </Pressable>
  );
}
