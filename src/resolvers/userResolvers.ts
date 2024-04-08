import { GraphQLError } from "graphql";
import { ContextValue } from "./types";
import authService from "../models/auth/auth.service";
import { LoginInputData } from "interfaces/auth.interface";
// import authValidator from "../validators/auth.validators";

const userResolver = {
  Query: {
    getUserById: (_: any, s: any, contextValue: ContextValue) => {
      try {
        if (!contextValue.user) {
          throw new GraphQLError("Test11111111111 err");
        }
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
    login: async (_: any, { input: { email, password } }: LoginInputData) => {
      // await authValidator.login({ email, password });
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
