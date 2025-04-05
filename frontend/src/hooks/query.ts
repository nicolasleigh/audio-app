import {useQuery} from '@tanstack/react-query';
import {AudioData, CompletePlaylist, History, Playlist} from '../@types/audio';
import catchAsyncError from '../api/catchError';
import {getClient} from '../api/client';
import {PublicProfile} from '../@types/user';
import Toast from 'react-native-toast-message';

const fetchLatest = async (): Promise<AudioData[]> => {
  const client = await getClient();
  const {data} = await client.get('/audio/latest');
  return data.audios;
};

export const useFetchLatestAudios = () => {
  const {data, isError, error, isLoading} = useQuery({
    queryKey: ['latest-uploads'],
    queryFn: fetchLatest,
  });
  if (isError) {
    const errorMsg = catchAsyncError(error);
    Toast.show({type: 'error', text1: errorMsg});
  }

  return {data, isLoading};
};

const fetchRecommended = async (): Promise<AudioData[]> => {
  const client = await getClient();
  const {data} = await client.get('/profile/recommended');
  return data.audios;
};

export const useFetchRecommendedAudios = () => {
  const {data, isError, error, isLoading} = useQuery({
    queryKey: ['recommended'],
    queryFn: fetchRecommended,
  });
  if (isError) {
    const errorMsg = catchAsyncError(error);
    Toast.show({type: 'error', text1: errorMsg});
  }

  return {data, isLoading};
};

const fetchPlaylist = async (): Promise<Playlist[]> => {
  const client = await getClient();
  const {data} = await client.get('/playlist/by-profile');
  return data.playlist;
};

export const useFetchPlaylist = () => {
  const {data, isError, error, isLoading} = useQuery({
    queryKey: ['playlist'],
    queryFn: fetchPlaylist,
  });
  if (isError) {
    const errorMsg = catchAsyncError(error);
    Toast.show({type: 'error', text1: errorMsg});
  }

  return {data, isLoading};
};

const fetchUploadsByProfile = async (): Promise<AudioData[]> => {
  const client = await getClient();
  const {data} = await client.get('/profile/uploads');
  return data.audios;
};

export const useFetchUploadsByProfile = () => {
  const {data, isError, error, isLoading} = useQuery({
    queryKey: ['uploads-by-profile'],
    queryFn: fetchUploadsByProfile,
  });
  if (isError) {
    const errorMsg = catchAsyncError(error);
    Toast.show({type: 'error', text1: errorMsg});
  }

  return {data, isLoading};
};

const fetchFavorite = async (): Promise<AudioData[]> => {
  const client = await getClient();
  const {data} = await client.get('/favorite');
  return data.audios;
};

export const useFetchFavorite = () => {
  const {data, isError, error, isLoading, isFetching} = useQuery({
    queryKey: ['favorite'],
    queryFn: fetchFavorite,
  });
  if (isError) {
    const errorMsg = catchAsyncError(error);
    Toast.show({type: 'error', text1: errorMsg});
  }

  return {data, isLoading, isFetching};
};

const fetchHistories = async (): Promise<History[]> => {
  const client = await getClient();
  const {data} = await client.get('/history');
  return data.histories;
};

export const useFetchHistories = () => {
  const {data, isError, error, isLoading, isFetching} = useQuery({
    queryKey: ['histories'],
    queryFn: fetchHistories,
  });
  if (isError) {
    const errorMsg = catchAsyncError(error);
    Toast.show({type: 'error', text1: errorMsg});
  }

  return {data, isLoading, isFetching};
};

const fetchRecentlyPlayed = async (): Promise<AudioData[]> => {
  const client = await getClient();
  const {data} = await client.get('/history/recently-played');
  return data.audios;
};

export const useFetchRecentlyPlayed = () => {
  const {data, isError, error, isLoading, isFetching} = useQuery({
    queryKey: ['recently-played'],
    queryFn: fetchRecentlyPlayed,
  });
  if (isError) {
    const errorMsg = catchAsyncError(error);
    Toast.show({type: 'error', text1: errorMsg});
  }

  return {data, isLoading, isFetching};
};

const fetchRecommendedPlaylist = async (): Promise<Playlist[]> => {
  const client = await getClient();
  const {data} = await client.get('/profile/auto-generated-playlist');
  // console.log('fetchRecommendedPlaylist--', data);
  return data.playlist;
};

