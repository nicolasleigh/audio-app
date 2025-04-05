import {combineReducers, configureStore} from '@reduxjs/toolkit';
import authReducer from './auth';
import playerReducer from './player';
import playlistModalReducer from './playlistModal';

export type RootState = ReturnType<typeof store.getState>;

const reducer = combineReducers({
  auth: authReducer,
  player: playerReducer,
  playlistModal: playlistModalReducer,
});

const store = configureStore({
  reducer,
});

export default store;
