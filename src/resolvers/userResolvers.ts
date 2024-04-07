import { GraphQLError } from "graphql";
import userModel from "../models/user/user.model";
import { AdditionalDataInterface } from "./types/user";
import authService from "../models/auth/auth.service";
import { LoginDto } from "dtos/login.dto";
import { LoginInputData } from "interfaces/auth.interface";

const userResolver = {
  Query: {
    getUserById: () => {
      try {
        return {
          id: "1",
          email: "admin@admin.com",
          firstName: "Test name",
          lastName: "Test Surname",
        };
      } catch (error) {
        throw new GraphQLError("Test err");
      }
    },
  },

  Mutation: {
    // do I need a context????
    login: async (_: any, { input: { email, password } }: LoginInputData) => {
      const { user, accessToken } = await authService.login({
        email,
        password,
      });

      return {
        ...user,
        accessToken,
      };
    },
  },
};

export default userResolver;
