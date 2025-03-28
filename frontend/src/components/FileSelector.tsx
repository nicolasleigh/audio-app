import React, {useEffect, useState} from 'react';
import {
  Image,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  icon?: React.ReactNode;
  btnTitle?: string;
  style?: StyleProp<ViewStyle>;
  onSelect(file: DocumentPickerResponse): void;
  options: DocumentPickerOptions;
}

export default function FileSelector({
  icon,
  onSelect,
  btnTitle,
  style,
  options,
  fileName,
  setFileName,
  busy,
}: Props) {
  // const [uri, setUri] = useState('');
  const handleDocumentSelect = async () => {
    try {
      const document = await pick(options);
      const file = document[0];
      console.log(file);
      setFileName(file.name);
      onSelect(file);
    } catch (error) {
      if (!DocumentPicker.isCancel(error)) {
        console.log('Error picking document ', error);
      }
    }
  };

  // const [imageUri, setImageUri] = useState(null);

  // const selectImage = () => {
  //   launchImageLibrary(
  //     {
  //       mediaType: 'photo',
  //       quality: 1,
  //       includeBase64: false,
  //     },
  //     response => {
  //       if (response.didCancel) {
  //         console.log('User canceled image picker');
  //       } else if (response.errorCode) {
  //         console.log('Error: ', response.errorMessage);
  //       } else {
  //         setImageUri(response.assets[0].uri);
  //       }
  //     },
  //   );
  // };

  return (
    <Pressable
      disabled={busy}
      onPress={handleDocumentSelect}
      style={[styles.btnContainer, style]}>
      <View pointerEvents="none">
        <TextInput
          style={styles.input}
          editable={false}
          selectTextOnFocus={false}
          value={fileName}
          placeholder="Select an audio file"
          placeholderTextColor={colors.INACTIVE_CONTRAST}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {},
  btnContainer: {
    // alignItems: 'center',
    // justifyContent: 'center',
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
  image: {
    width: 70,
    height: 70,
    aspectRatio: 1,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: colors.SECONDARY,
  },
  input: {
    borderWidth: 2,
    borderColor: colors.SECONDARY,
    borderRadius: 7,
    padding: 10,
    fontSize: 15,
    color: colors.CONTRAST,
    textAlignVertical: 'top',
  },
});
