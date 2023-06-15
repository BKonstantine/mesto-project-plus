export interface CustomRequest extends Request {
  user: {
    _id?: string;
  };
}
