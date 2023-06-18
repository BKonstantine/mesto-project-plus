import {
  Router, NextFunction, Request, Response,
} from 'express';
import usersRouter from './users';
import cardsRouter from './cards';
import NotFoundError from '../errors/not-found-error';

const router = Router();

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

router.use((req:Request, res:Response, next:NextFunction) => {
  next(new NotFoundError('Такой страницы не существует!'));
});

export default router;
