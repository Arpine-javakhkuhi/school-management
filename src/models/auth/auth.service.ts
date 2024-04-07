import jwt from "jsonwebtoken";

import config from "../../config";

import userModel from "../user/user.model";

import { LoginDto } from "./dto/login.dto";
import { LoginReturnTypeInterface } from "./auth.interface";

class AuthService {
  login = async (loginData: LoginDto): Promise<LoginReturnTypeInterface> => {
    const user = await userModel.getByCredentials(
      loginData.email,
      loginData.password
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
        }
      );
    });
  }
}

const authService = new AuthService();
export default authService;
