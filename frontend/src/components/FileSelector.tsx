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
import DocumentPicker, {
  DocumentPickerOptions,
  DocumentPickerResponse,
} from '@react-native-documents/picker';
// import {SupportedPlatforms} from '@react-native-documents/picker/lib/typescript/fileTypes';

interface Props {
  icon?: React.ReactNode;
  btnTitle?: string;
  style?: StyleProp<ViewStyle>;
  onSelect(file: DocumentPickerResponse): void;
  // options: DocumentPickerOptions<SupportedPlatforms>;
}

export default function FileSelector({
  icon,
  onSelect,
  btnTitle,
  style,
  options,
}: Props) {
  const handleDocumentSelect = async () => {
    try {
      const document = await DocumentPicker.pick(options);
      // console.log('Document ', document);
      // [{"fileCopyUri": null, "name": "IMG_0005.JPG", "size": '', "type": "image/jpeg", "uri": ""}]
      const file = document[0];
      onSelect(file);
    } catch (error) {
      if (!DocumentPicker.isCancel(error)) {
        console.log('Error picking document ', error);
      }
    }
  };
  return (
    <Pressable
      onPress={handleDocumentSelect}
      style={[styles.btnContainer, style]}>
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
