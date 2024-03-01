import {useQuery} from '@tanstack/react-query';
import {useDispatch} from 'react-redux';
import catchAsyncError from '../api/catchError';
import {updateNotification} from '../store/notification';
import client from '../api/client';
import {AudioData} from '../@types/audio';

const fetchLatest = async (): Promise<AudioData[]> => {
  const {data} = await client.get('/audio/latest');
  return data.audios;
};

export const useFetchLatestAudios = () => {
  const dispatch = useDispatch();
  const {data, isError, error, isLoading} = useQuery({
    queryKey: ['latest-uploads'],
    queryFn: fetchLatest,
  });
  if (isError) {
    const errorMsg = catchAsyncError(error);
    dispatch(updateNotification({message: errorMsg, type: 'error'}));
  }

  return {data, isLoading};
};
