import { Schema, model } from 'mongoose';
import { urlRegExp } from '../config';

interface Card {
  name: string;
  link: string;
  owner: Schema.Types.ObjectId;
  likes: Schema.Types.ObjectId[];
  createdAt: Schema.Types.Date;
}

const cardSchema = new Schema<Card>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    validate: {
      validator: (v: any) => urlRegExp.test(v),
      message: 'Некорректный формат ссылки',
    },
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [Schema.Types.ObjectId],
    ref: 'user',
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default model('card', cardSchema);
