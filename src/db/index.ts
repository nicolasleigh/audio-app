import mongoose from 'mongoose';
import { MONGODB_URI } from '#/utils/variables';

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('db is connected');
  })
  .catch((err) => {
    console.log('db connection failed: ', err);
  });
