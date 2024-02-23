import express from 'express';
import 'dotenv/config'; // order is important
import './db';

const app = express();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});
