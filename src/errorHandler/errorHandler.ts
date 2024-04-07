import { Request, Response, NextFunction } from "express";

import { HTTPStatus } from "../types/main.types";

import errorMessages from "../constants/errorMessages";

import { Exception } from "./exception";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof Exception) {
    res.status(err.status).send(err);
  } else {
    res
      .status(HTTPStatus.InternalServerError)
      .send({ metaData: { message: errorMessages.internalServerError } });
  }
};
export const errorThrower = (code: number, message: string) => {
  throw new Exception(code, { message });
};
