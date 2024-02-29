import {PayloadAction, createSelector, createSlice} from '@reduxjs/toolkit';
import {RootState} from '.';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  verified: boolean;
  avatar?: string;
  followers: number;
  followings: number;
}

interface AuthState {
  profile: UserProfile | null;
  loggedIn: boolean;
}

const initialState: AuthState = {
  profile: null,
  loggedIn: false,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateProfile(authState, {payload}: PayloadAction<UserProfile | null>) {
      authState.profile = payload;
    },
    updateLoggedIn(authState, {payload}) {
      authState.loggedIn = payload;
    },
  },
});

export const {updateLoggedIn, updateProfile} = slice.actions;

export const getAuthState = createSelector(
  (state: RootState) => state,
  authState => authState,
);

export default slice.reducer;
