import {combineReducers, configureStore} from '@reduxjs/toolkit';
import authReducer from './auth';
import notificationReducer from './notification';
import playerReducer from './player';

export type RootState = ReturnType<typeof store.getState>;

const reducer = combineReducers({
  auth: authReducer,
  notification: notificationReducer,
  player: playerReducer,
});

const store = configureStore({
  reducer,
});

export default store;
