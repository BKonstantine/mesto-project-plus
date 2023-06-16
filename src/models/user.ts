/* eslint-disable arrow-body-style */
import { model, Schema } from "mongoose";

export interface User {
  name: string;
  about: string;
  avatar: string;
}

const userSchema = new Schema<User>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 200,
  },
  avatar: {
    type: String,
    validate: {
      validator: (v: any) => {
        return /^(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,}(?:\/[\w\-\.\/]*)*(?:\?[\w\-\.=&]*)?(?:#[\w\-]*)?$/.test(
          v
        );
      },
      message: "Некорректный формат ссылки",
    },
    required: true,
  },
});

export default model<User>("user", userSchema);
