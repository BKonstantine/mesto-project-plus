import { Request } from "express";

export interface CustomRequest extends Request {
  user?: {
    _id: string;
  };
}

export type Error = {
  status: number;
  message: string;
};
