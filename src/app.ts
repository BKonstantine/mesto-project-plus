import express from 'express';
import mongoose from 'mongoose';
import { errors, celebrate, Joi } from 'celebrate';
import { requestLogger, errorLogger } from './middlewares/logger';
import { createUser, login } from './controllers/users';
import auth from './middlewares/auth';
import errorsMiddleware from './middlewares/errors';
import router from './routes/index';

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(express.json());

app.use(requestLogger);

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string()
        .pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
        .required(),
      password: Joi.string().min(8).required(),
    }),
  }),
  login,
);

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(200),
      avatar: Joi.string().pattern(
        /^(https?:\/\/)?(www\.)?[a-zA-Z0-9._~:/?#[\]@!$&'()*+,;=-]+(#)?$/,
      ),
      email: Joi.string()
        .pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
        .required(),
      password: Joi.string().min(8).required(),
    }),
  }),
  createUser,
);

app.use(auth);
app.use('/', router);
app.use(errorLogger);
app.use(errors());
app.use(errorsMiddleware);

app.listen(PORT);
