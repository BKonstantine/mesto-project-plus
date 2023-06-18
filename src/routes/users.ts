import { Router } from 'express';
import userValid from '../validation/user-valid-config';
import {
  getUsers,
  getUserById,
  getCurrentUser,
  updateCurrentUser,
  updateAvatarCurrentUser,
} from '../controllers/users';

const router = Router();

router.get('/', getUsers);

router.get('/me', getCurrentUser);

router.get(
  '/:userId',
  userValid.getUserByIdValid,
  getUserById,
);

router.patch(
  '/me',
  userValid.updateCurrentUserValid,
  updateCurrentUser,
);

router.patch(
  '/me/avatar',
  userValid.updateAvatarCurrentUserValid,
  updateAvatarCurrentUser,
);

export default router;
