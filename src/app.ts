import express from "express";
import mongoose from "mongoose";
import usersRouter from "./routes/users";

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/mestodb");

app.use(express.json());

app.use("/users", usersRouter);

app.listen(PORT);
