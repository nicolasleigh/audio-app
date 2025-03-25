import { RequestHandler } from 'express';
import crypto from 'node:crypto';
import jwt from 'jsonwebtoken';

import { CreateUser, VerifyEmailRequest } from '#/@types/user';
import User from '#/models/user';
import { formatProfile, generateToken } from '#/utils/helper';
import {
  sendForgetPasswordLink,
  sendPassResetSuccessEmail,
  sendVerificationMail,
} from '#/utils/mail';
import EmailVerificationToken from '#/models/emailVerificationToken';
import PasswordResetToken from '#/models/passwordResetToken';
import { isValidObjectId } from 'mongoose';
import { JWT_SECRET, PASSWORD_RESET_LINK } from '#/utils/variables';
import { RequestWithFiles } from '#/middleware/fileParser';
import cloudinary from '#/cloud';
import formidable from 'formidable';

export const create: RequestHandler = async (req: CreateUser, res) => {
  const { email, password, name } = req.body;

  const oldUser = await User.findOne({ email });
  if (oldUser) return res.status(403).json({ error: 'Email already in use!' });

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

  if (user.verified)
    return res.status(422).json({ error: 'Email already verified!' });

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

export const updatePassword: RequestHandler = async (req, res) => {
  const { password, userId } = req.body;

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ error: 'Account not found!' });

  const matched = await user.comparePassword(password);
  if (matched)
    return res
      .status(422)
      .json({ error: 'The new password must be different!' });

  user.password = password;
  await user.save();

  await PasswordResetToken.findOneAndDelete({ owner: user._id });

  await sendPassResetSuccessEmail(user.name, user.email);
  res.json({ message: 'Password updated successfully!' });
};

export const signIn: RequestHandler = async (req, res) => {
  const { password, email } = req.body;

  const user = await User.findOne({
    email,
  });

  if (!user)
    return res.status(403).json({ error: 'Email/Password is incorrect!' });

  const matched = await user.comparePassword(password);
  if (!matched)
    return res.status(403).json({ error: 'Email/Password is incorrect!' });

  const token = jwt.sign({ userId: user._id }, JWT_SECRET);
  user.tokens.push(token);

  await user.save();

  res.json({
    profile: {
      id: user._id,
      name: user.name,
      email: user.email,
      verified: user.verified,
      avatar: user.avatar?.url,
      followers: user.followers.length,
      followings: user.followings.length,
    },
    token,
  });
};

export const updateProfile: RequestHandler = async (
  req: RequestWithFiles,
  res
) => {
  const name = req.body.name;
  const avatar = req.files?.avatar as unknown as formidable.File;

  const user = await User.findById(req.user.id);
  if (!user) throw new Error('something went wrong, user not found!');

  if (typeof name !== 'string')
    return res.status(422).json({ error: 'Invalid name!' });

  if (name.trim().length < 3)
    return res.status(422).json({ error: 'Invalid name!' });

  user.name = name;

  if (avatar) {
    if (user.avatar?.publicId) {
      await cloudinary.uploader.destroy(user.avatar?.publicId);
    }

    try {
      const { secure_url, public_id } = await cloudinary.uploader.upload(
        avatar.filepath,
        {
          width: 300,
          height: 300,
          crop: 'thumb',
          gravity: 'face',
        }
      );
      user.avatar = { url: secure_url, publicId: public_id };
    } catch (error) {
      console.log(error);
    }
  }

  await user.save();

  res.json({ profile: formatProfile(user) });
};

export const sendProfile: RequestHandler = (req, res, next) => {
  res.json({ profile: req.user });
};

export const logOut: RequestHandler = async (req, res, next) => {
  const { fromAll } = req.query;
  const token = req.token;
  const user = await User.findById(req.user.id);
  if (!user) throw new Error('something went wrong, user not found!');

  if (fromAll === 'yes') user.tokens = [];
  else user.tokens = user.tokens.filter((t) => t !== token);

  await user.save();
  res.json({ success: true });
};
