import { Router } from "express";
import {
  getUsers,
  createUser,
  getUserById,
  updateCurrentUser,
  updateAvatarCurrentUser,
} from "../controllers/users";

const router = Router();

router.get("/", getUsers);
router.get("/:userId", getUserById);
router.post("/", createUser);
router.patch("/me", updateCurrentUser);
router.patch("/me/avatar", updateAvatarCurrentUser);

export default router;
