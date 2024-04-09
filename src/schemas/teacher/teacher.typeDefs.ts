import gql from "graphql-tag";

const teacherTypeDefs = gql`
  type Teacher {
    id: ID
    firstName: String!
    lastName: String!
  }
`;
export default teacherTypeDefs;
