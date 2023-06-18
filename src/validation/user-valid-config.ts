import { Joi, celebrate, Segments } from 'celebrate';
import { urlRegExp, emailRegExp } from '../config';

const getUserByIdValid = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
});

const updateCurrentUserValid = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(200).required(),
  }),
});

const updateAvatarCurrentUserValid = celebrate({
  [Segments.BODY]: Joi.object().keys({
    avatar: Joi.string().pattern(urlRegExp).required(),
  }),
});

const loginValid = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().pattern(emailRegExp).required(),
    password: Joi.string().min(8).required(),
  }),
});

const createUserValid = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string().pattern(urlRegExp),
    email: Joi.string().pattern(emailRegExp).required(),
    password: Joi.string().min(8).required(),
  }),
});

export default {
  getUserByIdValid,
  updateCurrentUserValid,
  updateAvatarCurrentUserValid,
  loginValid,
  createUserValid,
};
