import { Response, NextFunction } from "express";
import { CustomRequest, Error } from "../types/types";

export default (
  err: Error,
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? "На сервере произошла ошибка" : message
  });
  next();
};
