import express from 'express';
import 'dotenv/config';
import './db';

const app = express();

const PORT = 8080;

app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});
