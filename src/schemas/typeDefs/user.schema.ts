import gql from "graphql-tag";

const userSchema = gql`
  input LoginInput {
    email: String!
    password: String!
  }

  type Query {
    getUserById(): User!
  }

  type User {
    id: String
    email: String
    firstName: String
    lastName: String
  }

  type Mutation {
    login(input: LoginInput): User
  }
`;

export default userSchema;
