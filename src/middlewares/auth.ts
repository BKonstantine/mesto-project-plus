import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import UnauthorizedError from '../errors/unauthorized-error';
import { SECRET_KEY } from '../variables/key';

interface IAuthReq extends Request {
  user?: string | JwtPayload;
}

export default (req: IAuthReq, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходимо авторизоваться');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    next(new UnauthorizedError('Некорректный токен'));
  }

  req.user = payload as { _id: JwtPayload };

  next();
};
