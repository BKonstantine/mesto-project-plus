import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import UnauthorizedError from '../errors/unauthorized-error';
import { SECRET_KEY } from '../config';

interface IAuthReq extends Request {
  user?: string | JwtPayload;
}

export default (req: IAuthReq, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError('Необходимо авторизоваться'));
  }

  const token = authorization?.replace('Bearer ', '');
  let payload;

  try {
    if (token) {
      payload = jwt.verify(token, SECRET_KEY);
    }
  } catch (err) {
    next(new UnauthorizedError('Некорректный токен'));
    return;
  }

  req.user = payload as { _id: JwtPayload };

  next();
};
