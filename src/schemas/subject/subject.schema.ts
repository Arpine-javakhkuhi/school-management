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
    editSubject(id: ID!, editSubjectInput: TeacherInput): SubjectSuccess
  }
`;

export default subjectSchema;
