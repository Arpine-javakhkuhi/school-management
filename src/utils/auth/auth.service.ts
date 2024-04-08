import jwt from "jsonwebtoken";
import { GraphQLError } from "graphql";

import userModel from "../../models/user.model";
import config from "../../config";
import { LoginReturnTypeInterface } from "../../interfaces/auth.interface";
import errorMessages from "../../constants/errorMessages";
import { HTTPStatus } from "../../types/main.types";
import { LoginDto } from "../../dtos/login.dto";

class AuthService {
  login = async (loginData: LoginDto): Promise<LoginReturnTypeInterface> => {
    const user = await userModel.getByCredentials(
      loginData.email,
      loginData.password,
    );

    const accessToken = await AuthService.createAccessToken(user.id);

    return { user: userModel.toDTO(user), accessToken };
  };

  private static createAccessToken(userId: number): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign(
        { id: userId },
        config.ACCESS_TOKEN_SECRET as string,
        {
          expiresIn: `${config.ACCESS_TOKEN_EXPIRES_IN}`,
        },
        (error, token) => {
          if (error || !token) {
            return reject(error);
          }
          resolve(token);
        },
      );
    });
  }

  async verify(token: string): Promise<jwt.JwtPayload> {
    try {
      return await new Promise((resolve, reject) => {
        jwt.verify(
          token,
          config.ACCESS_TOKEN_SECRET as string,
          (error, userPayload) => {
            if (error) {
              return reject(error);
            }
            resolve(userPayload as jwt.JwtPayload);
          },
        );
      });
    } catch (error) {
      throw new GraphQLError(errorMessages.unAuthenticated, {
        extensions: {
          code: HTTPStatus.Unauthorized,
        },
      });
    }
  }
}

const authService = new AuthService();
export default authService;
