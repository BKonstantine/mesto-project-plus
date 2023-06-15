import { Router } from "express";
import { getUsers, createUser, getUserById } from "../controllers/users";

const router = Router();

router.get("/", getUsers);
router.get("/:userId", getUserById);
router.post("/", createUser);

export default router;
