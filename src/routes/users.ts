import { Router } from "express";
import { celebrate, Joi } from "celebrate";
import {
  getUsers,
  createUser,
  getUserById,
  updateCurrentUser,
  updateAvatarCurrentUser
} from "../controllers/users";

const router = Router();

router.get("/", getUsers);
router.get(
  "/:userId",
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().length(24).hex().required()
    })
  }),
  getUserById
);
router.post(
  "/",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      about: Joi.string().min(2).max(200).required(),
      avatar: Joi.string()
        .pattern(
          /^(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,}(?:\/[\w\-\.\/]*)*(?:\?[\w\-\.=&]*)?(?:#[\w\-]*)?$/
        )
        .required()
    })
  }),
  createUser
);
router.patch(
  "/me",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      about: Joi.string().min(2).max(200).required()
    })
  }),
  updateCurrentUser
);
router.patch(
  "/me/avatar",
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string()
        .pattern(
          /^(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,}(?:\/[\w\-\.\/]*)*(?:\?[\w\-\.=&]*)?(?:#[\w\-]*)?$/
        )
        .required()
    })
  }),
  updateAvatarCurrentUser
);

export default router;
