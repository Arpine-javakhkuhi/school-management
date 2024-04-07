import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import prisma from "../../config/prisma";
import { Exception } from "../../errorHandler/exception";
import { HTTPStatus } from "../../types/main.types";
import errorMessages from "../../constants/errorMessages";
import { UserDTO, UserInterface } from "./user.interface";
import { GraphQLError } from "graphql";

class UserModel implements UserInterface {
  async getByEmail(email: string): Promise<User | null> {
    return prisma.user.findFirst({
      where: {
        email,
      },
    });
  }

  async getByCredentials(email: string, password: string): Promise<User> {
    const user = await this.getByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new GraphQLError(errorMessages.invalidCredentials, {
        extensions: {
          code: HTTPStatus.Forbidden,
        },
      });
    }

    return user;
  }

  async getById(id: number): Promise<User | null> {
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  toDTO(user: User): UserDTO {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };
  }
}

const userModel = new UserModel();
export default userModel;
