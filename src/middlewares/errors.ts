import { Response, NextFunction } from "express";
import { CustomRequest, Error } from "types/types";

export default (
  err: Error,
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { status = 500, message } = err;
  res.status(status).send({
    message: status === 500 ? "На сервере произошла ошибка" : message,
  });
  next();
};
