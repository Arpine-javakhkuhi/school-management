import { GraphQLError } from "graphql";
import userModel from "../models/user/user.model";
import { AdditionalDataInterface } from "./types/user";
import authService from "../models/auth/auth.service";

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
    login: async (_: any, { input }: any, context: any) => {
      const { user, accessToken } = await authService.login(input);

      return {
        ...user,
        accessToken,
      };
    },
  },
};

export default userResolver;
