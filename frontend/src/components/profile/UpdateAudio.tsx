import {NavigationProp, useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useQueryClient} from '@tanstack/react-query';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {ProfileNavigatorStackParamList} from '../../@types/navigation';
import catchAsyncError from '../../api/catchError';
import {getClient} from '../../api/client';
import {updateNotification} from '../../store/notification';
import {mapRange} from '../../utils/math';
import AudioForm from '../form/AudioForm';
import Toast from 'react-native-toast-message';

type Props = NativeStackScreenProps<
  ProfileNavigatorStackParamList,
  'UpdateAudio'
>;

export default function UpdateAudio({route}: Props) {
  const {audio} = route.params;

  const [uploadProgress, setUploadProgress] = useState(0);
  const [busy, setBusy] = useState(false);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const {navigate} =
    useNavigation<NavigationProp<ProfileNavigatorStackParamList>>();

  const handleUpdate = async (formData: FormData) => {
    setBusy(true);
    try {
      const client = await getClient({'Content-Type': 'multipart/form-data'});
      const {data} = await client.patch('/audio/' + audio.id, formData, {
        // onUploadProgress(progressEvent) {
        //   const uploaded = mapRange({
        //     inputMin: 0,
        //     inputMax: progressEvent.total || 0,
        //     outputMin: 0,
        //     outputMax: 100,
        //     inputValue: progressEvent.loaded,
        //   });
        //   if (uploaded >= 100) {
        //     setBusy(false);
        //   }
        //   setUploadProgress(Math.floor(uploaded));
        // },
      });
      queryClient.invalidateQueries({queryKey: ['uploads-by-profile']});
      navigate('Profile');
      Toast.show({type: 'success', text1: 'Updated successfully'});
      setBusy(false);
    } catch (error) {
      const errorMessage = catchAsyncError(error);
      Toast.show({type: 'error', text1: 'Failed to update'});
      console.error(errorMessage);
      setBusy(false);
    }
  };

  return (
    <AudioForm
      initialValues={{
        title: audio.title,
        category: audio.category,
        about: audio.about,
      }}
      onSubmit={handleUpdate}
      busy={busy}
      progress={uploadProgress}
      initialPoster={audio.poster}
    />
  );
}
