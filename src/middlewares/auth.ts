import { Response, NextFunction } from "express";
import { CustomRequest } from "types/types";

export default (req: CustomRequest, res: Response, next: NextFunction) => {
  req.user = {
    _id: "648ac555cc68563f955b5d28",
  };
  next();
};
