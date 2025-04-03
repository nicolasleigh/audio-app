import React, {useState} from 'react';
import Toast from 'react-native-toast-message';
import {useDispatch} from 'react-redux';
import catchAsyncError from '../api/catchError';
import {getClient} from '../api/client';
import AudioForm from '../components/form/AudioForm';

interface Props {}

export default function Upload({}: Props) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [busy, setBusy] = useState(false);
  const dispatch = useDispatch();

  const handleUpload = async (formData: FormData, reset: () => void) => {
    setBusy(true);
    try {
      const client = await getClient({'Content-Type': 'multipart/form-data'});
      const {data} = await client.post('/audio/create', formData, {
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
      Toast.show({
        type: 'success',
        text1: 'Audio created successfully',
      });
      setBusy(false);
      reset();
      // console.log(data);
    } catch (error) {
      const errorMessage = catchAsyncError(error);
      Toast.show({
        type: 'error',
        text1: 'Failed to create audio',
      });
      console.error(errorMessage);
    }
    setBusy(false);
  };

  return (
    <AudioForm onSubmit={handleUpload} busy={busy} progress={uploadProgress} />
  );
}
