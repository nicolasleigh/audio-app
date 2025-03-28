import React, {useEffect, useState} from 'react';
import {
  Image,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import colors from '../utils/colors';
import DocumentPicker, {
  DocumentPickerOptions,
  DocumentPickerResponse,
  pick,
} from '@react-native-documents/picker';
import {launchImageLibrary} from 'react-native-image-picker';

interface Props {
  icon?: React.ReactNode;
  btnTitle?: string;
  style?: StyleProp<ViewStyle>;
  onSelect(file: DocumentPickerResponse): void;
  options: DocumentPickerOptions;
}

export default function ImagePicker({
  icon,
  onSelect,
  btnTitle,
  style,
  options,
  imageUri,
  setImageUri,
  busy,
}: Props) {
  const selectImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 1,
        includeBase64: false,
      },
      response => {
        if (response.didCancel) {
          console.log('User canceled image picker');
        } else if (response.errorCode) {
          console.log('Error: ', response.errorMessage);
        } else {
          setImageUri(response.assets[0].uri);
          onSelect(response.assets[0]);
        }
      },
    );
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={selectImage}
        disabled={busy}
        style={[styles.btnContainer, style]}>
        {imageUri ? (
          <Image source={{uri: imageUri}} style={styles.image} />
        ) : (
          <View style={styles.iconContainer}>
            {icon}
            <Text style={styles.btnTitle}>{btnTitle}</Text>
          </View>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnContainer: {
    height: 200,
    width: 200,
  },
  iconContainer: {
    height: 200,
    aspectRatio: 1,
    borderWidth: 2,
    borderColor: colors.SECONDARY,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTitle: {
    color: colors.INACTIVE_CONTRAST,
    marginTop: 5,
  },
  image: {
    height: 200,
    aspectRatio: 1,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: colors.SECONDARY,
  },
});
