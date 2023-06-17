import express from "express";
import mongoose from "mongoose";
import { errors, celebrate, Joi } from "celebrate";
import { createUser, login } from "./controllers/users";
import usersRouter from "./routes/users";
import cardsRouter from "./routes/cards";
import auth from "./middlewares/auth";
import errorsMiddleware from "./middlewares/errors";
import NotFoundError from "./errors/not-found-error";

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/mestodb");

app.use(express.json());

app.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string()
        .pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
        .required(),
      password: Joi.string().min(8).required(),
    }),
  }),
  login
);

app.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(200),
      avatar: Joi.string().pattern(
        /^(https?:\/\/)?(www\.)?[a-zA-Z0-9._~:/?#[\]@!$&'()*+,;=-]+(#)?$/
      ),
      email: Joi.string()
        .pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
        .required(),
      password: Joi.string().min(8).required(),
    }),
  }),
  createUser
);

app.use(auth);

app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

app.use((req, res, next) => {
  next(new NotFoundError("Такой страницы не существует!"));
});
app.use(errors());
app.use(errorsMiddleware);

app.listen(PORT);
