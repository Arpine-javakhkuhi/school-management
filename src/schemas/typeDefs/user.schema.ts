import gql from "graphql-tag";

const userSchema = gql`
  input LoginInput {
    email: String!
    password: String!
  }

  type Query {
    getUserById(): User!
  }

  type LoggedUser {
    id: String
    email: String
    firstName: String
    lastName: String
  }

  type Mutation {
    login(input: LoginInput): LoggedUser
  }
`;

export default userSchema;
