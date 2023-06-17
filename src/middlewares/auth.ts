import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { CustomRequest } from "../types/types";
import UnauthorizedError from "../errors/unauthorized-error";
import { SECRET_KEY } from "../variables/key";

export default (req: CustomRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new UnauthorizedError("Необходимо авторизоваться");
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    next(new UnauthorizedError("Некорректный токен"));
  }

  if (req.user) {
    req.user._id = payload;
  }

  next();
};
