import {useQuery} from '@tanstack/react-query';
import {useDispatch} from 'react-redux';
import {AudioData, Playlist} from '../@types/audio';
import catchAsyncError from '../api/catchError';
import {getClient} from '../api/client';
import {updateNotification} from '../store/notification';

const fetchLatest = async (): Promise<AudioData[]> => {
  const client = await getClient();
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

const fetchRecommended = async (): Promise<AudioData[]> => {
  const client = await getClient();
  const {data} = await client.get('/profile/recommended');
  return data.audios;
};

export const useFetchRecommendedAudios = () => {
  const dispatch = useDispatch();
  const {data, isError, error, isLoading} = useQuery({
    queryKey: ['recommended'],
    queryFn: fetchRecommended,
  });
  if (isError) {
    const errorMsg = catchAsyncError(error);
    dispatch(updateNotification({message: errorMsg, type: 'error'}));
  }

  return {data, isLoading};
};

const fetchPlaylist = async (): Promise<Playlist[]> => {
  const client = await getClient();
  const {data} = await client.get('/playlist/by-profile');
  return data.playlist;
};

export const useFetchPlaylist = () => {
  const dispatch = useDispatch();
  const {data, isError, error, isLoading} = useQuery({
    queryKey: ['playlist'],
    queryFn: fetchPlaylist,
  });
  if (isError) {
    const errorMsg = catchAsyncError(error);
    dispatch(updateNotification({message: errorMsg, type: 'error'}));
  }

  return {data, isLoading};
};

const fetchUploadsByProfile = async (): Promise<AudioData[]> => {
  const client = await getClient();
  const {data} = await client.get('/profile/uploads');
  return data.audios;
};

export const useFetchUploadsByProfile = () => {
  const dispatch = useDispatch();
  const {data, isError, error, isLoading} = useQuery({
    queryKey: ['uploads-by-profile'],
    queryFn: fetchUploadsByProfile,
  });
  if (isError) {
    const errorMsg = catchAsyncError(error);
    dispatch(updateNotification({message: errorMsg, type: 'error'}));
  }

  return {data, isLoading};
};
