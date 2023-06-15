import { Request, Response, NextFunction } from "express";
import { ObjectId } from "mongoose";
import { CustomRequest } from "../types/types";
import cardModel from "../models/card";
import NotFoundError from "../errors/not-found-error";

export const getCards = (req: Request, res: Response, next: NextFunction) => {
  cardModel
    .find({})
    .then((cards) => res.send(cards))
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
    .then((card) => res.send({ data: card }))
    .catch(next);
};

export const deleteCardById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { cardId } = req.params;
    await cardModel.findByIdAndDelete(cardId);
    const cards = await cardModel.find({});
    res.send({ data: cards });
  } catch {
    return next(new NotFoundError("Карточка не найдена"));
  }
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
    .then((card) => res.send({ data: card }))
    .catch(() => next(new NotFoundError("Карточка не найдена")));
};

export const dislikeCardById = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?._id;
  const { cardId } = req.params;
  if (!userId) {
    return;
  }
  cardModel
    .findByIdAndUpdate(
      cardId,
      { $pull: { likes: userId as unknown as ObjectId } },
      { new: true }
    )
    .then((card) => res.send({ data: card }))
    .catch(() => next(new NotFoundError("Карточка не найдена")));
};
