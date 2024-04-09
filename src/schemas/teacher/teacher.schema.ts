import gql from "graphql-tag";

const teacherSchema = gql`
  input TeacherInput {
    firstName: String!
    lastName: String!
  }

  type Query {
    getTeachers: [Teacher]
  }

  type TeacherSuccess {
    isSuccess: Boolean
    message: String!
  }

  type Mutation {
    createTeacher(createTeacherInput: TeacherInput): Teacher!
    deleteTeacher(id: ID!): TeacherSuccess
    editTeacher(id: ID!, editTeacherInput: TeacherInput): TeacherSuccess
  }
`;

export default teacherSchema;
