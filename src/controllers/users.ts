import { Request, Response } from "express";
import userModel from "../models/user";

export const getUsers = async (req: Request, res: Response) => {
  const users = await userModel.find();
  res.send(users);
};

export const getUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const user = await userModel.findById(userId);
  res.send(user);
};

export const createUser = (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;
  return userModel
    .create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};
