import { model, Schema } from "mongoose";

export interface User {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
}

const userSchema = new Schema<User>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Жак-Ив Кусто",
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 200,
    default: "Исследователь",
  },
  avatar: {
    type: String,
    validate: {
      validator: (v: any) => {
        return /^(https?:\/\/)(www.)?[^\s]+(#?)$/i.test(v);
      },
      message: "Некорректный формат ссылки",
    },
    default: "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png"
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (v: any) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: "Некорректный формат ссылки",
    },
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});

export default model<User>("user", userSchema);