export const useFetchRecommendedPlaylist = () => {
  const {data, isError, error, isLoading, isFetching} = useQuery({
    queryKey: ['recommended-playlist'],
    queryFn: fetchRecommendedPlaylist,
  });
  if (isError) {
    const errorMsg = catchAsyncError(error);
    Toast.show({type: 'error', text1: errorMsg});
  }

  return {data, isLoading, isFetching};
};

const fetchIsFavorite = async (id: string): Promise<boolean[]> => {
  const client = await getClient();
  const {data} = await client.get('/favorite/is-fav?audioId=' + id);
  return data.result;
};

export const useFetchIsFavorite = (id: string) => {
  const {data, isError, error, isLoading, isFetching} = useQuery({
    queryKey: ['favorite', id],
    queryFn: () => fetchIsFavorite(id),
    enabled: !!id, // only fetch if id is exist
  });
  if (isError) {
    const errorMsg = catchAsyncError(error);
    Toast.show({type: 'error', text1: errorMsg});
  }

  return {data, isLoading, isFetching};
};

const fetchPublicProfile = async (id: string): Promise<PublicProfile> => {
  const client = await getClient();
  const {data} = await client.get('/profile/info/' + id);
  return data.profile;
};

export const useFetchPublicProfile = (id: string) => {
  const {data, isError, error, isLoading, isFetching} = useQuery({
    queryKey: ['profile', id],
    queryFn: () => fetchPublicProfile(id),
    enabled: !!id, // only fetch if id is exist
  });
  if (isError) {
    const errorMsg = catchAsyncError(error);
    Toast.show({type: 'error', text1: errorMsg});
  }

  return {data, isLoading, isFetching};
};

const fetchPublicUploads = async (id: string): Promise<AudioData[]> => {
  const client = await getClient();
  const {data} = await client.get('/profile/uploads/' + id);
  return data.audios;
};

export const useFetchPublicUploads = (id: string) => {
  const {data, isError, error, isLoading, isFetching} = useQuery({
    queryKey: ['uploads', id],
    queryFn: () => fetchPublicUploads(id),
    enabled: !!id, // only fetch if id is exist
  });
  if (isError) {
    const errorMsg = catchAsyncError(error);
    Toast.show({type: 'error', text1: errorMsg});
  }

  return {data, isLoading, isFetching};
};

const fetchPublicPlaylist = async (id: string): Promise<Playlist[]> => {
  const client = await getClient();
  const {data} = await client.get('/profile/playlist/' + id);
  return data.playlist;
};

export const useFetchPublicPlaylist = (id: string) => {
  const {data, isError, error, isLoading, isFetching} = useQuery({
    queryKey: ['playlist', id],
    queryFn: () => fetchPublicPlaylist(id),
    enabled: !!id, // only fetch if id is exist
  });
  if (isError) {
    const errorMsg = catchAsyncError(error);
    Toast.show({type: 'error', text1: errorMsg});
  }

  return {data, isLoading, isFetching};
};

const fetchPlaylistAudios = async (id: string): Promise<CompletePlaylist> => {
  const client = await getClient();
  const {data} = await client.get('/profile/playlist-audios/' + id);
  return data.list;
};

export const useFetchPlaylistAudios = (id: string) => {
  const {data, isError, error, isLoading, isFetching} = useQuery({
    queryKey: ['playlist-audios', id],
    queryFn: () => fetchPlaylistAudios(id),
    enabled: !!id, // only fetch if id is exist
  });
  if (isError) {
    const errorMsg = catchAsyncError(error);
    Toast.show({type: 'error', text1: errorMsg});
  }

  return {data, isLoading, isFetching};
};

const fetchIsFollowing = async (id: string): Promise<boolean> => {
  const client = await getClient();
  const {data} = await client.get('/profile/is-following/' + id);
  return data.status;
};

export const useFetchIsFollowing = (id: string) => {
  const {data, isError, error, isLoading, isFetching} = useQuery({
    queryKey: ['is-following', id],
    queryFn: () => fetchIsFollowing(id),
    enabled: !!id, // only fetch if id is exist
  });
  if (isError) {
    const errorMsg = catchAsyncError(error);
    Toast.show({type: 'error', text1: errorMsg});
  }

  return {data, isLoading, isFetching};
};
