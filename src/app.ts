import express from 'express';
import 'dotenv/config'; // order is important
import 'express-async-errors';
import cors from 'cors';
import './db';
import authRouter from './routers/auth';
import audioRouter from './routers/audio';
import favoriteRouter from './routers/favorite';
import playlistRouter from './routers/playlist';
import profileRouter from './routers/profile';
import historyRouter from './routers/history';
import './utils/schedule';
import { errorHandler } from './middleware/error';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static('src/public'));

app.use('/auth', authRouter);
app.use('/audio', audioRouter);
app.use('/favorite', favoriteRouter);
app.use('/playlist', playlistRouter);
app.use('/profile', profileRouter);
app.use('/history', historyRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});
