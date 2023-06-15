import express from "express";
import mongoose from "mongoose";
import usersRouter from "./routes/users";
import auth from "./middlewares/auth";

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/mestodb");

app.use(express.json());

app.use(auth);

app.use("/users", usersRouter);

app.listen(PORT);
