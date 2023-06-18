import express from 'express';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import { requestLogger, errorLogger } from './middlewares/logger';
import { createUser, login } from './controllers/users';
import auth from './middlewares/auth';
import errorsMiddleware from './middlewares/errors';
import router from './routes/index';
import userValid from './validation/user-valid-config';

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(express.json());

app.use(requestLogger);

app.post('/signin', userValid.loginValid, login);

app.post('/signup', userValid.createUserValid, createUser);

app.use(auth);
app.use('/', router);
app.use(errorLogger);
app.use(errors());
app.use(errorsMiddleware);

app.listen(PORT);
