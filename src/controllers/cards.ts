import { Request, Response } from "express";
import { CustomRequest } from "types/types";
import cardModel from "../models/card";
import { ObjectId } from "mongoose";

export const getCards = async (req: Request, res: Response) => {
  const cards = await cardModel.find();
  res.send(cards);
};

export const createCard = (req: CustomRequest, res: Response) => {
  const { name, link } = req.body;
  const owner = req.user?._id;
  cardModel
    .create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

export const deleteCardById = async (req: Request, res: Response) => {
  try {
    const { cardId } = req.params;
    await cardModel.findByIdAndDelete(cardId);
    const cards = await cardModel.find({});
    res.send({ data: cards });
  } catch (error) {
    res.status(500).send({ message: "Произошла ошибка" });
  }
};

export const likeCardById = (req: CustomRequest, res: Response) => {
  cardModel
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user?._id } },
      { new: true }
    )
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

export const dislikeCardById = (req: CustomRequest, res: Response) => {
  const userId = req.user?._id;
  if (!userId) {
    return;
  }
  cardModel
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: userId as unknown as ObjectId } },
      { new: true }
    )
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};
