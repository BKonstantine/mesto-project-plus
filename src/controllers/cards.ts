import { Request, Response, NextFunction } from 'express';
import { ObjectId, Error } from 'mongoose';
import { CustomRequest } from '../types/types';
import cardModel from '../models/card';
import NotFoundError from '../errors/not-found-error';
import IncorrectDataError from '../errors/incorrect-data-error';
import ForbiddenError from '../errors/forbidden-error';

export const getCards = (req: Request, res: Response, next: NextFunction) => {
  cardModel
    .find({})
    .then((cards) => res.status(200).send({ data: cards }))
    .catch(next);
};

export const createCard = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const { name, link } = req.body;
  const owner = req.user?._id;
  cardModel
    .create({ name, link, owner })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err instanceof Error.ValidationError) {
        next(
          new IncorrectDataError('Некорректные данные при создании карточки'),
        );
      } else {
        next(err);
      }
    });
};

export const deleteCardById = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const { cardId } = req.params;
  try {
    const card = await cardModel.findById(cardId).orFail(() => new NotFoundError('Карточка не найдена'));
    if (card.owner.toString() !== req.user?._id) {
      throw new ForbiddenError('Удаление чужих карточек запрещено');
    }
    await card.deleteOne();
    res.status(200).send({ data: card });
  } catch (err) {
    if (err instanceof Error.CastError) {
      next(new IncorrectDataError('Некорректные данные карточки'));
    } else {
      next(err);
    }
  }
};

export const likeCardById = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const { cardId } = req.params;
  cardModel
    .findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: req.user?._id } },
      { new: true },
    )
    .orFail(() => new NotFoundError('Карточка не найдена'))
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err instanceof Error.CastError) {
        next(new IncorrectDataError('Некорректные данные карточки'));
      } else {
        next(err);
      }
    });
};

export const dislikeCardById = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.user?._id;
  const { cardId } = req.params;
  cardModel
    .findByIdAndUpdate(
      cardId,
      { $pull: { likes: userId as unknown as ObjectId } },
      { new: true },
    )
    .orFail(() => new NotFoundError('Карточка не найдена'))
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err instanceof Error.CastError) {
        next(new IncorrectDataError('Некорректные данные карточки'));
      } else {
        next(err);
      }
    });
};
