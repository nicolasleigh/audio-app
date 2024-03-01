import {combineReducers, configureStore} from '@reduxjs/toolkit';
import authReducer from './auth';
import notificationReducer from './notification';

export type RootState = ReturnType<typeof store.getState>;

const reducer = combineReducers({
  auth: authReducer,
  notification: notificationReducer,
});

const store = configureStore({
  reducer,
});

export default store;
