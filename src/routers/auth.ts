import { CreateUser } from '#/@types/user';
import User from '#/models/user';
import { Router } from 'express';

const router = Router();

router.post(
  '/create',
  (req, res, next) => {
    const { email, password, name } = req.body;
    if (!name.trim()) return res.json({ error: 'Name is missing!' });
    if (name.trim().length < 3)
      return res.json({ error: 'Name is too short!' });
    next();
  },
  async (req: CreateUser, res) => {
    const { email, password, name } = req.body;
    const user = await User.create({ email, password, name });
    res.json({ user });
  }
);

export default router;
