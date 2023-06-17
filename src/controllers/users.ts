import { Request, Response, NextFunction } from "express";
import { Error } from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { CustomRequest } from "../types/types";
import userModel from "../models/user";
import NotFoundError from "../errors/not-found-error";
import IncorrectDataError from "../errors/incorrect-data-error";
import ConflictError from "../errors/conflict-error";
import UnauthorizedError from "../errors/unauthorized-error";
import { SECRET_KEY } from "../variables/key";

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

  return userModel
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

export const getCurrentUser = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  console.log(req.user);
  if (req.user) {
    return userModel
      .findById(req.user._id)
      .then((user) => res.status(200).send({ data: user }))
      .catch((err) => {
        next(err);
      });
  }
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  return userModel
    .findOne({ email })
    .select("+password")
    .orFail(() => new UnauthorizedError("Неправильные почта или пароль"))
    .then((user) => {
      bcryptjs.compare(password, user.password).then((matched) => {
        if (!matched) {
          next(new UnauthorizedError("Неправильные почта или пароль"));
        }
      });
      const token = jwt.sign(
        {
          _id: user._id.toString(),
        },
        SECRET_KEY,
        {
          expiresIn: "10m",
        }
      );
      res.send({
        token,
        name: user.name,
        email: user.email,
      });
    });
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar, email, password } = req.body;
  bcryptjs
    .hash(password, 10)
    .then((hash) => {
      return userModel.create({ name, about, avatar, password: hash, email });
    })
    .then((user) => {
      res.status(201).send({
        data: {
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          email: user.email,
          _id: user._id,
        },
      });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new IncorrectDataError(err));
      } else if (err.code === 11000) {
        next(
          new ConflictError("Пользователь с таким email уже зарегистрирован")
        );
      } else {
        next(err);
      }
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
