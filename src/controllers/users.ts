import { Request, Response, NextFunction } from "express";
import { Error } from "mongoose";
import bcryptjs from "bcryptjs";
import { CustomRequest } from "../types/types";
import userModel from "../models/user";
import NotFoundError from "../errors/not-found-error";
import IncorrectDataError from "../errors/incorrect-data-error";
import ConflictError from "../errors/conflict-error";

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  userModel
    .find()
    .then((users) => res.status(200).send({ data: users }))
    .catch(next);
};

export const getUserById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;

  userModel
    .findById(userId)
    .orFail(() => new NotFoundError("Пользователь не найден"))
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err instanceof Error.CastError) {
        next(new IncorrectDataError("Некорректные данные пользователя"));
      }
      next(err);
    });
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar, email, password } = req.body;
  bcryptjs
    .hash(password, 10)
    .then((hash) => {
      userModel.create({ name, about, avatar, password: hash, email });
    })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err instanceof Error.ValidationError) {
        next(
          new IncorrectDataError(
            "Некорректные данные при создании пользователя"
          )
        );
      }
      if (err.code === 11000) {
        throw new ConflictError(
          "Пользователь с таким email уже зарегистрирован"
        );
      }
      next(err);
    });
};

export const updateCurrentUser = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { name, about } = req.body;

  const userId = req.user?._id;
  userModel
    .findByIdAndUpdate(
      userId,
      { name, about },
      { new: true, runValidators: true }
    )
    .orFail(() => new NotFoundError("Пользователь не найден"))
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err instanceof Error.ValidationError) {
        next(
          new IncorrectDataError(
            "Некорректные данные при обновлении информации о пользователе"
          )
        );
      } else {
        next(err);
      }
    });
};

export const updateAvatarCurrentUser = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { avatar } = req.body;

  const userId = req.user?._id;
  userModel
    .findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .orFail(() => new NotFoundError("Пользователь не найден"))
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err instanceof Error.ValidationError) {
        next(
          new IncorrectDataError(
            "Некорректные данные при обновлении информации о пользователе"
          )
        );
      } else {
        next(err);
      }
    });
};
