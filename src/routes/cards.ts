import { Router } from "express";
import {
  getCards,
  createCard,
  deleteCardById,
  likeCardById,
  dislikeCardById,
} from "../controllers/cards";

const router = Router();

router.get("/", getCards);
router.post("/", createCard);
router.delete("/:cardId", deleteCardById);
router.put("/:cardId/likes", likeCardById);
router.delete("/:cardId/likes", dislikeCardById);

export default router;
