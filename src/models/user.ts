import { model, Schema } from 'mongoose';
import { defaultUser, urlRegExp, emailRegExp } from '../config';

export interface User {
  name?: string;
  about?: string;
  avatar?: string;
  email: string;
  password: string;
}

const userSchema = new Schema<User>({
  name: {
    type: String,
    default: defaultUser.name,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: defaultUser.about,
    minlength: 2,
    maxlength: 200,
  },
  avatar: {
    type: String,
    default: defaultUser.avatar,
    validate: {
      validator: (v: any) => urlRegExp.test(v),
      message: 'Некорректный формат ссылки',
    },
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (v: any) => emailRegExp.test(v),
      message: 'Некорректный формат почты',
    },
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

export default model<User>('user', userSchema);
