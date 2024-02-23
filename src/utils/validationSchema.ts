import * as yup from 'yup';
import { isValidObjectId } from 'mongoose';

export const CreateUserSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required('Name is missing!')
    .min(3, 'Name is too short!')
    .max(20, 'Name is too long!'),

  email: yup.string().required('Email is missing!').email('Invalid email!'),
  password: yup
    .string()
    .trim()
    .required('Password is missing!')
    .min(6, 'Password is too short!')
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])[a-zA-Z\d!@#\$%\^&\*]+$/,
      'Password is too simple!'
    ),
});

export const TokenAndIDValidation = yup.object().shape({
  token: yup.string().trim().required('Token is missing!'),
  userId: yup
    .string()
    .transform(function (value) {
      if (this.isType(value) && isValidObjectId(value)) {
        return value;
      } else {
        return '';
      }
    })
    .required('Invalid user id!'),
});

export const UpdatePasswordSchema = yup.object().shape({
  token: yup.string().trim().required('Token is missing!'),
  userId: yup
    .string()
    .transform(function (value) {
      if (this.isType(value) && isValidObjectId(value)) {
        return value;
      } else {
        return '';
      }
    })
    .required('Invalid user id!'),
  password: yup
    .string()
    .trim()
    .required('Password is missing!')
    .min(6, 'Password is too short!')
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])[a-zA-Z\d!@#\$%\^&\*]+$/,
      'Password is too simple!'
    ),
});

export const SignInValidationSchema = yup.object().shape({
  email: yup.string().required('Email is missing!').email('Invalid email!'),
  password: yup.string().trim().required('Password is missing!'),
});
