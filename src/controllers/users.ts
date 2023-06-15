import { Request, Response, NextFunction } from "express";
import { CustomRequest } from "../types/types";
import userModel from "../models/user";
import NotFoundError from "../errors/not-found-error";

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  userModel
    .find()
    .then((users) => res.send(users))
    .catch(next);
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const user = await userModel.findById(userId);
    res.send(user);
  } catch (error) {
    return next(new NotFoundError("Пользователь не найден"));
  }
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar } = req.body;
  userModel
    .create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

export const updateCurrentUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { name, about } = req.body;

  const userId = req.user?._id;
  userModel
    .findByIdAndUpdate(userId, { name, about }, { new: true })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

export const updateAvatarCurrentUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { avatar } = req.body;

  const userId = req.user?._id;
  userModel
    .findByIdAndUpdate(userId, { avatar }, { new: true })
    .then((user) => res.send({ data: user }))
    .catch(next);
};
