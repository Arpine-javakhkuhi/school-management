import { JwtPayload } from "jsonwebtoken";
import { User } from "@prisma/client";

import { AuthRequest, HTTPStatus } from "../types/main.types";
import errorMessages from "../constants/errorMessages";
import userModel from "../models/user/user.model";
import authService from "../models/auth/auth.service";
import validationRules from "../utils/validation/validationRules";
import { GraphQLError } from "graphql";
import { ServerResponse } from "http";

const getAccessToken = (req: AuthRequest): string | null => {
  const { authorization } = req.headers;
  if (!authorization) {
    return null;
  }
  // remove Bearer from token
  return authorization.startsWith("Bearer ")
    ? authorization.slice(7, authorization.length)
    : authorization;
};

const getUserByPayload = async (userPayload: JwtPayload): Promise<User> => {
  if (!userPayload.id || validationRules.id().validate(userPayload.id).error) {
    throw new GraphQLError(errorMessages.unAuthenticated, {
      extensions: {
        code: HTTPStatus.Unauthorized,
      },
    });
  }

  const user = await userModel.getById(userPayload.id);
  if (!user) {
    throw new GraphQLError(errorMessages.unAuthenticated, {
      extensions: {
        code: HTTPStatus.Unauthorized,
      },
    });
  }
  return user;
};

const authMiddleware = async (
  req: AuthRequest,
  res: ServerResponse
): Promise<User | null> => {
  try {
    const token = getAccessToken(req);

    if (token) {
      const userPayload = await authService.verify(token);
      return getUserByPayload(userPayload);
    }
    return null;
  } catch (error) {
    // should again throw?
    throw new GraphQLError(errorMessages.unAuthenticated, {
      extensions: {
        code: HTTPStatus.Unauthorized,
      },
    });
  }
};

export default authMiddleware;
