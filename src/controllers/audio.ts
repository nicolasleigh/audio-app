import { RequestHandler } from 'express';

export const createAudio: RequestHandler = (req, res) => {
  res.json({ message: 'Audio created successfully!' });
};
