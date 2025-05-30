import DocumentPicker, {
  DocumentPickerOptions,
  DocumentPickerResponse,
  pick,
} from '@react-native-documents/picker';
import React from 'react';
import {
  Platform,
  Pressable,
  StyleProp,
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import colors from '../utils/colors';

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
      <View
        pointerEvents="none"
        style={[
          styles.inputWrapper,
          Platform.OS === 'android' ? {paddingLeft: 7} : {padding: 10},
        ]}>
        {icon}
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
  inputWrapper: {
    flexDirection: 'row',
    gap: 5,
    borderWidth: 1,
    borderColor: colors.WHITE,
    borderRadius: 7,
    alignItems: 'center',
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
    color: colors.WHITE,
    // textAlignVertical: 'top',
    // fontSize: 15,
  },
});
