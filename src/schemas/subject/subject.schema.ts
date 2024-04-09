import gql from "graphql-tag";

const subjectSchema = gql`
  input SubjectInput {
    name: String!
    teacherId: ID
  }

  type Query {
    getSubjects: [Subject]
  }

  type SubjectSuccess {
    isSuccess: Boolean
    message: String!
  }

  type Mutation {
    createSubject(createSubjectInput: SubjectInput): Subject!
    deleteSubject(id: ID!): SubjectSuccess
    editSubject(id: ID!, editSubjectInput: SubjectInput): SubjectSuccess
  }
`;

export default subjectSchema;
