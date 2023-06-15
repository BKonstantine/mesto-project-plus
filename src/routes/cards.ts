import { Router } from "express";
import { getCards, createCard } from "../controllers/cards";
const router = Router();

router.get("/", getCards);
router.post("/", createCard);
router.delete("/:cardId");
router.put("/:cardId/likes");
router.delete("/:cardId/likes");

export default router;
