import React, {useEffect, useState} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {DocumentPickerResponse, types} from '@react-native-documents/picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import * as yup from 'yup';
import catchAsyncError from '../../api/catchError';
import AppView from '../AppView';
import CategorySelector from '../CategorySelector';
import FileSelector from '../FileSelector';
import {updateNotification} from '../../store/notification';
import AppButton from '../../ui/AppButton';
import Progress from '../../ui/Progress';
import {categories} from '../../utils/categories';
import colors from '../../utils/colors';
import ImagePicker from '../ImagePicker';
import Toast from 'react-native-toast-message';
import AppHeader from '../AppHeader';

interface Props {
  initialValues?: {
    title: string;
    category: string;
    about: string;
    poster?: string;
  };
  onSubmit(formData: FormData, reset: () => void): void;
  progress?: number;
  busy?: boolean;
}

interface FormFields {
  title: string;
  category: string;
  about: string;
  file?: DocumentPickerResponse;
  poster?: DocumentPickerResponse;
}

const defaultForm: FormFields = {
  title: '',
  category: '',
  about: '',
  file: undefined,
  poster: undefined,
};

const commonSchema = {
  title: yup.string().trim().required('Title is missing'),
  category: yup.string().oneOf(categories, 'Category is missing'),
  about: yup.string().trim().required('About is missing'),
  poster: yup.object().shape({
    uri: yup.string(),
    name: yup.string(),
    type: yup.string(),
    size: yup.number(),
  }),
};

const newAudioSchema = yup.object().shape({
  ...commonSchema,
  file: yup.object().shape({
    uri: yup.string().required('Audio file is missing'),
    name: yup.string().required('Audio file is missing'),
    type: yup.string().required('Audio file is missing'),
    size: yup.number().required('Audio file is missing'),
  }),
});
const oldAudioSchema = yup.object().shape({
  ...commonSchema,
});

export default function AudioForm({
  initialValues,
  progress = 0,
  busy,
  onSubmit,
}: Props) {
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [audioInfo, setAudioInfo] = useState({
    ...defaultForm,
  });
  const [isForUpdate, setIsForUpdate] = useState(false);
  const [fileName, setFileName] = useState('');
  const [imageUri, setImageUri] = useState('');

  const dispatch = useDispatch();

  const reset = () => {
    setAudioInfo({...defaultForm});
    setFileName('');
    setImageUri('');
  };

  const handleSubmit = async () => {
    try {
      let finalData;
      const formData = new FormData();

      if (isForUpdate) {
        finalData = await oldAudioSchema.validate(audioInfo);
      } else {
        finalData = await newAudioSchema.validate(audioInfo);
        formData.append('file', {
          name: finalData.file.name,
          type: finalData.file.type,
          uri: finalData.file.uri,
        });
      }

      formData.append('title', finalData.title);
      formData.append('about', finalData.about);
      formData.append('category', finalData.category);

      if (finalData.poster.uri) {
        formData.append('poster', {
          name: finalData.poster.name,
          type: finalData.poster.type,
          uri: finalData.poster.uri,
        });
      }

      onSubmit(formData, reset);
    } catch (error) {
      const errorMessage = catchAsyncError(error);
      Toast.show({
        type: 'error',
        text1: errorMessage,
      });
      // dispatch(updateNotification({message: errorMessage, type: 'error'}));
    }
  };

  // const clearForm = () => {
  //   setAudioInfo({...defaultForm});
  //   setUri('');
  //   setImageUri('');
  // };
  // console.log(initialValues);

  useEffect(() => {
    if (initialValues) {
      setAudioInfo({
        ...initialValues,
      });
      setIsForUpdate(true);
      setImageUri(initialValues.poster);
    }
  }, [initialValues]);

  return (
    <AppView>
      <ScrollView style={styles.container}>
        {isForUpdate ? (
          <AppHeader title="Update" />
        ) : (
          <AppHeader title="Create" />
        )}
        <View style={styles.formContainer}>
          {/* Title */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              placeholder="Enter audio title"
              placeholderTextColor={colors.INACTIVE_CONTRAST}
              style={styles.input}
              onChangeText={text => {
                setAudioInfo({...audioInfo, title: text});
              }}
              value={audioInfo.title}
            />
          </View>

          {/* Category */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Category</Text>
            <Pressable
              onPress={() => {
                setShowCategoryModal(true);
              }}>
              <View pointerEvents="none">
                <TextInput
                  style={styles.input}
                  editable={false}
                  selectTextOnFocus={false}
                  value={audioInfo.category}
                  placeholder="Select a category"
                  placeholderTextColor={colors.INACTIVE_CONTRAST}
                />
              </View>
            </Pressable>
          </View>

          {/* About */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>About</Text>
            <TextInput
              placeholder="Enter audio information"
              placeholderTextColor={colors.INACTIVE_CONTRAST}
              style={styles.input}
              numberOfLines={10}
              multiline
              onChangeText={text => {
                setAudioInfo({...audioInfo, about: text});
              }}
              value={audioInfo.about}
            />
          </View>

          {/* Audio */}
          {!isForUpdate && (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Audio File</Text>
              <FileSelector
                icon={
                  <MaterialCommunityIcons
                    name="file-music-outline"
                    size={35}
                    color={colors.SECONDARY}
                  />
                }
                btnTitle="Select Audio"
                options={{type: [types.audio]}}
                onSelect={file => {
                  setAudioInfo({...audioInfo, file});
                }}
                fileName={fileName}
                setFileName={setFileName}
              />
            </View>
          )}

          {/* Poster */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Poster File</Text>
            <ImagePicker
              icon={
                <MaterialCommunityIcons
                  name="image-outline"
                  size={20}
                  color={colors.SECONDARY}
                />
              }
              btnTitle="Select Poster"
              options={{type: [types.images]}}
              onSelect={poster => {
                setAudioInfo({...audioInfo, poster});
              }}
              imageUri={imageUri}
              setImageUri={setImageUri}
            />
          </View>

          <CategorySelector
            visible={showCategoryModal}
            onRequestClose={() => {
              setShowCategoryModal(false);
            }}
            title="Category"
            data={categories}
            renderItem={item => {
              return <Text style={styles.category}>{item}</Text>;
            }}
            onSelect={item => {
              setAudioInfo({...audioInfo, category: item});
            }}
            initialValue={initialValues?.category}
          />

          <AppButton
            busy={busy}
            borderRadius={7}
            title={isForUpdate ? 'Update' : 'Submit'}
            onPress={handleSubmit}
          />
        </View>
      </ScrollView>
    </AppView>
  );
}

const styles = StyleSheet.create({
  container: {
    // paddingVertical: 10,
    paddingHorizontal: 20,
  },
  btnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileSelectorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 50,
  },
  formContainer: {
    marginTop: 5,
    gap: 20,
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
  category: {padding: 10, color: colors.PRIMARY},
  categorySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  categorySelectorTitle: {
    color: colors.CONTRAST,
  },
  label: {color: colors.CONTRAST},
  selectedCategory: {
    color: colors.SECONDARY,
    marginLeft: 5,
    fontStyle: 'italic',
  },
  inputContainer: {
    gap: 2,
  },
});
