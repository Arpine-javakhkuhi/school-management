import gql from "graphql-tag";

const subjectTypeDefs = gql`
  type Subject {
    id: ID!
    name: String!
    teacherId: ID
  }
`;

export default subjectTypeDefs;
