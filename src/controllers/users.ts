import { Request, Response } from "express";
import { CustomRequest } from "types/types";
import userModel from "../models/user";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userModel.find();
    res.send(users);
  } catch (error) {}
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await userModel.findById(userId);
    res.send(user);
  } catch (error) {}
};

export const createUser = (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;
  userModel
    .create({ name, about, avatar })
    .then((user) => res.send({ data: user }));
};

export const updateCurrentUser = async (req: CustomRequest, res: Response) => {
  const { name, about } = req.body;

  const userId = req.user?._id;
  userModel
    .findByIdAndUpdate(userId, { name, about }, { new: true })
    .then((user) => res.send({ data: user }));
};

export const updateAvatarCurrentUser = async (
  req: CustomRequest,
  res: Response
) => {
  const { avatar } = req.body;

  const userId = req.user?._id;
  userModel
    .findByIdAndUpdate(userId, { avatar }, { new: true })
    .then((user) => res.send({ data: user }));
};
