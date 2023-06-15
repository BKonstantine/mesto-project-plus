import { Request, Response } from "express";
import { CustomRequest } from "types/types";
import cardModel from "../models/card";

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
