import gql from "graphql-tag";

export const userTypeDefs = gql`
  type User {
    id: ID!
    email: String!
    password: String!
    firstName: String!
    lastName: String!
  }
`;
