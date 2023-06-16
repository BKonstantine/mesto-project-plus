import { Request, Response, NextFunction } from "express";
import { ObjectId, Error } from "mongoose";
import { CustomRequest } from "../types/types";
import cardModel from "../models/card";
import NotFoundError from "../errors/not-found-error";
import IncorrectDataError from "../errors/incorrect-data-error";

export const getCards = (req: Request, res: Response, next: NextFunction) => {
  cardModel
    .find({})
    .then((cards) => res.status(200).send({ data: cards }))
    .catch(next);
};

export const createCard = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { name, link } = req.body;
  const owner = req.user?._id;
  cardModel
    .create({ name, link, owner })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err instanceof Error.ValidationError) {
        next(
          new IncorrectDataError("Некорректные данные при создании карточки")
        );
      }
      next(err);
    });
};

export const deleteCardById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { cardId } = req.params;
  cardModel
    .findByIdAndDelete(cardId)
    .orFail(() => new NotFoundError("Карточка не найдена"))
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err instanceof Error.CastError) {
        next(new IncorrectDataError("Некорректные данные карточки"));
      }
      next(err);
    });
};

export const likeCardById = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { cardId } = req.params;
  cardModel
    .findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: req.user?._id } },
      { new: true }
    )
    .orFail(() => new NotFoundError("Карточка не найдена"))
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err instanceof Error.CastError) {
        next(new IncorrectDataError("Некорректные данные карточки"));
      }
      next(err);
    });
};

export const dislikeCardById = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?._id;
  const { cardId } = req.params;
  cardModel
    .findByIdAndUpdate(
      cardId,
      { $pull: { likes: userId as unknown as ObjectId } },
      { new: true }
    )
    .orFail(() => new NotFoundError("Карточка не найдена"))
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err instanceof Error.CastError) {
        next(new IncorrectDataError("Некорректные данные карточки"));
      }
      next(err);
    });
};
