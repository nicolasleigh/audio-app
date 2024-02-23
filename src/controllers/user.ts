import { RequestHandler } from 'express';
import nodemailer from 'nodemailer';
import path from 'node:path';

import { CreateUser } from '#/@types/user';
import User from '#/models/user';
import { MAILTRAP_PASS, MAILTRAP_USER } from '#/utils/variables';
import { generateToken } from '#/utils/helper';
import EmailVerificationToken from '#/models/emailVerificationToken';
import { generateTemplate } from '#/mail/template';

export const create: RequestHandler = async (req: CreateUser, res) => {
  const { email, password, name } = req.body;

  const user = await User.create({ email, password, name });

  const transport = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: MAILTRAP_USER,
      pass: MAILTRAP_PASS,
    },
  });

  const token = generateToken();
  await EmailVerificationToken.create({
    owner: user._id,
    token,
  });

  const welcomeMessage = `Hi ${name}, welcome to my app! Please verify your email by clicking on the link below:`;

  transport.sendMail({
    to: user.email,
    from: 'auth@test.com',
    subject: 'Welcome to my app!',
    html: generateTemplate({
      title: 'Welcome to my app',
      message: welcomeMessage,
      logo: 'cid:logo',
      banner: 'cid:welcome',
      link: '#',
      btnTitle: token,
    }),
    attachments: [
      {
        filename: 'logo.png',
        path: path.join(__dirname, '../mail/logo.png'),
        cid: 'logo',
      },
      {
        filename: 'welcome.png',
        path: path.join(__dirname, '../mail/welcome.png'),
        cid: 'welcome',
      },
    ],
  });

  res.status(201).json({ user });
};
