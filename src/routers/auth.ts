import { CreateUser } from '#/@types/user';
import { validate } from '#/middleware/validator';
import User from '#/models/user';
import { CreateUserSchema } from '#/utils/validationSchema';
import { Router } from 'express';

const router = Router();

router.post(
  '/create',
  validate(CreateUserSchema),
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
    res.status(201).json({ user });
  }
);

export default router;
