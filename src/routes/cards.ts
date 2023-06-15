import { Router } from "express";

const router = Router();

router.get("/");
router.post("/");
router.delete("/:cardId");
router.put("/:cardId/likes");
router.delete("/:cardId/likes");

export default router;
