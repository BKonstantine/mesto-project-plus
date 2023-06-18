import { Router } from 'express';
import {
  getCards,
  createCard,
  deleteCardById,
  likeCardById,
  dislikeCardById,
} from '../controllers/cards';
import cardValid from '../validation/card-valid-config';

const router = Router();

router.get('/', getCards);

router.post(
  '/',
  cardValid.createCardValid,
  createCard,
);

router.delete(
  '/:cardId',
  cardValid.deleteCardByIdValid,
  deleteCardById,
);

router.put(
  '/:cardId/likes',
  cardValid.likeCardByIdValid,
  likeCardById,
);

router.delete(
  '/:cardId/likes',
  cardValid.dislikeCardByIdValid,
  dislikeCardById,
);

export default router;
