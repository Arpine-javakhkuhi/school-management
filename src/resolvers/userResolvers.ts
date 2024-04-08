import { GraphQLError } from "graphql";

import authService from "../utils/auth/auth.service";
import { LoginInputData } from "../interfaces/auth.interface";

import { ContextValue } from "./types";
// import authValidator from "../validators/auth.validators";

const userResolver = {
  Query: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
