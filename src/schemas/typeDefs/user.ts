import gql from "graphql-tag";

export const userTypeDefs = gql`
  scalar DateTime
  type User {
    id: String!
    email: String!
    password: String!
    firstName: String!
    lastName: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }
`;
