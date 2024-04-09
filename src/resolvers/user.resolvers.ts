import authService from "../utils/auth.service";
import { LoginInputData } from "../interfaces/auth.interface";
import loginValidation from "../validators/auth.validators";

const userResolver = {
  Query: {
    getUserById: () => {
      return {
        id: "1",
        email: "admin@admin.com",
        firstName: "Test name",
        lastName: "Test Surname",
      };
    },
  },

  Mutation: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    login: async (_: any, { input }: LoginInputData) => {
      await loginValidation(input);
      const { user, accessToken } = await authService.login(input);

      return {
        ...user,
        accessToken,
      };
    },
  },
};

export default userResolver;
