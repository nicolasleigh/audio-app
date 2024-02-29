import React, {useState} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../utils/colors';
import FileSelector from '../components/FileSelector';
import AppButton from '../ui/AppButton';
import CategorySelector from '../components/CategorySelector';

interface Props {}

export default function Upload({}: Props) {
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.fileSelectorContainer}>
        <FileSelector
          icon={
            <MaterialCommunityIcons
              name="image-outline"
              size={35}
              color={colors.SECONDARY}
            />
          }
          btnTitle="Select Poster"
        />
        <FileSelector
          icon={
            <MaterialCommunityIcons
              name="file-music-outline"
              size={35}
              color={colors.SECONDARY}
            />
          }
          btnTitle="Select Audio"
          style={{marginLeft: 20}}
        />
      </View>
      <View style={styles.formContainer}>
        <TextInput
          placeholder="Title"
          placeholderTextColor={colors.INACTIVE_CONTRAST}
          style={styles.input}
        />
        <TextInput
          placeholder="About"
          placeholderTextColor={colors.INACTIVE_CONTRAST}
          style={styles.input}
          numberOfLines={10}
          multiline
        />

        <CategorySelector
          visible={showCategoryModal}
          onRequestClose={() => {
            setShowCategoryModal(false);
          }}
          title="Category"
          data={['Business']}
          renderItem={item => {
            return <Text style={styles.category}>{item}</Text>;
          }}
          onSelect={item => {
            console.log(item);
          }}
        />
        <AppButton borderRadius={7} title="Submit" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  btnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileSelectorContainer: {
    flexDirection: 'row',
  },
  formContainer: {
    marginTop: 20,
  },
  input: {
    borderWidth: 2,
    borderColor: colors.SECONDARY,
    borderRadius: 7,
    padding: 10,
    fontSize: 18,
    color: colors.CONTRAST,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  category: {padding: 10},
});
