import express from "express";
import mongoose from "mongoose";
import { errors } from "celebrate";
import usersRouter from "./routes/users";
import cardsRouter from "./routes/cards";
import auth from "./middlewares/auth";
import errorsMiddleware from "./middlewares/errors";
import NotFoundError from "./errors/not-found-error";

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/mestodb");

app.use(express.json());

app.use(auth);

app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

app.use((req, res, next) => {
  next(new NotFoundError("Такой страницы не существует!"));
});
app.use(errors());
app.use(errorsMiddleware);

app.listen(PORT);
