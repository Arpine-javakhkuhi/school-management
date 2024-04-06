import { GraphQLError } from "graphql";

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
        throw new GraphQLError("Test errrrrrrrrrrrrrrrrrrrrorrrrrrrrrrrrrr");
      }
    },
  },
};

export default userResolver;
