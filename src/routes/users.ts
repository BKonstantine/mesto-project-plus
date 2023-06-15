import { Router } from "express";
import { celebrate, Joi } from "celebrate";
import {
  getUsers,
  createUser,
  getUserById,
  updateCurrentUser,
  updateAvatarCurrentUser,
} from "../controllers/users";

const router = Router();

router.get("/", getUsers);
router.get(
  "/:userId",
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().required(),
    }),
  }),
  getUserById
);
router.post(
  "/",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      about: Joi.string().min(2).max(200).required(),
      avatar: Joi.string().required(),
    }),
  }),
  createUser
);
router.patch(
  "/me",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      about: Joi.string().min(2).max(200).required(),
    }),
  }),
  updateCurrentUser
);
router.patch(
  "/me/avatar",
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required(),
    }),
  }),
  updateAvatarCurrentUser
);

export default router;
