import { JwtPayload } from "jsonwebtoken";
import { User } from "@prisma/client";
import { GraphQLError } from "graphql";

import { AuthRequest, HTTPStatus } from "../types/main.types";
import errorMessages from "../constants/errorMessages";
import userModel from "../models/user.model";
import authService from "../utils/auth/auth.service";
import validationRules from "../utils/validation/validationRules";

const getAccessToken = (req: AuthRequest): string => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new GraphQLError(errorMessages.unAuthenticated, {
      extensions: {
        code: HTTPStatus.Unauthorized,
      },
    });
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

const authMiddleware = async (req: AuthRequest): Promise<User> => {
  const token = getAccessToken(req);

  const userPayload = await authService.verify(token);

  return getUserByPayload(userPayload);
};

export default authMiddleware;
