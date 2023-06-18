import { Joi, celebrate, Segments } from 'celebrate';
import { urlRegExp } from '../config';

const createCardValid = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().pattern(urlRegExp).required(),
  }),
});

const deleteCardByIdValid = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
});

const likeCardByIdValid = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
});

const dislikeCardByIdValid = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
});

export default {
  createCardValid,
  deleteCardByIdValid,
  likeCardByIdValid,
  dislikeCardByIdValid,
};
