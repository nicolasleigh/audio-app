import {configureStore} from '@reduxjs/toolkit';
import authReducer from './auth';

export type RootState = ReturnType<typeof store.getState>;

const store = configureStore({
  reducer: authReducer,
});

export default store;
