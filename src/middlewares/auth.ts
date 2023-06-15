import { Response, NextFunction } from "express";
import { CustomRequest } from "../types/types";

export default (req: CustomRequest, res: Response, next: NextFunction) => {
  req.user = {
    _id: "648b7875d6b019b07577e826"
  };
  next();
};
