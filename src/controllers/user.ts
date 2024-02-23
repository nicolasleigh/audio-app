import { RequestHandler } from 'express';
import crypto from 'node:crypto';

import { CreateUser, VerifyEmailRequest } from '#/@types/user';
import User from '#/models/user';
import { generateToken } from '#/utils/helper';
import { sendForgetPasswordLink, sendVerificationMail } from '#/utils/mail';
import EmailVerificationToken from '#/models/emailVerificationToken';
import PasswordResetToken from '#/models/passwordResetToken';
import { isValidObjectId } from 'mongoose';
import { PASSWORD_RESET_LINK } from '#/utils/variables';

export const create: RequestHandler = async (req: CreateUser, res) => {
  const { email, password, name } = req.body;

  const user = await User.create({ email, password, name });

  const token = generateToken();

  await EmailVerificationToken.create({
    owner: user._id,
    token,
  });

  await sendVerificationMail(token, {
    name,
    email,
    userId: user._id.toString(),
  });

  res.status(201).json({ user: { id: user._id, name, email } });
};

export const verifyEmail: RequestHandler = async (
  req: VerifyEmailRequest,
  res
) => {
  const { token, userId } = req.body;

  const verificationToken = await EmailVerificationToken.findOne({
    owner: userId,
  });

  if (!verificationToken)
    return res.status(403).json({ error: 'Invalid token!' });

  const matched = await verificationToken.compareToken(token);

  if (!matched) return res.status(403).json({ error: 'Invalid token!' });

  await User.findByIdAndUpdate(userId, { verified: true });
  await EmailVerificationToken.findByIdAndDelete(verificationToken._id);

  res.json({ message: 'Email verified successfully!' });
};

export const sendReVerificationToken: RequestHandler = async (req, res) => {
  const { userId } = req.body;

  if (!isValidObjectId(userId))
    return res.status(403).json({ error: 'Invalid request!' });

  const user = await User.findById(userId);
  if (!user) return res.status(403).json({ error: 'Invalid request!' });

  await EmailVerificationToken.findOneAndDelete({ owner: userId });

  const token = generateToken();

  await EmailVerificationToken.create({
    owner: userId,
    token,
  });

  await sendVerificationMail(token, {
    name: user.name,
    email: user.email,
    userId: user._id.toString(),
  });

  res.json({ message: 'Please check your mail' });
};

export const generateForgetPasswordLink: RequestHandler = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: 'Account not found!' });

  await PasswordResetToken.findOneAndDelete({ owner: user._id });

  const token = crypto.randomBytes(36).toString('hex');

  PasswordResetToken.create({
    owner: user._id,
    token,
  });

  const resetLink = `${PASSWORD_RESET_LINK}?token=${token}&userId=${user._id}`;

  sendForgetPasswordLink({ email: user.email, link: resetLink });

  res.json({ message: 'Check your email to reset password.' });
};

export const grantValid: RequestHandler = async (req, res) => {
  res.json({ valid: true });
};
