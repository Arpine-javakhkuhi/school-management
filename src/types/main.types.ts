import { User } from "@prisma/client";

import { IncomingMessage } from "http";

// eslint-disable-next-line no-shadow
export enum HTTPStatus {
  OK = 200,
  Created = 201,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  UnprocessableEntity = 422,
  InternalServerError = 500,
}

export interface AuthRequest extends IncomingMessage {
  authorization?: string;
  user?: User;
}
